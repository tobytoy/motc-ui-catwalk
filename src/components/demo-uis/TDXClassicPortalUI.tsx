import React, { useState } from 'react';
import { Home, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, FileText, Search, Copy, Check, X, ArrowUpDown } from 'lucide-react';

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

export const TDXClassicPortalUI: React.FC = () => {
  const [activeNavTab, setActiveNavTab] = useState('基礎服務');
  const [selectedTopic, setSelectedTopic] = useState('全部');
  const [searchFilter, setSearchFilter] = useState('');
  const [isTopicOpen, setIsTopicOpen] = useState(true);
  const [isDomainOpen, setIsDomainOpen] = useState(true);
  const [modalEndpoint, setModalEndpoint] = useState<TDXEndpointItem | null>(null);
  const [copiedModalPath, setCopiedModalPath] = useState(false);

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

  // Exactly matching the official endpoints shown in the user's screenshot
  const endpointsData: TDXEndpointItem[] = [
    {
      id: 'ep-1',
      name: '全臺公路客運與公路局代管縣市市區公車車輛資料',
      version: 'v2',
      frequency: '不定時',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/Vehicle/InterCity',
      description: '提供全臺公路客運與公路局代管縣市市區公車之車輛靜態資料（含車號、出廠年份、車身型式與無障礙設備等）。',
    },
    {
      id: 'ep-2',
      name: '全臺縣市代碼資料(City)',
      version: 'v2',
      frequency: '不定時',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Basic/City',
      description: '全臺縣市代碼對照表（含 CityID、CityName、CityCode 及英文名稱）。',
    },
    {
      id: 'ep-3',
      name: '全臺縣市代碼資料(County)',
      version: 'v2',
      frequency: '不定時',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Basic/County',
      description: '全臺鄉鎮市區代碼對照表（含 CountyID、CountyName 及行政分區幾何中心座標）。',
    },
    {
      id: 'ep-4',
      name: '公路客運之最新消息',
      version: 'v2',
      isMqtt: true,
      frequency: '不定時',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/News/InterCity',
      description: '公路客運營運業者公告之最新即時營運異動、改道、天候停駛與即時消息（支援 MQTT 串流訂閱）。',
    },
    {
      id: 'ep-5',
      name: '公路客運每日營運時刻表資料',
      version: 'v2',
      frequency: '每日',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/Schedule/InterCity',
      description: '全臺公路客運每日班次發車時刻表、各站預計通過時間與假日特殊班表。',
    },
    {
      id: 'ep-6',
      name: '公路客運營運業者資料',
      version: 'v2',
      frequency: '每日',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/Operator/InterCity',
      description: '全臺公路客運客運公司基本資料（含業者代碼、業者名稱、服務電話與官方網址）。',
    },
    {
      id: 'ep-7',
      name: '公路客運之營運阻礙資料',
      version: 'v2',
      isMqtt: true,
      frequency: '不定時',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/Alert/InterCity',
      description: '公路客運即時道路施工、交通事故、管制或道路中斷通報資料（支援 MQTT 串流即時推送）。',
    },
    {
      id: 'ep-8',
      name: '公路客運動態定時資料(A1)[批次更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/RealTimeByFrequency/InterCity',
      description: '公路客運車輛每分鐘定時回傳之 GPS 座標、行駛車速、方位角與當前站位代碼（批次更新檔）。',
    },
    {
      id: 'ep-9',
      name: '公路客運動態定時資料(A1)[逐筆更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/RealTimeByFrequency/Streaming/InterCity',
      description: '公路客運車輛秒級動態定時逐筆更新串流資料。',
    },
    {
      id: 'ep-10',
      name: '公路客運動態定點資料(A2)[批次更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/RealTimeNearStop/InterCity',
      description: '公路客運車輛進出站 (A2) 判定事件（含進站、離站時間戳記與站牌代碼）。',
    },
    {
      id: 'ep-11',
      name: '公路客運動態定點資料(A2)[逐筆更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/RealTimeNearStop/Streaming/InterCity',
      description: '公路客運車輛進出站即時逐筆推播事件。',
    },
    {
      id: 'ep-12',
      name: '公路客運目前資料最新版本資訊',
      version: 'v2',
      frequency: '每日',
      billingTimes: '計次:1500次 / 1 點',
      billingVolume: '計量:150MB / 1 點',
      path: '/v2/Bus/DataVersion/InterCity',
      description: '全臺公路客運靜態路線圖資、站牌與時刻表之最新資料版本號與最後更新時間戳記。',
    },
  ];

  const filteredEndpoints = endpointsData.filter((ep) => {
    if (searchFilter.trim() !== '') {
      const q = searchFilter.toLowerCase();
      return ep.name.toLowerCase().includes(q) || ep.path.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(`https://tdx.transportdata.tw/api/basic${path}`);
    setCopiedModalPath(true);
    setTimeout(() => setCopiedModalPath(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#f4f6f9] text-[#2c3e50] flex flex-col justify-between text-xs select-none overflow-hidden font-sans border border-[#dcdfe6]">
      {/* 1. Official Header Bar (Dark Navy #1A233A) */}
      <div className="bg-[#1a233a] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-[#2d3a54] shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-1 h-5 bg-[#f5a623] rounded-none" />
          <h2 className="text-base sm:text-lg font-bold tracking-wide text-white">
            {activeNavTab}
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600/30 text-blue-200 border border-blue-400/30 ml-2">
            交通部 TDX 官方原版樣式還原
          </span>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-1.5 text-xs text-[#a0aec0]">
          <Home className="w-3.5 h-3.5 text-white" />
          <span>/</span>
          <span className="hover:text-white cursor-pointer">資料服務</span>
          <span>/</span>
          <span className="text-white font-semibold">{activeNavTab}</span>
        </div>
      </div>

      {/* 2. Official Horizontal Navigation Tabs Bar (#222D46) */}
      <div className="bg-[#222d46] border-b border-[#141b2d] px-2 sm:px-4 flex items-center justify-between shrink-0">
        <button className="text-slate-400 hover:text-white p-1">
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1">
          {navTabs.map((tab) => {
            const isActive = activeNavTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveNavTab(tab)}
                className={`px-4 sm:px-6 py-2 rounded-t font-medium text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#1a233a] font-bold shadow-md'
                    : 'text-[#cbd5e1] hover:text-white hover:bg-[#2d3a54]'
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

      {/* 3. Main Workspace: Left Dark Sidebar (#1A233A) + Right Light Content Table (#F4F6F9) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (#1A233A) */}
        <div className="w-48 sm:w-56 bg-[#1a233a] text-white p-3 flex flex-col justify-between overflow-y-auto border-r border-[#2d3a54] shrink-0">
          <div className="space-y-4">
            {/* Search Input Box */}
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="搜尋..."
                className="w-full bg-[#101726] border border-[#2d3a54] rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Section 1: 資料主題 */}
            <div className="border border-[#2d3a54] rounded overflow-hidden">
              <button
                onClick={() => setIsTopicOpen(!isTopicOpen)}
                className="w-full bg-[#243048] px-2.5 py-2 flex items-center justify-between text-xs font-bold text-slate-200"
              >
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 border border-slate-400 flex items-center justify-center">
                    <span className="text-[8px]">+</span>
                  </div>
                  <span>資料主題</span>
                </div>
                {isTopicOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isTopicOpen && (
                <div className="bg-[#1a233a] py-1">
                  {topicsList.map((t) => (
                    <div
                      key={t.name}
                      onClick={() => setSelectedTopic(t.name)}
                      className={`px-3 py-1.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                        selectedTopic === t.name
                          ? 'bg-[#243048] text-white font-semibold'
                          : 'text-[#a0aec0] hover:text-white hover:bg-[#141b2d]'
                      }`}
                    >
                      <span className="truncate">{t.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#ff7a00] text-white font-bold">
                        {t.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 2: 領域類型 */}
            <div className="border border-[#2d3a54] rounded overflow-hidden">
              <button
                onClick={() => setIsDomainOpen(!isDomainOpen)}
                className="w-full bg-[#243048] px-2.5 py-2 flex items-center justify-between text-xs font-bold text-slate-200"
              >
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 border border-slate-400 flex items-center justify-center">
                    <span className="text-[8px]">•</span>
                  </div>
                  <span>領域類型</span>
                </div>
                {isDomainOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isDomainOpen && (
                <div className="bg-[#1a233a] py-1">
                  {domainsList.map((d) => (
                    <div
                      key={d.name}
                      className="px-3 py-1.5 flex items-center justify-between text-xs text-[#a0aec0] hover:text-white hover:bg-[#141b2d] cursor-pointer"
                    >
                      <span className="truncate">{d.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#ff4d6d] text-white font-bold">
                        {d.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#2d3a54] text-[10px] text-slate-400 font-mono text-center">
            交通部運輸資料流通服務平臺
          </div>
        </div>

        {/* Right Main Table Content Area (#F4F6F9) */}
        <div className="flex-1 bg-[#f4f6f9] p-3 sm:p-4 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Top Instruction Box (Exact TDX styling) */}
            <div className="bg-white p-3 rounded-sm border border-[#e2e8f0] shadow-sm mb-3 text-xs text-[#334155] leading-relaxed">
              <h4 className="font-bold text-[#1e293b] mb-1">基礎服務使用說明：</h4>
              <p>
                1. 依據交通部運輸資料流通服務平臺資料使用規範，本服務屬於「
                <strong className="text-[#2563eb]">免審核提供資料</strong>
                」，詳細資料取得規範請參考{' '}
                <a href="#rules" className="text-[#2563eb] hover:underline">
                  資料使用授權規範
                </a>
                。
              </p>
            </div>

            {/* Official Data Table */}
            <div className="bg-white border border-[#e2e8f0] rounded-sm shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#3e4d6c] text-white font-medium text-[11px]">
                    <th className="py-2.5 px-3 font-semibold">
                      <div className="flex items-center space-x-1">
                        <span>服務名稱</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-300" />
                      </div>
                    </th>
                    <th className="py-2.5 px-3 text-center font-semibold">計費方式</th>
                    <th className="py-2.5 px-3 text-center font-semibold">
                      <div className="flex items-center justify-center space-x-1">
                        <span>更新頻率</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-300" />
                      </div>
                    </th>
                    <th className="py-2.5 px-3 text-center font-semibold">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf2f7] text-[#2d3748]">
                  {filteredEndpoints.map((ep, idx) => (
                    <tr
                      key={ep.id}
                      className={`hover:bg-[#f8fafc] transition-colors ${
                        idx % 2 === 1 ? 'bg-[#fafbfc]' : 'bg-white'
                      }`}
                    >
                      {/* Service Name */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-normal text-[#1a202c] hover:text-[#2563eb] cursor-pointer">
                            {ep.name}
                          </span>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#4a5568] text-white font-bold">
                            {ep.version}
                          </span>
                          {ep.isMqtt && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#ff7a00] text-white font-bold">
                              MQTT
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Billing Pills (Green) */}
                      <td className="py-2.5 px-3 text-center">
                        <div className="inline-flex items-center space-x-1 font-mono text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-[#52c41a] text-white font-medium">
                            {ep.billingTimes}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#52c41a] text-white font-medium">
                            {ep.billingVolume}
                          </span>
                        </div>
                      </td>

                      {/* Frequency */}
                      <td className="py-2.5 px-3 text-center text-[#4a5568] font-normal">
                        {ep.frequency}
                      </td>

                      {/* Action Button */}
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => setModalEndpoint(ep)}
                          className="px-2.5 py-1 rounded bg-[#334155] hover:bg-[#1e293b] text-white text-[11px] font-medium transition-colors inline-flex items-center space-x-1 shadow-sm"
                        >
                          <FileText className="w-3 h-3 text-slate-200" />
                          <span>說明</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Pagination & Count Bar */}
          <div className="mt-3 pt-2 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#64748b]">
            <div>顯示第 1 至 {filteredEndpoints.length} 項結果，共 {endpointsData.length} 項服務</div>
            <div className="flex items-center space-x-1 font-mono">
              <button className="px-2 py-1 border border-[#cbd5e1] rounded bg-white text-[#334155] hover:bg-slate-50">1</button>
              <button className="px-2 py-1 border border-transparent rounded text-[#64748b] hover:bg-slate-200">2</button>
              <button className="px-2 py-1 border border-transparent rounded text-[#64748b] hover:bg-slate-200">3</button>
            </div>
          </div>
        </div>
      </div>

      {/* OpenAPI Detail Modal for "說明" */}
      {modalEndpoint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full border border-[#cbd5e1] overflow-hidden text-slate-800 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#1a233a] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#f5a623]" />
                <h3 className="font-bold text-sm truncate">{modalEndpoint.name}</h3>
              </div>
              <button
                onClick={() => setModalEndpoint(null)}
                className="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-3 text-xs leading-relaxed max-h-[70vh] overflow-y-auto">
              <div>
                <span className="font-bold text-[#1e293b] block mb-1">服務說明：</span>
                <p className="text-[#475569] bg-[#f8fafc] p-2.5 rounded border border-[#e2e8f0]">
                  {modalEndpoint.description}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#1e293b] block mb-1">API 呼叫端點 (Endpoint URL)：</span>
                <div className="flex items-center justify-between bg-[#1e293b] text-[#38bdf8] p-2.5 rounded font-mono text-[11px]">
                  <span className="truncate">https://tdx.transportdata.tw/api/basic{modalEndpoint.path}</span>
                  <button
                    onClick={() => handleCopyPath(modalEndpoint.path)}
                    className="ml-2 p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white shrink-0 transition-colors"
                  >
                    {copiedModalPath ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2 bg-[#f1f5f9] rounded border border-[#e2e8f0]">
                  <span className="text-[#64748b] block text-[10px]">更新頻率</span>
                  <span className="font-bold text-[#1e293b]">{modalEndpoint.frequency}</span>
                </div>
                <div className="p-2 bg-[#f1f5f9] rounded border border-[#e2e8f0]">
                  <span className="text-[#64748b] block text-[10px]">計費方式</span>
                  <span className="font-bold text-[#15803d]">1500次/點 · 150MB/點</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-[#1e293b] block mb-1">cURL 測試範例：</span>
                <pre className="bg-[#0f172a] text-[#86efac] p-2.5 rounded font-mono text-[10px] overflow-x-auto leading-relaxed">
{`curl -X GET "https://tdx.transportdata.tw/api/basic${modalEndpoint.path}?$top=10&$format=JSON" \\
  -H "accept: application/json" \\
  -H "authorization: Bearer <YOUR_ACCESS_TOKEN>"`}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#f8fafc] px-4 py-2.5 border-t border-[#e2e8f0] flex justify-end">
              <button
                onClick={() => setModalEndpoint(null)}
                className="px-4 py-1.5 rounded bg-[#334155] hover:bg-[#1e293b] text-white font-medium text-xs transition-colors"
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
