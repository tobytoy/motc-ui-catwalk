import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin, Users, Bell, Sparkles } from 'lucide-react';

export const BusLiveTrackerUI: React.FC = () => {
  const [eta, setEta] = useState(132); // seconds
  const crowdLevel = '舒適';
  const [remindSet, setRemindSet] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatEta = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}分 ${s < 10 ? '0' : ''}${s}秒`;
  };

  const stops = [
    { name: '台北車站 (忠孝)', passed: true, eta: '已過站' },
    { name: '行政院', passed: true, eta: '已過站' },
    { name: '善導寺站 (當前站點)', passed: false, current: true, eta: formatEta(eta) },
    { name: '華山文創園區', passed: false, eta: '約 5 分鐘' },
    { name: '忠孝新生站', passed: false, eta: '約 8 分鐘' },
  ];

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-gradient-to-br from-[#0a1813] to-[#060e0b] text-slate-100 flex flex-col justify-between select-none">
      {/* Top Route Header */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black font-mono text-lg shadow-lg shadow-emerald-500/10">
            307
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-base">板橋 ⇄ 撫遠街</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">幹線公車</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Bus className="w-3 h-3 text-emerald-400" /> 車號: KKA-8901 (低底盤電動巴士)
            </p>
          </div>
        </div>

        <button
          onClick={() => setRemindSet(!remindSet)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            remindSet
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
              : 'bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{remindSet ? '已設到站推播' : '到站提醒'}</span>
        </button>
      </div>

      {/* Main Countdown Hero */}
      <div className="my-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-950/60 border border-emerald-500/30 flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-xs text-emerald-300/80 mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>下一班車預計抵達【善導寺站】</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight flex items-baseline gap-2">
            <span>{formatEta(eta)}</span>
            <span className="text-xs font-normal text-slate-400"> (即時 GPS 校正)</span>
          </div>
        </div>

        {/* Live Crowd Badge */}
        <div className="text-right relative z-10">
          <div className="text-xs text-slate-400 flex items-center justify-end gap-1 mb-1">
            <Users className="w-3 h-3 text-slate-400" /> 車廂擁擠度
          </div>
          <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
            <Sparkles className="w-3 h-3 mr-1 text-emerald-400" /> {crowdLevel} (空位 14)
          </div>
        </div>
      </div>

      {/* Real-time Stop Progress Line */}
      <div className="flex-1 min-h-[140px] bg-slate-950/40 rounded-xl border border-slate-800/80 p-3.5 flex flex-col justify-center">
        <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" /> 路線即時動態追蹤
        </div>

        <div className="relative flex items-center justify-between px-2">
          {/* Progress track line */}
          <div className="absolute left-6 right-6 top-3 h-1 bg-slate-800 -z-0" />
          <div className="absolute left-6 w-[45%] top-3 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 -z-0" />

          {stops.map((stop, idx) => (
            <div key={idx} className="flex flex-col items-center relative z-10 group cursor-pointer">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                  stop.current
                    ? 'bg-emerald-500 border-white text-slate-950 scale-125 shadow-lg shadow-emerald-500/50 ring-4 ring-emerald-500/20'
                    : stop.passed
                    ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
              >
                {stop.current ? <Bus className="w-3 h-3" /> : <span className="text-[10px] font-mono">{idx + 1}</span>}
              </div>
              <span className={`text-[11px] mt-2 font-medium max-w-[70px] text-center truncate ${
                stop.current ? 'text-emerald-300 font-bold' : stop.passed ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {stop.name.replace(/ \(.*\)/, '')}
              </span>
              <span className="text-[9px] font-mono text-emerald-400/90 mt-0.5">{stop.eta}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          低底盤輪椅區：預約無障礙服務 (1/2 可用)
        </span>
        <span className="font-mono text-emerald-400/90">TDX DATA SYNCED</span>
      </div>
    </div>
  );
};
