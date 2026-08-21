import React, { useState, useMemo } from 'react';
import { Search, Command, Check, Copy } from 'lucide-react';
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

export const TDXCommandPaletteUI: React.FC = () => {
  const allEndpoints = apiMetadata as EndpointItem[];

  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('全部');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const tags = [
    '全部',
    '免審核基礎 (213)',
    '加值治理 (201)',
    '電子票證 (155)',
    '道路安全 (111)',
    '市區公車',
    '即時秒級',
  ];

  const filtered = useMemo(() => {
    return allEndpoints.filter((ep) => {
      if (selectedTag === '免審核基礎 (213)' && !ep.category.includes('基礎')) return false;
      if (selectedTag === '加值治理 (201)' && !ep.category.includes('加值')) return false;
      if (selectedTag === '電子票證 (155)' && !ep.category.includes('票證')) return false;
      if (selectedTag === '道路安全 (111)' && !ep.theme.includes('道安') && !ep.domain.includes('安全')) return false;
      if (selectedTag === '市區公車' && !ep.domain.includes('公車')) return false;
      if (selectedTag === '即時秒級' && !['15', '30', '60', '0'].includes(ep.updateFrequency)) return false;

      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        ep.name.toLowerCase().includes(q) ||
        ep.apiPath.toLowerCase().includes(q) ||
        ep.domain.toLowerCase().includes(q) ||
        ep.theme.toLowerCase().includes(q)
      );
    });
  }, [allEndpoints, selectedTag, query]);

  const [selectedItem, setSelectedItem] = useState<EndpointItem>(filtered[0] || allEndpoints[0]);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="w-full h-full bg-[#080c14] text-slate-100 p-3 sm:p-5 flex flex-col justify-between select-none overflow-hidden font-sans text-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2.5 shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Command className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                TDX 極速指令搜尋中樞
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold">
                Cmd+K Spotlight
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              全域 738 API 模糊檢索 · 標籤分組過濾 · 1 步直達 URL
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-purple-300 hidden sm:inline bg-purple-950/50 px-2.5 py-1 rounded-xl border border-purple-500/30">
          內存索引: {allEndpoints.length} 支端點
        </span>
      </div>

      {/* Main Search Input Box */}
      <div className="my-2 shrink-0">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="打字搜尋（例如: 南投 停車、公車動態、A1事故、票證）..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-purple-500/40 text-sm text-white placeholder-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all shadow-xl"
          />
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3.5" />
        </div>

        {/* Filter Tags */}
        <div className="flex items-center space-x-1.5 mt-2 overflow-x-auto custom-scrollbar py-0.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Split Results Area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden my-1">
        {/* Left Search Results List */}
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-2 overflow-y-auto custom-scrollbar space-y-1.5 flex flex-col justify-between">
          <div className="space-y-1">
            {filtered.slice(0, 15).map((ep) => {
              const isSelected = selectedItem?.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => setSelectedItem(ep)}
                  className={`p-2 rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500/50 text-white'
                      : 'bg-slate-950/40 hover:bg-slate-950/80 border-transparent text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span
                      className={`text-[9px] font-mono font-bold px-1 rounded ${
                        ep.httpMethod === 'POST'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {ep.httpMethod}
                    </span>
                    <span className="font-bold text-xs truncate max-w-[200px]">{ep.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-1">
                    {ep.domain}
                  </span>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-slate-500">無符合關鍵字之 API 端點</div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
            <span>匹配到 {filtered.length} 筆端點</span>
            <span>按 ↑ ↓ 鍵快速切換</span>
          </div>
        </div>

        {/* Right Selected Endpoint Detail Panel */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-3 flex flex-col justify-between overflow-y-auto custom-scrollbar space-y-2.5">
          {selectedItem ? (
            <>
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {selectedItem.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {selectedItem.updateFrequency}
                  </span>
                </div>

                <h4 className="font-black text-sm text-white mt-2 mb-1">{selectedItem.name}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-950 p-2.5 rounded-xl border border-slate-800 mb-2">
                  {selectedItem.description || '提供此服務項目的標準資料查詢與即時回傳。'}
                </p>

                {/* API Path Box */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">
                    API Endpoint Path:
                  </span>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-purple-300 flex items-center justify-between">
                    <span className="truncate">{selectedItem.apiPath}</span>
                    <button
                      onClick={() => handleCopy(selectedItem.apiPath)}
                      className="p-1 text-purple-400 hover:text-white"
                      title="複製路徑"
                    >
                      {copiedPath === selectedItem.apiPath ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono mt-2">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">主題:</span>
                    <div className="text-white font-bold">{selectedItem.theme}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">計費點數:</span>
                    <div className="text-amber-400 font-bold">{selectedItem.billingTimes}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() =>
                    handleCopy(
                      `curl -X ${selectedItem.httpMethod} "https://tdx.transportdata.tw/api/basic${selectedItem.apiPath}"`
                    )
                  }
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md"
                >
                  複製 cURL 呼叫範例
                </button>
              </div>
            </>
          ) : (
            <div className="text-slate-500 text-center py-10">請點選左側端點</div>
          )}
        </div>
      </div>

      {/* Footer Shortcut Bar */}
      <div className="p-2 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono shrink-0">
        <span>快速鍵: 輸入關鍵字即時搜尋 · Enter 複製</span>
        <span>Command Palette v2.2</span>
      </div>
    </div>
  );
};
