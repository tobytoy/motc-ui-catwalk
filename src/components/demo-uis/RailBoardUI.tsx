import React, { useState, useEffect } from 'react';
import { Train, Clock, MapPin, AlertCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import railData from '../../data/tdx/rail_services.json';

export const RailBoardUI: React.FC = () => {
  const [filterType, setFilterType] = useState<'ALL' | 'THSR' | 'TRA'>('ALL');
  const selectedStation = '台北車站';
  const [tickerSec, setTickerSec] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerSec((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const trains = railData.trains.filter((t) => {
    if (filterType === 'THSR') return t.type.includes('THSR');
    if (filterType === 'TRA') return t.type.includes('TRA');
    return true;
  });

  return (
    <div className="w-full h-full p-3 sm:p-5 bg-gradient-to-br from-[#0b1329] via-[#080d1c] to-[#04060e] text-slate-100 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Station & Header */}
      <div className="flex items-center justify-between border-b border-blue-500/20 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-400 shadow-lg shadow-blue-500/10">
            <Train className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                TDX 雙鐵智慧聯合發車看板
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                TRA & THSR
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span>{selectedStation}</span>
              <span className="text-slate-600">|</span>
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{tickerSec}s 後自動刷新</span>
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filterType === 'ALL'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            全部雙鐵
          </button>
          <button
            onClick={() => setFilterType('THSR')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filterType === 'THSR'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            高鐵 THSR
          </button>
          <button
            onClick={() => setFilterType('TRA')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filterType === 'TRA'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            臺鐵 TRA
          </button>
        </div>
      </div>

      {/* Train Schedule Board */}
      <div className="flex-1 my-2 overflow-y-auto space-y-2 pr-0.5 custom-scrollbar">
        {trains.map((train, idx) => {
          const isThsr = train.type.includes('THSR');
          const isDelayed = train.statusCode === 'delayed';

          return (
            <div
              key={idx}
              className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-blue-500/40 transition-all flex items-center justify-between group"
            >
              {/* Left Column: Train Info & Departure */}
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-center justify-center w-12 py-1 rounded-xl bg-slate-950 border border-white/5">
                  <span className="text-[10px] font-bold text-slate-400">發車</span>
                  <span className="text-sm font-black font-mono text-white tracking-tight">
                    {train.departureTime}
                  </span>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isThsr
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {isThsr ? '高鐵' : '臺鐵'}
                    </span>
                    <span className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                      {train.trainNo}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className="text-sm font-extrabold text-white">
                      往 {train.destination}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1 font-mono">
                    <span className="text-slate-300 font-semibold">{train.platform}</span>
                    <span className="text-slate-600">•</span>
                    <span>{train.freeSeatCars}</span>
                    <span className="text-slate-600">•</span>
                    <span>乘載 {train.occupiedRate}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Status & Platform Badge */}
              <div className="flex flex-col items-end space-y-1">
                <span
                  className={`inline-flex items-center text-xs font-black px-2.5 py-1 rounded-xl border ${
                    isDelayed
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {isDelayed ? (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  )}
                  {train.status}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">即時 TDX 遙測</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Station Services Banner */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            北車自由座候車人流：<strong className="text-white">中等舒適</strong>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-blue-400 font-medium cursor-pointer hover:underline">
            快速訂位轉乘 ➔
          </span>
        </div>
      </div>
    </div>
  );
};
