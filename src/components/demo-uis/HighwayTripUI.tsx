import React, { useState, useEffect } from 'react';
import { Gauge, AlertTriangle, ParkingSquare, Zap } from 'lucide-react';
import highwayData from '../../data/tdx/highway_services.json';
import basicData from '../../data/tdx/basic_services.json';

export const HighwayTripUI: React.FC = () => {
  const [cmsIndex, setCmsIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCmsIndex((prev) => (prev + 1) % basicData.cmsSigns.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const corridors = highwayData.corridors;
  const currentCms = basicData.cmsSigns[cmsIndex];

  return (
    <div className="w-full h-full p-3 sm:p-5 bg-gradient-to-br from-[#120d1c] via-[#090812] to-[#040308] text-slate-100 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-purple-500/20 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-400 shadow-lg shadow-purple-500/10">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                TDX 國道高快速路網即時旅行時間
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                高公局 1968
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <span>全臺 1,280 處 eTag / VD 門架即時運算</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            全線動態更新中
          </span>
        </div>
      </div>

      {/* CMS Live Variable Sign Simulator */}
      <div className="my-2 p-2.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between shadow-lg shadow-amber-950/20">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 animate-pulse">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-1 rounded bg-amber-500/30 text-amber-200">
                {currentCms.location}
              </span>
              <span className="text-xs font-extrabold text-amber-300">CMS 資訊看板</span>
            </div>
            <p className="text-xs text-slate-200 font-medium tracking-wide mt-0.5">
              {currentCms.message}
            </p>
          </div>
        </div>
        <div className="text-right pl-2 shrink-0">
          <span className="text-xs font-black font-mono text-amber-400">速限 {currentCms.speedLimit}</span>
        </div>
      </div>

      {/* Corridors Travel Times Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-1">
        {corridors.map((c, i) => (
          <div
            key={i}
            className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-white">{c.freeway}</span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${c.color}22`, color: c.color }}
                >
                  {c.status}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono mb-2">{c.section}</div>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-t border-white/5">
              <div>
                <span className="text-xs text-slate-400">預估時間</span>
                <div className="text-xl font-black font-mono text-white">
                  {c.travelTimeMin} <span className="text-xs font-normal text-slate-400">分</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">平均車速</span>
                <div className="text-sm font-bold font-mono text-purple-300">{c.speedAvg}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Areas Live Rest Stop Status */}
      <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ParkingSquare className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-slate-300">國道服務區即時車位：</span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          {highwayData.serviceAreas.map((sa, idx) => (
            <div key={idx} className="flex items-center space-x-1 font-mono">
              <span className="text-slate-400">{sa.name.slice(0, 2)}:</span>
              <span className="font-bold text-emerald-400">{sa.vacantSpaces}位</span>
              <span className="text-purple-400 flex items-center text-[10px]">
                <Zap className="w-2.5 h-2.5 mr-0.5" />
                {sa.electricSpaces}槍
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
