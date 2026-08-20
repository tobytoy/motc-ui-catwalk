import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Cpu, Navigation, Zap } from 'lucide-react';

export const TrafficCommandUI: React.FC = () => {
  const [signalSeconds, setSignalSeconds] = useState(48);
  const [selectedCorridor, setSelectedCorridor] = useState('市民高架');
  const [activeAlert, setActiveAlert] = useState(0);

  const alerts = [
    '【即時推播】市民大道西向（林森-光復）車流量上升，AI 自適應號誌已自動延長綠燈 15s',
    '【事故通報】國道一號北上 23K 外側車道故障車已排除，車流回穩',
    '【天氣警戒】基隆北海岸陣雨路段，電子告示牌已啟動防滑速限警示',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSignalSeconds((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    const alertTimer = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(alertTimer);
    };
  }, []);

  const corridors = [
    { name: '市民高架', speed: '72 km/h', status: '順暢', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: '建國高架', speed: '38 km/h', status: '車多', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { name: '新生高架', speed: '65 km/h', status: '順暢', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: '環河南北', speed: '24 km/h', status: '壅塞', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-gradient-to-br from-[#0c101d] to-[#070911] text-slate-100 flex flex-col justify-between select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 animate-pulse">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">LIVE</span>
              <h3 className="font-bold text-sm sm:text-base text-white tracking-wide">全都會 AI 交通聯網戰情室</h3>
            </div>
            <p className="text-xs text-slate-400 font-mono">NODE ID: TP-GRID-CENTRAL-09</p>
          </div>
        </div>

        {/* Signal Optimization Pill */}
        <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-700/60">
          <Cpu className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-xs text-slate-300">AI 綠燈倒數:</span>
          <span className="text-xs font-mono font-bold text-cyan-300">{signalSeconds}s</span>
        </div>
      </div>

      {/* Alert Ticker */}
      <div className="my-3 px-3 py-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center space-x-2 text-xs">
        <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="text-cyan-200 font-medium truncate">{alerts[activeAlert]}</span>
      </div>

      {/* Corridor Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2">
        {corridors.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelectedCorridor(c.name)}
            className={`p-3 rounded-xl border text-left transition-all duration-300 ${
              selectedCorridor === c.name
                ? `${c.bg} ${c.border} ring-1 ring-cyan-400 shadow-lg shadow-cyan-500/10`
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs text-slate-400">{c.name}</div>
            <div className={`text-base sm:text-lg font-bold font-mono mt-1 ${c.color}`}>{c.speed}</div>
            <div className="flex items-center justify-between mt-1 text-[11px]">
              <span className={c.color}>{c.status}</span>
              <Activity className="w-3 h-3 text-slate-500" />
            </div>
          </button>
        ))}
      </div>

      {/* Live Map / Telemetry Simulation */}
      <div className="flex-1 min-h-[140px] bg-slate-950/60 rounded-xl border border-slate-800/80 p-3.5 relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            【{selectedCorridor}】即時路段流量負載波形
          </span>
          <span className="font-mono text-[11px] text-cyan-400/80">延遲: 8.4ms</span>
        </div>

        {/* Dynamic Wave Visualizer */}
        <div className="h-20 flex items-end space-x-1.5 px-1">
          {[42, 68, 85, 92, 70, 54, 88, 95, 60, 48, 75, 82, 64, 50, 78, 89, 65, 45].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-cyan-500/20 via-cyan-400 to-indigo-500 rounded-t transition-all duration-700 hover:brightness-125"
              style={{
                height: `${((h + (i % 3) * 8) % 100) * 0.75 + 15}%`,
                opacity: (i + 5) / 23,
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
          <span>06:00 (晨峰)</span>
          <span>12:00 (平峰)</span>
          <span>18:30 (晚峰)</span>
          <span className="text-cyan-400 font-semibold">NOW (自適應調控中)</span>
        </div>
      </div>

      {/* Footer Status */}
      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          全台 3,200 處路口協同聯網中
        </span>
        <span className="font-mono text-cyan-400">AI CONFIDENCE: 99.4%</span>
      </div>
    </div>
  );
};
