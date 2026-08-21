import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Braces, FileJson } from 'lucide-react';
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

export const TDXMasterDetailUI: React.FC = () => {
  const allEndpoints = apiMetadata as EndpointItem[];

  const [activeCategory, setActiveCategory] = useState('基礎服務');
  const [selectedId, setSelectedId] = useState<string>(allEndpoints[0]?.id || '');
  const [searchFilter, setSearchFilter] = useState('');
  const [copied, setCopied] = useState(false);

  // Categories list
  const categoryTabs = useMemo(() => {
    const counts: Record<string, number> = {};
    allEndpoints.forEach((ep) => {
      counts[ep.category] = (counts[ep.category] || 0) + 1;
    });
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  }, [allEndpoints]);

  // Filtered endpoints
  const filteredEndpoints = useMemo(() => {
    return allEndpoints.filter((ep) => {
      if (ep.category !== activeCategory) return false;
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        return (
          ep.name.toLowerCase().includes(query) ||
          ep.apiPath.toLowerCase().includes(query) ||
          ep.domain.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [allEndpoints, activeCategory, searchFilter]);

  const currentEndpoint =
    filteredEndpoints.find((e) => e.id === selectedId) ||
    filteredEndpoints[0] ||
    allEndpoints[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate realistic dynamic schema sample
  const sampleJson = useMemo(() => {
    if (!currentEndpoint) return {};
    return {
      Status: 'Success',
      HTTPStatus: 200,
      Endpoint: currentEndpoint.apiPath,
      Category: currentEndpoint.category,
      Theme: currentEndpoint.theme,
      Domain: currentEndpoint.domain,
      UpdateFrequency: currentEndpoint.updateFrequency,
      BillingPolicy: currentEndpoint.billingTimes,
      DataPayload: [
        {
          Id: currentEndpoint.id.slice(0, 8),
          Name: currentEndpoint.name,
          Version: currentEndpoint.version,
          UpdateTime: new Date().toISOString(),
          Coordinate: { Latitude: 25.0478, Longitude: 121.517 },
          Properties: {
            SupportFormat: currentEndpoint.supportFormat,
            SupportMQTT: currentEndpoint.supportMQTT || false,
            IsRestricted: currentEndpoint.isRestricted,
          },
        },
      ],
    };
  }, [currentEndpoint]);

  return (
    <div className="w-full h-full bg-[#080d1a] text-slate-100 flex flex-col font-sans select-none overflow-hidden text-xs">
      {/* Top Header */}
      <div className="p-3 bg-slate-900/90 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Braces className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
              TDX 雙欄直列速查 · 即選即看
            </h3>
            <p className="text-[10px] text-slate-400">
              左欄點選端點 · 右欄即時展開 Schema 結構與 JSON Response（免開彈窗）
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto custom-scrollbar">
          {categoryTabs.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                const first = allEndpoints.find((e) => e.category === cat);
                if (first) setSelectedId(first.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split-Pane Master-Detail */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Master List (40%) */}
        <div className="w-[42%] sm:w-[38%] border-r border-white/10 bg-slate-950/60 flex flex-col justify-between overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-white/5">
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="搜尋端點..."
                className="w-full pl-7 pr-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2" />
            </div>
          </div>

          {/* Master Items List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-1.5 space-y-1">
            {filteredEndpoints.map((ep) => {
              const isSelected = ep.id === currentEndpoint?.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => setSelectedId(ep.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 border-cyan-500/50 shadow-md'
                      : 'bg-slate-900/40 hover:bg-slate-900 border-transparent hover:border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 mb-1">
                    <span
                      className={`text-[9px] font-mono font-bold px-1 rounded ${
                        ep.httpMethod === 'POST'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {ep.httpMethod}
                    </span>
                    <span className="font-bold text-xs text-white truncate max-w-[180px]">
                      {ep.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="truncate max-w-[120px]">{ep.domain}</span>
                    <span className="text-slate-500">{ep.updateFrequency}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-2 border-t border-white/5 text-[10px] font-mono text-slate-500 flex justify-between">
            <span>收錄: {filteredEndpoints.length} 支</span>
            <span>0 彈窗即選即看</span>
          </div>
        </div>

        {/* Right Detail Pane (60%) */}
        <div className="flex-1 bg-slate-900/40 flex flex-col justify-between overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3">
          {currentEndpoint ? (
            <>
              {/* Detail Header */}
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs">
                      {currentEndpoint.httpMethod}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-white">
                      {currentEndpoint.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-indigo-300 font-mono mt-1">
                    {currentEndpoint.apiPath}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleCopyCode(
                      `curl -X ${currentEndpoint.httpMethod} "https://tdx.transportdata.tw/api/basic${currentEndpoint.apiPath}"`
                    )
                  }
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>複製 cURL</span>
                </button>
              </div>

              {/* Detail Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">業務主題</span>
                  <div className="font-bold text-white mt-0.5">{currentEndpoint.theme}</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">功能領域</span>
                  <div className="font-bold text-white mt-0.5">{currentEndpoint.domain}</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">更新頻率</span>
                  <div className="font-bold text-emerald-400 mt-0.5">{currentEndpoint.updateFrequency}</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">計費規則</span>
                  <div className="font-bold text-amber-400 mt-0.5">{currentEndpoint.billingTimes}</div>
                </div>
              </div>

              {/* JSON Live Response Tree */}
              <div className="flex-1 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col">
                <div className="p-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-cyan-300 flex items-center gap-1.5">
                    <FileJson className="w-3.5 h-3.5" />
                    <span>即時 Response Payload (JSON 預覽)</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">200 OK • application/json</span>
                </div>
                <pre className="p-3 text-[11px] font-mono text-emerald-300 leading-relaxed overflow-x-auto custom-scrollbar flex-1 bg-[#040711]">
                  {JSON.stringify(sampleJson, null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              請從左側點選端點以檢視詳細規格
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
