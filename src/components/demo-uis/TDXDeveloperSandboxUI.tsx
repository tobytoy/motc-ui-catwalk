import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Code, Braces } from 'lucide-react';
import basicServices from '../../data/tdx/basic_services.json';

export const TDXDeveloperSandboxUI: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('公路客運動態定時資料 (A1)');
  const [codeLang, setCodeLang] = useState<'cURL' | 'TypeScript' | 'Python'>('TypeScript');
  const [copied, setCopied] = useState(false);
  const [topParam, setTopParam] = useState('10');
  const [formatParam, setFormatParam] = useState('JSON');
  const [filterParam, setFilterParam] = useState('RouteNo eq "1815"');
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    { name: '公路客運動態定時資料 (A1)', method: 'GET', path: '/v2/Bus/RealTimeByFrequency/Streaming/InterCity', tag: '即時串流' },
    { name: '省道 CMS 資訊可變標誌即時資訊', method: 'GET', path: '/v2/Road/Traffic/Live/CMS/Provincial', tag: '路況事件' },
    { name: '全臺鐵路列車即時誤點看板', method: 'GET', path: '/v3/Rail/TRA/LiveTrainDelay', tag: '雙鐵軌道' },
    { name: '都會捷運進站倒數與車廂擁擠度', method: 'GET', path: '/v2/Metro/LiveBoard/TRTC', tag: '都會捷運' },
    { name: 'YouBike 2.0 場站即時車位與可借數', method: 'GET', path: '/v2/Bike/Availability/Taipei', tag: '低碳微移動' },
  ];

  const currentEndpoint = endpoints.find((e) => e.name === selectedEndpoint) || endpoints[0];

  const getCurlCode = () => {
    return `curl -X GET "https://tdx.transportdata.tw/api/basic${currentEndpoint.path}?$top=${topParam}&$format=${formatParam}&$filter=${encodeURIComponent(filterParam)}" \\
  -H "accept: application/json" \\
  -H "authorization: Bearer <TDX_ACCESS_TOKEN>"`;
  };

  const getTypeScriptCode = () => {
    return `import axios from 'axios';

// 取得 TDX ${selectedEndpoint}
async function fetchTDXData() {
  const url = 'https://tdx.transportdata.tw/api/basic${currentEndpoint.path}';
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
    return `import requests

url = "https://tdx.transportdata.tw/api/basic${currentEndpoint.path}"
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

  const getCodeContent = () => {
    if (codeLang === 'cURL') return getCurlCode();
    if (codeLang === 'Python') return getPythonCode();
    return getTypeScriptCode();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="w-full h-full bg-[#080c14] text-slate-100 p-3 sm:p-4 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                UI 典範 3 · 開發者終端與 API 沙盒
              </span>
              <h3 className="font-extrabold text-xs sm:text-sm text-white">TDX OpenAPI 互動工作區</h3>
            </div>
            <p className="text-[10px] text-slate-400">專為工程師打造 · 快速除錯、即時生成多語言 Code Snippet 與 JSON 預覽</p>
          </div>
        </div>

        <button
          onClick={handleSendTest}
          disabled={isLoading}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Play className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? '請求中...' : '測試 API 呼叫'}</span>
        </button>
      </div>

      {/* Main Sandbox Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2.5 flex-1 overflow-hidden">
        {/* Column 1: Endpoints Picker */}
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-2.5 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-[11px] font-bold text-slate-300 mb-2 flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-indigo-400" />
              <span>常用 API 端點清單</span>
            </div>
            <div className="space-y-1">
              {endpoints.map((ep) => (
                <button
                  key={ep.name}
                  onClick={() => setSelectedEndpoint(ep.name)}
                  className={`w-full p-2 rounded-lg text-left transition-all text-xs flex flex-col ${
                    selectedEndpoint === ep.name
                      ? 'bg-indigo-950/70 border border-indigo-500/50 text-white shadow-sm'
                      : 'bg-slate-900/40 border border-transparent text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                      {ep.method}
                    </span>
                    <span className="text-[9px] text-slate-500">{ep.tag}</span>
                  </div>
                  <span className="font-semibold text-xs mt-1 truncate">{ep.name}</span>
                  <span className="text-[9px] font-mono text-slate-500 truncate mt-0.5">{ep.path}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800">
            支援標準 OData 4.0 查詢語法
          </div>
        </div>

        {/* Column 2: Parameters Form */}
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-2.5 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <Braces className="w-3.5 h-3.5 text-cyan-400" />
              <span>OData 參數設定 (Query Parameters)</span>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">$top (限制筆數)</label>
              <input
                type="text"
                value={topParam}
                onChange={(e) => setTopParam(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white font-mono outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">$format (回傳格式)</label>
              <select
                value={formatParam}
                onChange={(e) => setFormatParam(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white font-mono outline-none"
              >
                <option value="JSON">JSON</option>
                <option value="XML">XML</option>
                <option value="GeoJSON">GeoJSON</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-0.5">$filter (過濾條件)</label>
              <input
                type="text"
                value={filterParam}
                onChange={(e) => setFilterParam(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white font-mono outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[10px] text-indigo-300">
            狀態碼: <span className="text-emerald-400 font-bold font-mono">200 OK</span> · 延遲: <span className="text-cyan-300 font-mono">14.2 ms</span>
          </div>
        </div>

        {/* Column 3: Generated Code & Response */}
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-2.5 flex flex-col justify-between overflow-hidden">
          <div>
            {/* Lang Tabs */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-1">
                {(['TypeScript', 'cURL', 'Python'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCodeLang(lang)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
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
                className="flex items-center space-x-1 text-[10px] text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '已複製' : '複製代碼'}</span>
              </button>
            </div>

            {/* Code Box */}
            <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-200 overflow-x-auto max-h-[140px] leading-relaxed">
              {getCodeContent()}
            </pre>
          </div>

          {/* Live JSON Response Preview */}
          <div className="mt-2 pt-2 border-t border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center justify-between">
              <span>即時回傳 JSON 預覽:</span>
              <span className="text-emerald-400 font-bold">4 筆符合</span>
            </div>
            <pre className="p-2 rounded bg-slate-900 text-[10px] font-mono text-slate-300 max-h-[90px] overflow-y-auto">
              {JSON.stringify(basicServices.intercityBusRoutes.slice(0, 2), null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          TDX API GATEWAY: ONLINE (HTTPS TLS 1.3)
        </span>
        <span className="text-slate-500">TDX CLIENT ID / SECRET READY</span>
      </div>
    </div>
  );
};
