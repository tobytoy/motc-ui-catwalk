import React, { useState, useMemo } from 'react';
import { FileText, Search, Check, X, Zap, Terminal } from 'lucide-react';
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

export const TDXModernTableUI: React.FC = () => {
  const allEndpoints = apiMetadata as EndpointItem[];

  const [activeCategory, setActiveCategory] = useState('基礎服務');
  const [selectedTheme, setSelectedTheme] = useState('全部');
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalEndpoint, setModalEndpoint] = useState<EndpointItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Categories list
  const categoryTabs = useMemo(() => {
    const counts: Record<string, number> = {};
    allEndpoints.forEach((ep) => {
      counts[ep.category] = (counts[ep.category] || 0) + 1;
    });
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  }, [allEndpoints]);

  // Themes list
  const themeList = useMemo(() => {
    const list = allEndpoints.filter((ep) => ep.category === activeCategory);
    const counts: Record<string, number> = {};
    list.forEach((ep) => {
      counts[ep.theme] = (counts[ep.theme] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [allEndpoints, activeCategory]);

  // Filtered endpoints
  const filteredEndpoints = useMemo(() => {
    return allEndpoints.filter((ep) => {
      if (ep.category !== activeCategory) return false;
      if (selectedTheme !== '全部' && ep.theme !== selectedTheme) return false;
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
  }, [allEndpoints, activeCategory, selectedTheme, searchFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEndpoints.length / pageSize));
  const paginatedEndpoints = filteredEndpoints.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCopyCurl = (ep: EndpointItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const curl = `curl -X ${ep.httpMethod} "https://tdx.transportdata.tw/api/basic${ep.apiPath}?$top=30&$format=JSON" -H "accept: application/json"`;
    navigator.clipboard.writeText(curl);
    setCopiedId(ep.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full h-full bg-[#0b1120] text-slate-100 flex flex-col font-sans select-none overflow-hidden relative text-xs">
      {/* 1. Header Bar */}
      <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between shrink-0 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                TDX 現代卡匣式 API 表格
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                Card Rows v2.6
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              圓角獨立卡匣 · 一鍵複製 cURL · 即時脈衝頻率燈
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-44 sm:w-60">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="過濾 738 支 API 端點..."
            className="w-full pl-7 pr-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
        </div>
      </div>

      {/* 2. Category & Theme Filter Strip */}
      <div className="px-3 py-2 bg-slate-950/60 border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto custom-scrollbar">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedTheme('全部');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Theme Select Dropdown */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="text-[11px] text-slate-400 font-medium">主題:</span>
          <select
            value={selectedTheme}
            onChange={(e) => {
              setSelectedTheme(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none"
          >
            <option value="全部">全部主題 ({themeList.reduce((a, b) => a + b.count, 0)})</option>
            {themeList.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} ({t.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Main Modern Card Rows List */}
      <div className="flex-1 p-3 overflow-y-auto custom-scrollbar space-y-2">
        {paginatedEndpoints.map((ep) => (
          <div
            key={ep.id}
            onClick={() => setModalEndpoint(ep)}
            className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/80 hover:border-cyan-500/40 transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer group"
          >
            {/* Left Info */}
            <div className="flex items-start space-x-3">
              <div className="pt-0.5">
                <span
                  className={`px-2 py-0.5 rounded-md font-mono font-black text-[10px] tracking-wide ${
                    ep.httpMethod === 'POST'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  {ep.httpMethod}
                </span>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {ep.name}
                  </h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {ep.domain}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 mt-0.5">
                  <span className="text-indigo-300 truncate max-w-[240px] sm:max-w-md">
                    {ep.apiPath}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Meta & Fast Action */}
            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
              <div className="text-right hidden md:block">
                <div className="text-[11px] font-medium text-slate-300 flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{ep.updateFrequency}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-500">{ep.billingTimes}</div>
              </div>

              <button
                onClick={(e) => handleCopyCurl(ep, e)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  copiedId === ep.id
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-slate-950 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
                }`}
                title="複製 cURL 指令"
              >
                {copiedId === ep.id ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>已複製</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-3 h-3" />
                    <span>cURL</span>
                  </>
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalEndpoint(ep);
                }}
                className="p-1.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 transition-colors"
                title="查看規格"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bottom Pagination */}
      <div className="p-2.5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
        <span className="text-[11px] font-mono">
          共 {filteredEndpoints.length} 支端點 · 顯示第 {(currentPage - 1) * pageSize + 1} -{' '}
          {Math.min(currentPage * pageSize, filteredEndpoints.length)} 筆
        </span>

        <div className="flex items-center space-x-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-slate-800"
          >
            上一頁
          </button>
          <span className="font-mono text-slate-300">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-slate-800"
          >
            下一頁
          </button>
        </div>
      </div>

      {/* 5. Detail Modal */}
      {modalEndpoint && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl border border-white/15 shadow-2xl max-w-lg w-full p-6 text-slate-100 space-y-3 relative select-text animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs">
                  {modalEndpoint.httpMethod}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-white truncate max-w-[280px]">
                  {modalEndpoint.name}
                </h4>
              </div>
              <button
                onClick={() => setModalEndpoint(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-400 block mb-1">API Path:</span>
                <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-cyan-300 border border-slate-800">
                  {modalEndpoint.apiPath}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 leading-relaxed">
                <span className="font-bold text-white block mb-1">端點描述:</span>
                <p>{modalEndpoint.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">主題 / 領域:</span>
                  <div className="text-white font-bold">{modalEndpoint.theme} / {modalEndpoint.domain}</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500">計費規則:</span>
                  <div className="text-emerald-400 font-bold">{modalEndpoint.billingTimes}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setModalEndpoint(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
