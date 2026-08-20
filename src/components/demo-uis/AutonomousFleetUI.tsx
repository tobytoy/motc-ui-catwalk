import React, { useState, useEffect } from 'react';
import { Bot, Battery, Radio, Shield, Map, Wifi, CheckCircle2 } from 'lucide-react';

export const AutonomousFleetUI: React.FC = () => {
  const [activeVehicle, setActiveVehicle] = useState('AV-SHUTTLE-01');
  const [telemetrySpeed, setTelemetrySpeed] = useState(24.8);

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetrySpeed(parseFloat((24 + Math.random() * 2.5).toFixed(1)));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const shuttles = [
    { id: 'AV-SHUTTLE-01', route: '高鐵特區 ⇄ 科技園區', battery: 92, speed: `${telemetrySpeed} km/h`, lidar: '正常 (360°)', passengers: '8/12', status: '自駕巡航中' },
    { id: 'AV-SHUTTLE-02', route: '生醫園區環狀線', battery: 74, speed: '21.4 km/h', lidar: '正常 (360°)', passengers: '11/12', status: '自駕巡航中' },
    { id: 'AV-SHUTTLE-03', route: '智慧物流調度線', battery: 38, speed: '0.0 km/h', lidar: '待機中', passengers: '貨物載送', status: '充電站補能中' },
  ];

  const current = shuttles.find((s) => s.id === activeVehicle) || shuttles[0];

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-gradient-to-br from-[#181206] to-[#0d0903] text-slate-100 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">LEVEL 4 AV</span>
              <h3 className="font-bold text-white text-sm sm:text-base">前瞻自駕車隊 AI 調度中樞</h3>
            </div>
            <p className="text-xs text-slate-400 font-mono">REMOTE FLEET OPS: HKS-AUTONOMOUS-GRID</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-amber-950/60 px-3 py-1.5 rounded-full border border-amber-500/30">
          <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs text-slate-300">5G C-V2X:</span>
          <span className="text-xs font-mono font-bold text-amber-300">4.2 ms</span>
        </div>
      </div>

      {/* Shuttle Selection Pills */}
      <div className="flex space-x-2 my-2 overflow-x-auto pb-1">
        {shuttles.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveVehicle(s.id)}
            className={`px-3 py-2 rounded-xl border text-left shrink-0 transition-all ${
              activeVehicle === s.id
                ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between space-x-3">
              <span className="text-xs font-bold font-mono text-amber-300">{s.id}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{s.speed}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 truncate max-w-[130px]">{s.route}</div>
          </button>
        ))}
      </div>

      {/* Main Telemetry & LiDAR Canvas */}
      <div className="flex-1 min-h-[140px] bg-slate-950/70 rounded-xl border border-slate-800/80 p-3.5 flex flex-col justify-between relative overflow-hidden">
        {/* Background LiDAR Grid Mock */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="flex items-center justify-between text-xs text-slate-300 relative z-10">
          <span className="font-semibold flex items-center gap-1.5">
            <Map className="w-3.5 h-3.5 text-amber-400" />
            【{current.id}】360° 光達點雲與自適應路徑規劃
          </span>
          <span className="inline-flex items-center text-[11px] text-emerald-400 font-mono">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            AI 決策無故障
          </span>
        </div>

        {/* Telemetry HUD metrics */}
        <div className="grid grid-cols-4 gap-2 my-2 relative z-10">
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">目前速率</div>
            <div className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-0.5">{current.speed}</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">固態電池</div>
            <div className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-0.5 flex items-center gap-1">
              <Battery className="w-3.5 h-3.5 text-amber-400" />
              {current.battery}%
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">載客人數</div>
            <div className="text-sm sm:text-base font-bold font-mono text-white mt-0.5">{current.passengers}</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">營運狀態</div>
            <div className="text-[11px] font-bold text-emerald-400 mt-1 truncate">{current.status}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono relative z-10">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-amber-400" />
            冗餘雙迴路剎車系統
          </span>
          <span className="text-amber-400/90">安全遙控駕駛員: STANDBY</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          光達感知融合演算法運行中 (240 FPS)
        </span>
        <span className="font-mono text-amber-400">V2X ACCURACY: 99.9%</span>
      </div>
    </div>
  );
};
