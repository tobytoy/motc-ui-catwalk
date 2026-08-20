import React, { useState } from 'react';
import { Bus, Train, Navigation, Bike, Plane, Radio, Sparkles, ArrowUpRight, Zap, Database } from 'lucide-react';
import servicesCatalog from '../../data/tdx/services_catalog.json';

export const TDXBentoMatrixUI: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoriesConfig = [
    {
      id: 'basic_provincial_highway',
      title: '公路客運與省道',
      icon: Bus,
      gradient: 'from-cyan-950/70 via-slate-900 to-slate-950',
      border: 'border-cyan-500/30 hover:border-cyan-400',
      accent: 'text-cyan-400',
      tagBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      speed: '每分鐘即時更新',
      badge: '免審核基礎服務',
    },
    {
      id: 'rail_transit',
      title: '高鐵·臺鐵·捷運軌道',
      icon: Train,
      gradient: 'from-blue-950/70 via-slate-900 to-slate-950',
      border: 'border-blue-500/30 hover:border-blue-400',
      accent: 'text-blue-400',
      tagBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      speed: '10秒級動態/MQTT',
      badge: '高頻軌道聯網',
    },
    {
      id: 'city_bus',
      title: '全臺 22 縣市公車',
      icon: Navigation,
      gradient: 'from-emerald-950/70 via-slate-900 to-slate-950',
      border: 'border-emerald-500/30 hover:border-emerald-400',
      accent: 'text-emerald-400',
      tagBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      speed: '15秒車輛GPS',
      badge: '百萬級乘載',
    },
    {
      id: 'green_micromobility',
      title: 'YouBike & 充電樁',
      icon: Bike,
      gradient: 'from-green-950/70 via-slate-900 to-slate-950',
      border: 'border-green-500/30 hover:border-green-400',
      accent: 'text-green-400',
      tagBg: 'bg-green-500/10 text-green-300 border-green-500/30',
      speed: '全場站即時樁位',
      badge: 'ESG 低碳永續',
    },
    {
      id: 'highway_freeway',
      title: '1968 國道路況與ETC',
      icon: Radio,
      gradient: 'from-purple-950/70 via-slate-900 to-slate-950',
      border: 'border-purple-500/30 hover:border-purple-400',
      accent: 'text-purple-400',
      tagBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      speed: '旅行時間矩陣',
      badge: '即時路網偵測',
    },
    {
      id: 'aviation_marine',
      title: '航空 FIDS & 客運船班',
      icon: Plane,
      gradient: 'from-sky-950/70 via-slate-900 to-slate-950',
      border: 'border-sky-500/30 hover:border-sky-400',
      accent: 'text-sky-400',
      tagBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
      speed: '起降看板/海象',
      badge: '空海口岸連網',
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#080b12] to-[#04060a] text-slate-100 p-4 sm:p-5 flex flex-col justify-between select-none overflow-y-auto">
      {/* Header with Bento Concept Tag */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                UI 典範 2 · 現代 Bento 模組矩陣
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-white">TDX 運輸資料主題矩陣</h3>
            </div>
            <p className="text-[11px] text-slate-400">視覺化模組封裝 · 一目瞭然掌握全領域 API 服務與即時更新頻率</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>150+ 服務端點全部就緒</span>
          </span>
        </div>
      </div>

      {/* Bento Grid 6-Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-3 flex-1">
        {categoriesConfig.map((cfg) => {
          const catData = servicesCatalog.categories.find((c) => c.id === cfg.id);
          const Icon = cfg.icon;
          const isSelected = activeCategory === cfg.id;

          return (
            <div
              key={cfg.id}
              onClick={() => setActiveCategory(isSelected ? null : cfg.id)}
              className={`p-3.5 rounded-2xl bg-gradient-to-br ${cfg.gradient} border ${cfg.border} backdrop-blur-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isSelected ? 'ring-2 ring-cyan-400 scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'
              }`}
            >
              {/* Top Row: Icon & Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-xl bg-black/40 border border-white/10 ${cfg.accent} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{cfg.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{cfg.speed}</span>
                  </div>
                </div>

                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${cfg.tagBg}`}>
                  {catData?.servicesCount || 20}+ API
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-300 line-clamp-2 my-1 leading-relaxed">
                {catData?.description}
              </p>

              {/* Endpoint Preview Chips */}
              <div className="flex flex-wrap gap-1 mt-2">
                {catData?.endpoints.slice(0, 3).map((ep, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/30 border border-white/5 text-slate-300 truncate max-w-[140px]"
                  >
                    {ep.name}
                  </span>
                ))}
              </div>

              {/* Footer Pill */}
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Zap className="w-3 h-3" /> {cfg.badge}
                </span>
                <span className="flex items-center gap-0.5 text-cyan-300 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>查看詳情</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          全臺交通數據統一 API 規範 (OData & Swagger 3.0)
        </span>
        <span className="font-mono text-cyan-400 font-bold">點選卡片可展開細項端點</span>
      </div>
    </div>
  );
};
