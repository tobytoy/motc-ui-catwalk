import React, { useState } from 'react';
import { Compass, Car, Bus, Bike, Plane, CheckCircle2, Download, Sparkles, Layers } from 'lucide-react';

export const TDXScenarioJourneyUI: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState('commute');
  const [copiedBundle, setCopiedBundle] = useState(false);

  const scenarios = [
    {
      id: 'commute',
      title: '都會無縫公車捷運轉乘',
      icon: Bus,
      desc: '雙北跨運具即時到站倒數、車廂人潮熱圖與捷運出口 YouBike 樁位無縫接駁。',
      accent: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/30',
      apis: [
        { name: '市區公車預估到站資料 (N1)', freq: '15秒', type: 'CityBus' },
        { name: '捷運列車進站與車廂負載熱圖', freq: '10秒', type: 'TRTC' },
        { name: 'YouBike 2.0 場站即時車位與可借數', freq: '60秒', type: 'MicroMobility' },
        { name: '公車站牌幾何圖資與轉乘路線', freq: '每日', type: 'GIS' },
      ],
      estimatedDevTime: '約 3 天可上線',
    },
    {
      id: 'freeway',
      title: '連假國道返鄉路況助手',
      icon: Car,
      desc: '整合 1968 即時車速、雪隧旅行時間矩陣、CMS 資訊可變標誌與服務區空位。',
      accent: 'text-purple-400',
      border: 'border-purple-500/40',
      bg: 'bg-purple-950/30',
      apis: [
        { name: '國道各路段即時平均車速 (Freeway Speed)', freq: '2分鐘', type: 'Freeway' },
        { name: '國道即時旅行時間預估 (Travel Time Matrix)', freq: '5分鐘', type: 'Matrix' },
        { name: '省道/國道 CMS 資訊看板即時告警', freq: '即時', type: 'CMS' },
        { name: '國道服務區即時停車格位', freq: '3分鐘', type: 'Parking' },
      ],
      estimatedDevTime: '約 2 天可上線',
    },
    {
      id: 'green_esg',
      title: '企業 ESG 低碳通勤存摺',
      icon: Bike,
      desc: '記錄員工騎乘 YouBike、搭乘捷運與公車之里程數，自動換算個人減碳量與 ESG 報告。',
      accent: 'text-green-400',
      border: 'border-green-500/40',
      bg: 'bg-green-950/30',
      apis: [
        { name: 'YouBike 2.0 騎行場站圖資與距離計算', freq: '每日', type: 'Bike' },
        { name: '都會捷運站點里程與票價矩陣', freq: '定期', type: 'Metro' },
        { name: '公車路線站位間距與碳排係數', freq: '定期', type: 'Bus' },
      ],
      estimatedDevTime: '約 5 天可上線',
    },
    {
      id: 'travel',
      title: '全臺機場高鐵海運聯運',
      icon: Plane,
      desc: '國際航班 FIDS 起降動態、高鐵班次自由座配額與離島客運渡輪風浪預警。',
      accent: 'text-sky-400',
      border: 'border-sky-500/40',
      bg: 'bg-sky-950/30',
      apis: [
        { name: '全臺機場航班起降看板 (Air FIDS)', freq: '60秒', type: 'Air' },
        { name: '高鐵每日時刻表與自由座配置', freq: '每日', type: 'THSR' },
        { name: '國內客船即時開航與海象停航預警', freq: '10分鐘', type: 'Marine' },
      ],
      estimatedDevTime: '約 4 天可上線',
    },
  ];

  const current = scenarios.find((s) => s.id === activeScenario) || scenarios[0];

  const handleCopyBundle = () => {
    const jsonStr = JSON.stringify(current, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedBundle(true);
    setTimeout(() => setCopiedBundle(false), 2000);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#080d18] to-[#04070e] text-slate-100 p-4 sm:p-5 flex flex-col justify-between select-none overflow-y-auto font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                UI 典範 6 · 生活情境與服務套件導引
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-white">TDX 應用情境解決方案庫</h3>
            </div>
            <p className="text-[10px] text-slate-400">以人為本 · 依實際開發需求一鍵打包所需之 TDX 跨運具 API 服務組</p>
          </div>
        </div>

        <button
          onClick={handleCopyBundle}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300 hover:text-white transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{copiedBundle ? '已複製服務包' : '一鍵匯出情境包'}</span>
        </button>
      </div>

      {/* Scenario Tabs Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isSelected = activeScenario === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setActiveScenario(sc.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? `${sc.bg} ${sc.border} ring-2 ring-emerald-400 shadow-lg scale-105`
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${sc.accent}`} />
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-slate-400">
                  {sc.apis.length} API
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-2 truncate">{sc.title}</div>
            </button>
          );
        })}
      </div>

      {/* Scenario Blueprint Card */}
      <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex-1 flex flex-col justify-between my-1">
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div>
              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>【{current.title}】所需 TDX 服務套件藍圖</span>
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5">{current.desc}</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              {current.estimatedDevTime}
            </span>
          </div>

          {/* API Flow List */}
          <div className="space-y-2 mt-3">
            {current.apis.map((api, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between text-xs hover:border-slate-700"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="font-semibold text-white">{api.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 ml-2">[{api.type}]</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                    頻率: {api.freq}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-200 mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            套件包含 OpenAPI 文件、範例 Payload 與 cURL 指令
          </span>
          <span className="font-mono text-cyan-300 font-bold">1-CLICK INTEGRATION</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          全臺智慧交通場景快速賦能
        </span>
        <span className="font-mono text-emerald-400">TDX SOLUTIONS HUB</span>
      </div>
    </div>
  );
};
