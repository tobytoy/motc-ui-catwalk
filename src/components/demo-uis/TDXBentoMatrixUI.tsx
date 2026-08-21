import React from 'react';
import { Bus, Plane, Radio, Sparkles, ArrowUpRight, Zap, Database, ShieldAlert, Activity } from 'lucide-react';

export const TDXBentoMatrixUI: React.FC = () => {

  const categoriesConfig = [
    {
      id: 'transit_bus',
      title: '市區與公路公車',
      count: '224 支 API',
      icon: Bus,
      gradient: 'from-cyan-950/70 via-slate-900 to-slate-950',
      border: 'border-cyan-500/30 hover:border-cyan-400',
      accent: 'text-cyan-400',
      tagBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      speed: '15~60秒即時 A1/A2/N1',
      badge: '高密度公運',
      desc: '全臺 22 縣市市區公車、公路客運車輛定位、班表、票價與最新營運通阻。',
    },
    {
      id: 'governance_assessment',
      title: '交通治理加值運算',
      count: '201 支 API',
      icon: Activity,
      gradient: 'from-indigo-950/70 via-slate-900 to-slate-950',
      border: 'border-indigo-500/30 hover:border-indigo-400',
      accent: 'text-indigo-400',
      tagBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      speed: '年/月/日 績效指標 (POST)',
      badge: '加值治理演算',
      desc: '停車績效指標、轉乘空間縫隙、路網容量利用率與政策評估模型。',
    },
    {
      id: 'ticket_ic',
      title: '電子票證與運量',
      count: '155 支 API',
      icon: Database,
      gradient: 'from-blue-950/70 via-slate-900 to-slate-950',
      border: 'border-blue-500/30 hover:border-blue-400',
      accent: 'text-blue-400',
      tagBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      speed: '定期/月營運統計 (CSV/JSON)',
      badge: '票證金流統計',
      desc: '段次與里程計費型公車票證 (TO1/TO2)、捷運刷卡旅次 OD 矩陣。',
    },
    {
      id: 'road_safety',
      title: '道路安全與事故主檔',
      count: '111 支 API',
      icon: ShieldAlert,
      gradient: 'from-rose-950/70 via-slate-900 to-slate-950',
      border: 'border-rose-500/30 hover:border-rose-400',
      accent: 'text-rose-400',
      tagBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      speed: 'A1/A2/A30 事故大數據',
      badge: '道安零死亡',
      desc: '交通事故當事人資料表、事故主檔、易肇事路口碰撞風險模型與統計代碼。',
    },
    {
      id: 'highway_freeway',
      title: '公路路況與空間編碼',
      count: '61 支 API',
      icon: Radio,
      gradient: 'from-purple-950/70 via-slate-900 to-slate-950',
      border: 'border-purple-500/30 hover:border-purple-400',
      accent: 'text-purple-400',
      tagBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      speed: 'VD 車速 / eTag 旅行時間',
      badge: '路網即時感知',
      desc: '省道 VD 車輛偵測器、CMS 資訊可變標誌、路段空間編碼與 GIS 空間對應。',
    },
    {
      id: 'rail_air_marine',
      title: '雙鐵·空運·海運氣象',
      count: '48 支 API',
      icon: Plane,
      gradient: 'from-emerald-950/70 via-slate-900 to-slate-950',
      border: 'border-emerald-500/30 hover:border-emerald-400',
      accent: 'text-emerald-400',
      tagBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      speed: '秒級誤點 / 航班海象',
      badge: '海空鐵大聯運',
      desc: '台鐵/高鐵列車誤點、國際空港 FIDS、東亞智慧航路與中央氣象署海象觀測。',
    },
  ];

  return (
    <div className="w-full h-full p-3 sm:p-5 bg-gradient-to-br from-[#0b101e] via-[#070a14] to-[#03050a] text-slate-100 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                TDX 現代 Bento 模組矩陣
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                738 API 全域總覽
              </span>
            </div>
            <p className="text-xs text-slate-400">
              6 大領域模組 · 視覺色塊識別 · 數據更新頻率分級標章
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-slate-800">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>總收錄 738 支 API</span>
          </span>
        </div>
      </div>

      {/* Bento Grid 3x2 on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-2 flex-1 overflow-y-auto custom-scrollbar">
        {categoriesConfig.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between relative overflow-hidden group cursor-pointer`}
            >
              {/* Background ambient glow */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl bg-white/10 ${item.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black font-mono text-white block">
                      {item.count}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${item.tagBg}`}>
                      {item.badge}
                    </span>
                  </div>
                </div>

                <h4 className="font-extrabold text-sm text-white mb-1 flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                </h4>

                <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {item.speed}
                </span>
                <span className="text-slate-500 group-hover:text-cyan-300 transition-colors">
                  點擊展開 →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>最新 738 支 API 全域模組已就緒，包含加值治理 POST 與即時 MQTT 串流。</span>
        </span>
        <span className="font-mono text-[11px] text-indigo-300 hidden sm:inline">
          Bento UI v3.0
        </span>
      </div>
    </div>
  );
};
