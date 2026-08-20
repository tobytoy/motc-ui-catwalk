import React, { useState } from 'react';
import { Home, ChevronLeft, ChevronRight, Search, Copy, Check, Braces } from 'lucide-react';

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
  sampleResponse?: Record<string, any>;
}

export const TDXMasterDetailUI: React.FC = () => {
  const [activeNavTab, setActiveNavTab] = useState('基礎服務');
  const [searchFilter, setSearchFilter] = useState('');
  const [copied, setCopied] = useState(false);

  const navTabs = [
    '基礎服務',
    '進階服務',
    '加值服務',
    '歷史服務',
    '觀光服務',
    '氣象服務',
    'MaaS服務',
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
      sampleResponse: {
        PlateNumb: 'KKA-1234',
        OperatorNo: '001',
        VehicleType: '1',
        HasDisabledFacility: true,
        ModelYear: 2024,
      },
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
      sampleResponse: {
        CityID: 'TPE',
        CityName: '臺北市',
        CityCode: '01',
        CityEngName: 'Taipei',
      },
    },
    {
      id: 'ep-3',
      name: '公路客運之最新消息',
      version: 'v2',
      isMqtt: true,
      frequency: '不定時',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/News/InterCity',
      description: '公路客運營運業者公告之最新即時營運異動、改道、天候停駛與即時消息（支援 MQTT 串流訂閱）。',
      sampleResponse: {
        NewsID: 'NEWS-202608-01',
        Title: '【即時公告】受天候影響，部分山區路線減班行駛',
        PublishTime: '2026-08-20T14:30:00+08:00',
      },
    },
    {
      id: 'ep-4',
      name: '公路客運每日營運時刻表資料',
      version: 'v2',
      frequency: '每日',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/Schedule/InterCity',
      description: '全臺公路客運每日班次發車時刻表、各站預計通過時間與假日特殊班表。',
      sampleResponse: {
        RouteUID: 'TXG1815',
        RouteName: '1815 臺北-金山',
        FrequenceTemplate: '固定時刻 (每日 48 班)',
      },
    },
    {
      id: 'ep-5',
      name: '公路客運動態定時資料 (A1) [批次更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/RealTimeByFrequency/InterCity',
      description: '公路客運車輛每分鐘定時回傳之 GPS 座標、行駛車速、方位角與當前站位代碼。',
      sampleResponse: {
        PlateNumb: 'KKA-8901',
        Speed: 52.4,
        PositionLat: 25.0421,
        PositionLon: 121.5245,
        GPSTime: '2026-08-20T15:45:00+08:00',
      },
    },
    {
      id: 'ep-6',
      name: '公路客運動態定點資料 (A2) [逐筆更新]',
      version: 'v2',
      frequency: '每分鐘',
      billingTimes: '1500次/點',
      billingVolume: '150MB/點',
      path: '/v2/Bus/RealTimeNearStop/Streaming/InterCity',
      description: '公路客運車輛進出站 (A2) 判定即時事件。',
      sampleResponse: {
        PlateNumb: 'KKA-8901',
        StopUID: 'TPE-S-104',
        A2EventType: '0 (進站)',
        EventTime: '2026-08-20T15:45:12+08:00',
      },
    },
  ];

  const [selectedEndpoint, setSelectedEndpoint] = useState<TDXEndpointItem>(endpointsData[0]);

  const filtered = endpointsData.filter((ep) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return ep.name.toLowerCase().includes(q) || ep.path.toLowerCase().includes(q);
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`curl -X GET "https://tdx.transportdata.tw/api/basic${selectedEndpoint.path}" -H "authorization: Bearer <TOKEN>"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#f8fafc] text-[#1e293b] flex flex-col justify-between text-xs select-none overflow-hidden font-sans border border-slate-300">
      {/* 1. Header */}
      <div className="bg-[#1a233a] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-700 shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-1.5 h-5 bg-cyan-400 rounded-sm" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
            {activeNavTab}
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 ml-2">
            官方微調版 B · 雙欄直列速查 (Master-Detail)
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-slate-300">
          <Home className="w-3.5 h-3.5 text-white" />
          <span>/</span>
          <span className="hover:text-white cursor-pointer">資料服務</span>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">{activeNavTab}</span>
        </div>
      </div>

      {/* 2. Nav Tabs */}
      <div className="bg-[#222d46] border-b border-slate-800 px-3 flex items-center justify-between shrink-0">
        <button className="text-slate-400 hover:text-white p-1">
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex space-x-1 overflow-x-auto py-1">
          {navTabs.map((tab) => {
            const isActive = activeNavTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveNavTab(tab)}
                className={`px-4 py-1.5 rounded-t text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#1a233a] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
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

      {/* 3. Main Split-Pane Workspace: Left List + Right Detail Inspector */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Column (5 Cols): Interactive Endpoint Selector */}
        <div className="md:col-span-5 bg-white border-r border-slate-200 p-3 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="relative mb-2.5">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="搜尋端點..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            <div className="space-y-1">
              {filtered.map((ep) => {
                const isSelected = selectedEndpoint.id === ep.id;
                return (
                  <div
                    key={ep.id}
                    onClick={() => setSelectedEndpoint(ep)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-cyan-50 border-cyan-400 shadow-sm'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 truncate mr-1">
                        {ep.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 shrink-0">
                        {ep.version}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 font-mono">
                      <span className="truncate max-w-[180px]">{ep.path}</span>
                      <span className="text-cyan-700 font-semibold">{ep.frequency}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 font-mono text-center">
            共 {filtered.length} 項服務可選
          </div>
        </div>

        {/* Right Column (7 Cols): Instant Detail Inspector Panel */}
        <div className="md:col-span-7 bg-[#f8fafc] p-3 sm:p-4 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm mb-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-bold">
                    {selectedEndpoint.version}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{selectedEndpoint.name}</h3>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-600 text-white font-semibold text-[11px] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已複製 cURL' : '複製 cURL'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedEndpoint.description}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-3 font-mono text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] text-slate-400 block">更新頻率</span>
                <span className="font-bold text-slate-800">{selectedEndpoint.frequency}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] text-slate-400 block">計費額度</span>
                <span className="font-bold text-emerald-600">1500次 / 150MB</span>
              </div>
            </div>

            {/* Live Response Payload Inspector */}
            <div className="bg-slate-900 rounded-xl p-3 text-slate-100 shadow-sm border border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800 mb-2">
                <span className="flex items-center gap-1 text-cyan-300">
                  <Braces className="w-3.5 h-3.5" />
                  即時回傳欄位 Schema 與範例數據
                </span>
                <span className="text-emerald-400 font-bold">200 OK</span>
              </div>
              <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-[140px] leading-relaxed">
                {JSON.stringify(selectedEndpoint.sampleResponse, null, 2)}
              </pre>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>即選即查 · 免跳轉彈窗</span>
            <span className="text-cyan-700 font-bold">SPLIT-PANE INSPECTOR READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
