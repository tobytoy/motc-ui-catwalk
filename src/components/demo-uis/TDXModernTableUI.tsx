import React, { useState } from 'react';
import { Home, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, FileText, Search, Copy, Check, X, Zap } from 'lucide-react';

interface TDXEndpointItem {
  id: string;
  name: string;
  version: string;
  isMqtt?: boolean;
  frequency: string;
  billingTimes: string;
  billingVolume: string;
  path: string;
  description: string;
}

export const TDXModernTableUI: React.FC = () => {
  const [activeNavTab, setActiveNavTab] = useState('基礎服務');
  const [selectedTopic, setSelectedTopic] = useState('全部');
  const [searchFilter, setSearchFilter] = useState('');
  const [isTopicOpen, setIsTopicOpen] = useState(true);
  const [isDomainOpen, setIsDomainOpen] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalEndpoint, setModalEndpoint] = useState<TDXEndpointItem | null>(null);

  const navTabs = [
    '基礎服務',
    '進階服務',
    '加值服務',
    '歷史服務',
    '觀光服務',
    '氣象服務',
    'MaaS服務',
  ];

  const topicsList = [
    { name: '公共運輸', count: 1416 },
    { name: '道路事件', count: 23 },
    { name: '路況資訊', count: 420 },
    { name: '停車資訊', count: 359 },
    { name: '觀光資訊', count: 22 },
    { name: '綠色運輸', count: 231 },
    { name: 'GIS圖資', count: 347 },
    { name: '路段編碼', count: 98 },
  ];

  const domainsList = [
    { name: '公路客運', count: 37 },
    { name: '市區公車', count: 910 },
    { name: '行政區', count: 51 },
    { name: '公共運輸', count: 40 },
  ];

  const endpointsData: TDXEndpointItem[] = [
    {
      id: 'ep-1',
      name: '全臺公路客運與公路局代管縣市市區公車車輛資料',
      version: 'v2',
      frequency: '不定時',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/Vehicle/InterCity',
      description: '提供全臺公路客運與公路局代管縣市市區公車之車輛靜態資料（含車號、出廠年份、車身型式與無障礙設備等）。',
    },
    {
      id: 'ep-2',
      name: '全臺縣市代碼資料 (City)',
      version: 'v2',
      frequency: '不定時',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Basic/City',
      description: '全臺縣市代碼對照表（含 CityID、CityName、CityCode 及英文名稱）。',
    },
    {
      id: 'ep-3',
      name: '全臺縣市代碼資料 (County)',
      version: 'v2',
      frequency: '不定時',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Basic/County',
      description: '全臺鄉鎮市區代碼對照表（含 CountyID、CountyName 及行政分區幾何中心座標）。',
    },
    {
      id: 'ep-4',
      name: '公路客運之最新消息',
      version: 'v2',
      isMqtt: true,
      frequency: '不定時',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/News/InterCity',
      description: '公路客運營運業者公告之最新即時營運異動、改道、天候停駛與即時消息（支援 MQTT 串流訂閱）。',
    },
    {
      id: 'ep-5',
      name: '公路客運每日營運時刻表資料',
      version: 'v2',
      frequency: '每日',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/Schedule/InterCity',
      description: '全臺公路客運每日班次發車時刻表、各站預計通過時間與假日特殊班表。',
    },
    {
      id: 'ep-6',
      name: '公路客運營運業者資料',
      version: 'v2',
      frequency: '每日',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/Operator/InterCity',
      description: '全臺公路客運客運公司基本資料（含業者代碼、業者名稱、服務電話與官方網址）。',
    },
    {
      id: 'ep-7',
      name: '公路客運之營運阻礙資料',
      version: 'v2',
      isMqtt: true,
      frequency: '不定時',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/Alert/InterCity',
      description: '公路客運即時道路施工、交通事故、管制或道路中斷通報資料（支援 MQTT 串流即時推送）。',
    },
    {
      id: 'ep-8',
      name: '公路客運動態定時資料 (A1) [批次更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/RealTimeByFrequency/InterCity',
      description: '公路客運車輛每分鐘定時回傳之 GPS 座標、行駛車速、方位角與當前站位代碼（批次更新檔）。',
    },
    {
      id: 'ep-9',
      name: '公路客運動態定時資料 (A1) [逐筆更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/RealTimeByFrequency/Streaming/InterCity',
      description: '公路客運車輛秒級動態定時逐筆更新串流資料。',
    },
    {
      id: 'ep-10',
      name: '公路客運動態定點資料 (A2) [批次更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/RealTimeNearStop/InterCity',
      description: '公路客運車輛進出站 (A2) 判定事件（含進站、離站時間戳記與站牌代碼）。',
    },
  ];

  const filtered = endpointsData.filter((ep) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return ep.name.toLowerCase().includes(q) || ep.path.toLowerCase().includes(q);
  });

  const handleCopy = (id: string, path: string) => {
    navigator.clipboard.writeText(`https://tdx.transportdata.tw/api/basic${path}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full h-full bg-[#f1f5f9] text-[#1e293b] flex flex-col justify-between text-xs select-none overflow-hidden font-sans border border-slate-300">
      {/* 1. Header with subtle modern gradient */}
      <div className="bg-gradient-to-r from-[#172033] to-[#1e293b] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-700 shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-1.5 h-5 bg-amber-400 rounded-sm" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
            {activeNavTab}
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 ml-2">
            官方微調版 A · 現代卡匣表格
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-slate-300">
          <Home className="w-3.5 h-3.5 text-white" />
          <span>/</span>
          <span className="hover:text-white cursor-pointer">資料服務</span>
          <span>/</span>
          <span className="text-amber-400 font-semibold">{activeNavTab}</span>
        </div>
      </div>

      {/* 2. Top Nav Tabs with refined hover pills */}
      <div className="bg-[#1e293b] border-b border-slate-800 px-3 flex items-center justify-between shrink-0">
        <button className="text-slate-400 hover:text-white p-1">
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex space-x-1 overflow-x-auto py-1.5">
          {navTabs.map((tab) => {
            const isActive = activeNavTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveNavTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#1e293b] shadow-sm scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <button className="text-slate-400 hover:text-white p-1">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-48 sm:w-56 bg-[#172033] text-white p-3 flex flex-col justify-between overflow-y-auto border-r border-slate-700 shrink-0">
          <div className="space-y-3.5">
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="搜尋服務..."
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Topics Section */}
            <div className="border border-slate-700/80 rounded-lg overflow-hidden bg-slate-900/40">
              <button
                onClick={() => setIsTopicOpen(!isTopicOpen)}
                className="w-full bg-slate-800/80 px-2.5 py-2 flex items-center justify-between text-xs font-bold text-slate-200"
              >
                <span>資料主題</span>
                {isTopicOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isTopicOpen && (
                <div className="py-1">
                  {topicsList.map((t) => (
                    <div
                      key={t.name}
                      onClick={() => setSelectedTopic(t.name)}
                      className={`px-3 py-1.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                        selectedTopic === t.name
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>{t.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold">
                        {t.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Domains Section */}
            <div className="border border-slate-700/80 rounded-lg overflow-hidden bg-slate-900/40">
              <button
                onClick={() => setIsDomainOpen(!isDomainOpen)}
                className="w-full bg-slate-800/80 px-2.5 py-2 flex items-center justify-between text-xs font-bold text-slate-200"
              >
                <span>領域類型</span>
                {isDomainOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isDomainOpen && (
                <div className="py-1">
                  {domainsList.map((d) => (
                    <div
                      key={d.name}
                      className="px-3 py-1.5 flex items-center justify-between text-xs text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                    >
                      <span>{d.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold">
                        {d.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/80 text-[10px] text-slate-400 font-mono text-center">
            TDX 交通部運輸流通平臺
          </div>
        </div>

        {/* Right Content Area: Modern Card-Rows instead of plain table */}
        <div className="flex-1 bg-[#f8fafc] p-3 sm:p-4 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-2">
            {/* Notice header */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between text-xs text-slate-600">
              <div>
                <span className="font-bold text-slate-900 mr-2">基礎服務使用說明：</span>
                依規範本服務屬於「<strong className="text-blue-600">免審核提供資料</strong>」，即刻開通呼叫。
              </div>
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold hidden sm:inline">
                SLA 99.98%
              </span>
            </div>

            {/* Modern Card Rows */}
            <div className="space-y-1.5">
              {filtered.map((ep) => (
                <div
                  key={ep.id}
                  className="bg-white hover:bg-slate-50/80 border border-slate-200/90 rounded-xl p-3 shadow-sm hover:shadow transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        {ep.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                        {ep.version}
                      </span>
                      {ep.isMqtt && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300 font-bold flex items-center gap-0.5">
                          <Zap className="w-2.5 h-2.5 text-amber-600" />
                          MQTT
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 truncate max-w-lg">
                      {ep.path}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                    {/* Billing pills */}
                    <div className="flex items-center space-x-1 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                        {ep.billingTimes}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-semibold hidden md:inline">
                        {ep.billingVolume}
                      </span>
                    </div>

                    {/* Frequency */}
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {ep.frequency}
                    </span>

                    {/* 1-Click Copy cURL */}
                    <button
                      onClick={() => handleCopy(ep.id, ep.path)}
                      title="複製 API 端點 URL"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      {copiedId === ep.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Action */}
                    <button
                      onClick={() => setModalEndpoint(ep)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <FileText className="w-3 h-3" />
                      <span>說明</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>顯示 {filtered.length} 項服務</span>
            <span className="font-mono text-slate-600">MODERN COMPACT TABLE</span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {modalEndpoint && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden text-slate-800 animate-in fade-in zoom-in duration-200">
            <div className="bg-[#1e293b] text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold text-sm truncate">{modalEndpoint.name}</h3>
              <button onClick={() => setModalEndpoint(null)} className="p-1 text-slate-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <p className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 leading-relaxed">
                {modalEndpoint.description}
              </p>
              <div className="p-2.5 bg-slate-900 text-cyan-300 font-mono text-[11px] rounded-lg">
                https://tdx.transportdata.tw/api/basic{modalEndpoint.path}
              </div>
            </div>
            <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setModalEndpoint(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs"
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
