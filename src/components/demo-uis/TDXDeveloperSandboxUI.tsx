import React, { useState } from 'react';
import { Terminal, Play, Copy, Check } from 'lucide-react';
import apiMetadata from '../../data/tdx/api_metadata.json';

interface EndpointItem {
  id: string;
  name: string;
  version: string;
  isRestricted: boolean;
  category: string;
  theme: string;
  domain: string;
  updateFrequency: string;
  httpMethod: string;
  apiPath: string;
  supportFormat: string;
  supportMQTT?: boolean;
  billingTimes: string;
  billingVolume: string;
  description: string;
}

export const TDXDeveloperSandboxUI: React.FC = () => {
  const allEndpoints = apiMetadata as EndpointItem[];

  // Pick representative endpoints covering GET, POST, MQTT, and Governance
  const representativeEndpoints = [
    allEndpoints.find((e) => e.httpMethod === 'POST' && e.name.includes('停車')) || allEndpoints[0],
    allEndpoints.find((e) => e.httpMethod === 'POST' && e.name.includes('風險')) || allEndpoints[6],
    allEndpoints.find((e) => e.httpMethod === 'GET' && e.name.includes('公車動態定點')) || allEndpoints[3],
    allEndpoints.find((e) => e.httpMethod === 'GET' && e.name.includes('票證')) || allEndpoints[2],
    allEndpoints.find((e) => e.name.includes('航路') || e.domain.includes('海運')) || allEndpoints[1],
  ];

  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointItem>(representativeEndpoints[0]);
  const [codeLang, setCodeLang] = useState<'cURL' | 'TypeScript' | 'Python'>('TypeScript');
  const [copied, setCopied] = useState(false);
  const [topParam, setTopParam] = useState('10');
  const formatParam = 'JSON';
  const [filterParam, setFilterParam] = useState('City eq "Taipei"');
  const [isLoading, setIsLoading] = useState(false);
  const [liveResponse, setLiveResponse] = useState<Record<string, any>>({
    status: 200,
    statusText: 'OK',
    latencyMs: 14.2,
    serviceTier: selectedEndpoint.category,
    method: selectedEndpoint.httpMethod,
    path: selectedEndpoint.apiPath,
    dataCount: 10,
    records: [
      {
        id: selectedEndpoint.id.slice(0, 8),
        name: selectedEndpoint.name,
        theme: selectedEndpoint.theme,
        domain: selectedEndpoint.domain,
        timestamp: new Date().toISOString(),
        status: 'Active',
      },
    ],
  });

  const getCurlCode = () => {
    if (selectedEndpoint.httpMethod === 'POST') {
      return `curl -X POST "https://tdx.transportdata.tw/api/basic${selectedEndpoint.apiPath}" \\
  -H "accept: application/json" \\
  -H "content-type: application/json" \\
  -H "authorization: Bearer <TDX_ACCESS_TOKEN>" \\
  -d '{"Year": 2026, "FilterCity": "Taipei"}'`;
    }
    return `curl -X GET "https://tdx.transportdata.tw/api/basic${selectedEndpoint.apiPath}?$top=${topParam}&$format=${formatParam}&$filter=${encodeURIComponent(filterParam)}" \\
  -H "accept: application/json" \\
  -H "authorization: Bearer <TDX_ACCESS_TOKEN>"`;
  };

  const getTypeScriptCode = () => {
    if (selectedEndpoint.httpMethod === 'POST') {
      return `import axios from 'axios';

// 呼叫 TDX 加值治理演算端點: ${selectedEndpoint.name}
async function runGovernanceAnalysis() {
  const url = 'https://tdx.transportdata.tw/api/basic${selectedEndpoint.apiPath}';
  const response = await axios.post(url, {
    Year: 2026,
    FilterCity: 'Taipei'
  }, {
    headers: {
      'Authorization': 'Bearer ' + process.env.TDX_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  console.log('演算結果:', response.data);
  return response.data;
}`;
    }
    return `import axios from 'axios';

// 取得 TDX ${selectedEndpoint.name}
async function fetchTDXData() {
  const url = 'https://tdx.transportdata.tw/api/basic${selectedEndpoint.apiPath}';
  const response = await axios.get(url, {
    params: {
      $top: ${topParam},
      $format: '${formatParam}',
      $filter: '${filterParam}'
    },
    headers: {
      authorization: 'Bearer ' + process.env.TDX_TOKEN
    }
  });
  console.log('即時車輛筆數:', response.data.length);
  return response.data;
}`;
  };

  const getPythonCode = () => {
    if (selectedEndpoint.httpMethod === 'POST') {
      return `import requests

url = "https://tdx.transportdata.tw/api/basic${selectedEndpoint.apiPath}"
headers = {
    "Authorization": "Bearer <TDX_ACCESS_TOKEN>",
    "Content-Type": "application/json"
}
payload = {"Year": 2026, "FilterCity": "Taipei"}

response = requests.post(url, json=payload, headers=headers)
print("TDX 治理演算回傳:", response.json())`;
    }
    return `import requests

url = "https://tdx.transportdata.tw/api/basic${selectedEndpoint.apiPath}"
params = {
    "$top": ${topParam},
    "$format": "${formatParam}",
    "$filter": "${filterParam}"
}
headers = {"authorization": "Bearer <TDX_ACCESS_TOKEN>"}

response = requests.get(url, params=params, headers=headers)
data = response.json()
print(f"TDX 資料回傳: {len(data)} 筆")`;
  };

  const handleRunRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLiveResponse({
        status: 200,
        statusText: 'OK',
        latencyMs: Math.floor(Math.random() * 15) + 8,
        serviceTier: selectedEndpoint.category,
        method: selectedEndpoint.httpMethod,
        path: selectedEndpoint.apiPath,
        dataCount: parseInt(topParam, 10) || 10,
        records: Array.from({ length: 3 }).map((_, i) => ({
          id: `${selectedEndpoint.id.slice(0, 4)}-${i + 1}`,
          name: `${selectedEndpoint.name} [樣本 ${i + 1}]`,
          theme: selectedEndpoint.theme,
          domain: selectedEndpoint.domain,
          timestamp: new Date().toISOString(),
          status: 'Active 200 OK',
        })),
      });
    }, 400);
  };

  const handleCopyCode = () => {
    const code =
      codeLang === 'cURL'
        ? getCurlCode()
        : codeLang === 'Python'
        ? getPythonCode()
        : getTypeScriptCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#080d1a] text-slate-100 p-3 sm:p-4 flex flex-col justify-between font-mono select-none overflow-hidden text-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2.5 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white tracking-wide">
              TDX 開發者終端與 API 即時沙盒
            </h3>
            <p className="text-[10px] text-slate-400">
              OData 參數調配 · cURL / TS / Python 代碼自動生成 · 即時 Response 測試
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleRunRequest}
            disabled={isLoading}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{isLoading ? '執行中...' : '發送請求 (Run)'}</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column IDE Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2.5 my-2 overflow-hidden">
        {/* Left: Endpoint Selector & OData Params */}
        <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between overflow-y-auto custom-scrollbar space-y-2">
          <div>
            <span className="text-[10px] font-bold text-indigo-400 block mb-1.5">
              1. 選擇測試端點 (Endpoint):
            </span>
            <div className="space-y-1">
              {representativeEndpoints.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => setSelectedEndpoint(ep)}
                  className={`w-full text-left p-2 rounded-xl text-xs transition-all border ${
                    selectedEndpoint.id === ep.id
                      ? 'bg-indigo-950/80 border-indigo-500/60 text-white font-bold'
                      : 'bg-slate-950/60 border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={`text-[9px] px-1 rounded ${
                        ep.httpMethod === 'POST'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {ep.httpMethod}
                    </span>
                    <span className="text-[9px] text-slate-500">{ep.category}</span>
                  </div>
                  <div className="truncate font-semibold">{ep.name}</div>
                </button>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800 space-y-2 text-[11px]">
              <span className="text-[10px] font-bold text-indigo-400 block">
                2. OData 查詢參數設定:
              </span>
              <div>
                <label className="text-slate-400 block mb-0.5">$top (筆數)</label>
                <input
                  type="text"
                  value={topParam}
                  onChange={(e) => setTopParam(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-0.5">$filter (過濾條件)</label>
                <input
                  type="text"
                  value={filterParam}
                  onChange={(e) => setFilterParam(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Code Generator */}
        <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2">
              <div className="flex items-center space-x-1">
                {(['TypeScript', 'cURL', 'Python'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCodeLang(lang)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                      codeLang === lang
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1 text-[10px] text-cyan-300 hover:text-white"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '已複製' : '複製代碼'}</span>
              </button>
            </div>

            <pre className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 text-[10px] leading-relaxed overflow-x-auto custom-scrollbar max-h-56">
              {codeLang === 'cURL'
                ? getCurlCode()
                : codeLang === 'Python'
                ? getPythonCode()
                : getTypeScriptCode()}
            </pre>
          </div>

          <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px] text-slate-400 flex justify-between mt-2">
            <span>支援 Bearer Token 授權</span>
            <span className="text-emerald-400 font-bold">OData 語法就緒</span>
          </div>
        </div>

        {/* Right: Live Response Terminal */}
        <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 mb-2 text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Response (即時回傳)</span>
            </span>
            <span className="font-mono text-slate-400">{liveResponse.latencyMs} ms</span>
          </div>

          <pre className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 text-[10px] leading-relaxed overflow-auto custom-scrollbar">
            {JSON.stringify(liveResponse, null, 2)}
          </pre>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-2 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between text-[10px] text-slate-500">
        <span>沙盒工作區已整合 738 API 最新結構</span>
        <span>Developer Sandbox v4.1</span>
      </div>
    </div>
  );
};
