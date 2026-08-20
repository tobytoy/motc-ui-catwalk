import React, { useState } from 'react';
import { Bike, Leaf, Award, TrendingUp, BatteryCharging, TreePine } from 'lucide-react';

export const GreenTransitUI: React.FC = () => {
  const [activeStation, setActiveStation] = useState('捷運忠孝新生站 (3號出口)');

  const bikeStations = [
    { name: '捷運忠孝新生站 (3號出口)', available: 18, total: 25, ebike: 6, status: '車輛充足', color: 'text-emerald-400' },
    { name: '華山文創園區', available: 4, total: 30, ebike: 1, status: '車位緊張', color: 'text-amber-400' },
    { name: '台北科技大學', available: 22, total: 28, ebike: 9, status: '車輛充足', color: 'text-emerald-400' },
  ];

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-gradient-to-br from-[#0a1a11] to-[#040e08] text-slate-100 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">ESG GOALS</span>
              <h3 className="font-bold text-white text-sm sm:text-base">低碳綠能出行足跡儀表</h3>
            </div>
            <p className="text-xs text-slate-400">CITIZEN ECO PASS: #MOTC-GREEN-889</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-500/30">
          <Award className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-slate-300">綠色點數:</span>
          <span className="text-xs font-mono font-bold text-emerald-300">4,920 pts</span>
        </div>
      </div>

      {/* Hero KPI Cards */}
      <div className="grid grid-cols-3 gap-2.5 my-2">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <TreePine className="w-3.5 h-3.5 text-emerald-400" /> 累積減碳量
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-1">428.5 kg</div>
          <div className="text-[10px] text-emerald-300/80 mt-0.5">相當於種植 36 棵樹</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Bike className="w-3.5 h-3.5 text-emerald-400" /> 綠騎行里程
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-1">1,820 km</div>
          <div className="text-[10px] text-slate-400 mt-0.5">本月累計 48 次</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> 減碳達成率
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-1">142 %</div>
          <div className="text-[10px] text-emerald-300/80 mt-0.5">超越年度目標</div>
        </div>
      </div>

      {/* YouBike Station Real-time Heat */}
      <div className="flex-1 min-h-[130px] bg-slate-950/60 rounded-xl border border-slate-800/80 p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
          <span className="font-semibold flex items-center gap-1.5">
            <Bike className="w-3.5 h-3.5 text-emerald-400" />
            周邊 YouBike 2.0 / 2.0E 智慧樁位預測調度
          </span>
          <span className="font-mono text-emerald-400/80 text-[11px]">AI 補車建議已推播</span>
        </div>

        <div className="space-y-2">
          {bikeStations.map((station) => (
            <div
              key={station.name}
              onClick={() => setActiveStation(station.name)}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                activeStation === station.name
                  ? 'bg-emerald-950/40 border-emerald-500/50 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="text-xs font-medium text-white">{station.name}</div>
                <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>總樁位: {station.total}</span>
                  <span className="flex items-center gap-0.5 text-emerald-400">
                    <BatteryCharging className="w-3 h-3" /> 電輔車 2.0E: {station.ebike} 輛
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold font-mono text-emerald-400">
                  {station.available} <span className="text-xs font-normal text-slate-400">可借</span>
                </div>
                <div className={`text-[10px] ${station.color}`}>{station.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          全台綠運輸碳權存摺即時連線中
        </span>
        <span className="font-mono text-emerald-400">ESG NET ZERO 2050</span>
      </div>
    </div>
  );
};
