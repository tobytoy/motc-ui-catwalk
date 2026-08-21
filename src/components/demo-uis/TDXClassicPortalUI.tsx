import React, { useState, useMemo } from 'react';
import { Home, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, FileText, Search, Copy, Check, X, Layers } from 'lucide-react';
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

export const TDXClassicPortalUI: React.FC = () => {
  const allEndpoints = apiMetadata as EndpointItem[];

  const [activeNavTab, setActiveNavTab] = useState('基礎服務');
  const [selectedTopic, setSelectedTopic] = useState('全部');
  const [selectedDomain, setSelectedDomain] = useState('全部');
  const [searchFilter, setSearchFilter] = useState('');
  const [isTopicOpen, setIsTopicOpen] = useState(true);
  const [isDomainOpen, setIsDomainOpen] = useState(true);
  const [modalEndpoint, setModalEndpoint] = useState<EndpointItem | null>(null);
  const [copiedModalPath, setCopiedModalPath] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Distinct category tabs from real 738 API records
  const navTabs = useMemo(() => {
    const counts: Record<string, number> = {};
    allEndpoints.forEach((ep) => {
      counts[ep.category] = (counts[ep.category] || 0) + 1;
    });
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  }, [allEndpoints]);

  // Topics within active category
  const topicsList = useMemo(() => {
    const list = allEndpoints.filter((ep) => ep.category === activeNavTab);
    const counts: Record<string, number> = {};
    list.forEach((ep) => {
      counts[ep.theme] = (counts[ep.theme] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [allEndpoints, activeNavTab]);

  // Domains within active category & topic
  const domainsList = useMemo(() => {
    let list = allEndpoints.filter((ep) => ep.category === activeNavTab);
    if (selectedTopic !== '全部') {
      list = list.filter((ep) => ep.theme === selectedTopic);
    }
    const counts: Record<string, number> = {};
    list.forEach((ep) => {
      counts[ep.domain] = (counts[ep.domain] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [allEndpoints, activeNavTab, selectedTopic]);

  // Filtered endpoints
  const filteredEndpoints = useMemo(() => {
    return allEndpoints.filter((ep) => {
      if (ep.category !== activeNavTab) return false;
      if (selectedTopic !== '全部' && ep.theme !== selectedTopic) return false;
      if (selectedDomain !== '全部' && ep.domain !== selectedDomain) return false;
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
  }, [allEndpoints, activeNavTab, selectedTopic, selectedDomain, searchFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEndpoints.length / pageSize));
  const paginatedEndpoints = filteredEndpoints.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedModalPath(true);
    setTimeout(() => setCopiedModalPath(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#f4f7fb] text-slate-800 flex flex-col font-sans select-none overflow-hidden relative text-xs">
      {/* 1. Official Header & Global Nav Bar */}
      <header className="bg-[#0c1938] text-white shrink-0 border-b border-[#1c2c54]">
        {/* Top Branding Row */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
              TDX
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider text-white">
                交通部運輸資料流通服務平臺
              </span>
              <span className="text-[10px] font-mono text-amber-300 ml-2 bg-amber-500/20 px-1.5 py-0.2 rounded">
                最新 738 API 測試機連線
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-amber-400" /> 首頁
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-mono">總收錄: {allEndpoints.length} 支 API</span>
          </div>
        </div>

        {/* Navy Blue Navigation Tabs */}
        <div className="px-3 flex items-center space-x-1 overflow-x-auto custom-scrollbar">
          {navTabs.map((tab) => {
            const count = allEndpoints.filter((e) => e.category === tab).length;
            const isActive = activeNavTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveNavTab(tab);
                  setSelectedTopic('全部');
                  setSelectedDomain('全部');
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 border-b-2 ${
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-[#162752]'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] font-mono px-1 rounded ${
                    isActive ? 'bg-amber-400/20 text-amber-200' : 'bg-black/30 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. Main Content Split: Left Sidebar Tree + Right High-Density Table */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Classification Tree */}
        <aside className="w-52 sm:w-60 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 overflow-y-auto custom-scrollbar p-3">
          <div className="space-y-3">
            {/* Search within Category */}
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="搜尋端點名稱或路徑..."
                className="w-full pl-7 pr-2 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
            </div>

            {/* Level 2: Topic Accordion */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div
                onClick={() => setIsTopicOpen(!isTopicOpen)}
                className="px-2.5 py-1.5 bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-700 cursor-pointer hover:bg-slate-200 transition-colors"
              >
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>業務主題 (Theme)</span>
                </span>
                {isTopicOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>

              {isTopicOpen && (
                <div className="p-1 space-y-0.5 max-h-40 overflow-y-auto custom-scrollbar">
                  <button
                    onClick={() => {
                      setSelectedTopic('全部');
                      setSelectedDomain('全部');
                      setCurrentPage(1);
                    }}
                    className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between ${
                      selectedTopic === '全部'
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>全部主題</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {allEndpoints.filter((e) => e.category === activeNavTab).length}
                    </span>
                  </button>

                  {topicsList.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => {
                        setSelectedTopic(t.name);
                        setSelectedDomain('全部');
                        setCurrentPage(1);
                      }}
                      className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between ${
                        selectedTopic === t.name
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate max-w-[120px]">{t.name}</span>
                      <span className="font-mono text-[10px] text-slate-400 ml-1">{t.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Level 3: Domain Accordion */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div
                onClick={() => setIsDomainOpen(!isDomainOpen)}
                className="px-2.5 py-1.5 bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-700 cursor-pointer hover:bg-slate-200 transition-colors"
              >
                <span>功能領域 (Domain)</span>
                {isDomainOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>

              {isDomainOpen && (
                <div className="p-1 space-y-0.5 max-h-36 overflow-y-auto custom-scrollbar">
                  <button
                    onClick={() => {
                      setSelectedDomain('全部');
                      setCurrentPage(1);
                    }}
                    className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between ${
                      selectedDomain === '全部'
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>全部領域</span>
                  </button>

                  {domainsList.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => {
                        setSelectedDomain(d.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between ${
                        selectedDomain === d.name
                          ? 'bg-indigo-50 text-indigo-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate max-w-[120px]">{d.name}</span>
                      <span className="font-mono text-[10px] text-slate-400 ml-1">{d.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 font-mono">
            <span>3 層階層: 大類 ➔ 主題 ➔ 領域</span>
          </div>
        </aside>

        {/* Right Official High-Density Table */}
        <main className="flex-1 flex flex-col justify-between bg-white overflow-hidden p-3">
          {/* Breadcrumb & Filter Status Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-1.5 text-xs text-slate-600">
              <span className="font-bold text-indigo-900">{activeNavTab}</span>
              <span>/</span>
              <span className="text-slate-800 font-medium">{selectedTopic}</span>
              {selectedDomain !== '全部' && (
                <>
                  <span>/</span>
                  <span className="text-indigo-600">{selectedDomain}</span>
                </>
              )}
              <span className="text-[10px] font-mono text-slate-400 ml-2">
                (共 {filteredEndpoints.length} 支端點)
              </span>
            </div>

            <div className="flex items-center space-x-1 text-[11px]">
              <span className="text-slate-500 font-mono">
                第 {currentPage} / {totalPages} 頁
              </span>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 my-2 overflow-y-auto custom-scrollbar border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#eef3f9] text-[#1b2b4f] font-bold sticky top-0 z-10 border-b border-slate-300">
                <tr>
                  <th className="py-2 px-2.5 w-12 text-center">Method</th>
                  <th className="py-2 px-3">端點服務名稱與功能領域</th>
                  <th className="py-2 px-3">API URL 路徑</th>
                  <th className="py-2 px-2.5 w-24">更新頻率</th>
                  <th className="py-2 px-2.5 w-28">計費規則</th>
                  <th className="py-2 px-2 w-16 text-center">規格</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedEndpoints.map((ep) => (
                  <tr
                    key={ep.id}
                    onClick={() => setModalEndpoint(ep)}
                    className="hover:bg-indigo-50/70 cursor-pointer transition-colors group"
                  >
                    <td className="py-2 px-2 text-center font-mono font-bold">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] ${
                          ep.httpMethod === 'POST'
                            ? 'bg-purple-100 text-purple-700 border border-purple-300'
                            : 'bg-blue-100 text-blue-700 border border-blue-300'
                        }`}
                      >
                        {ep.httpMethod}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-900 group-hover:text-indigo-700">
                      <div className="truncate max-w-[200px] sm:max-w-[280px]">{ep.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                        <span className="font-mono text-slate-500">[{ep.domain}]</span>
                        <span>{ep.theme}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 font-mono text-[11px] text-slate-600 truncate max-w-[180px] sm:max-w-[240px]">
                      {ep.apiPath}
                    </td>
                    <td className="py-2 px-2.5 text-slate-600 font-medium whitespace-nowrap">
                      {ep.updateFrequency}
                    </td>
                    <td className="py-2 px-2.5 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                      <div>{ep.billingTimes}</div>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalEndpoint(ep);
                        }}
                        className="p-1 rounded bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 transition-colors"
                        title="查看 OpenAPI 詳細說明"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Stats */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>官方 1:1 像素級架構 · 點擊任一列查看 OpenAPI 規範</span>
            <span className="font-mono">
              顯示 {(currentPage - 1) * pageSize + 1} -{' '}
              {Math.min(currentPage * pageSize, filteredEndpoints.length)} 筆
            </span>
          </div>
        </main>
      </div>

      {/* 3. OpenAPI 3.0 Standard Modal */}
      {modalEndpoint && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-lg w-full p-5 text-slate-800 space-y-3 relative select-text animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                    modalEndpoint.httpMethod === 'POST'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {modalEndpoint.httpMethod}
                </span>
                <h4 className="font-bold text-sm text-slate-900 truncate max-w-[280px]">
                  {modalEndpoint.name}
                </h4>
              </div>
              <button
                onClick={() => setModalEndpoint(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-600 block mb-0.5">API Path 端點路徑:</span>
                <div className="flex items-center justify-between p-2 rounded bg-slate-100 font-mono text-[11px] border border-slate-200">
                  <span className="truncate">{modalEndpoint.apiPath}</span>
                  <button
                    onClick={() => handleCopyPath(modalEndpoint.apiPath)}
                    className="p-1 text-indigo-600 hover:text-indigo-800"
                    title="複製路徑"
                  >
                    {copiedModalPath ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">業務主題:</span>
                  <div className="font-bold text-slate-800">{modalEndpoint.theme}</div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">功能領域:</span>
                  <div className="font-bold text-slate-800">{modalEndpoint.domain}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-slate-700 leading-relaxed">
                <span className="font-bold text-indigo-900 block mb-1">功能描述:</span>
                <p>{modalEndpoint.description || '提供此服務項目的標準資料查詢與即時回傳。'}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>更新頻率: {modalEndpoint.updateFrequency}</span>
                <span>格式: {modalEndpoint.supportFormat}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setModalEndpoint(null)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
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
