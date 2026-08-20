import React, { useState } from 'react';
import { Plane, Anchor, Waves, CheckCircle2, Clock } from 'lucide-react';
import aeroData from '../../data/tdx/aviation_marine_services.json';

export const AeroMarineUI: React.FC = () => {
  const [tab, setTab] = useState<'AIR' | 'SEA'>('AIR');

  return (
    <div className="w-full h-full p-3 sm:p-5 bg-gradient-to-br from-[#071728] via-[#050f1a] to-[#02060b] text-slate-100 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sky-500/20 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 shadow-lg shadow-sky-500/10">
            {tab === 'AIR' ? <Plane className="w-5 h-5" /> : <Anchor className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                TDX 智慧航空與海運港站動態
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-semibold">
                FIDS & Marine
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <span>民航局 / 航港局 全域實時串聯</span>
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setTab('AIR')}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
              tab === 'AIR'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            航班動態
          </button>
          <button
            onClick={() => setTab('SEA')}
            className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
              tab === 'SEA'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            <Anchor className="w-3.5 h-3.5" />
            海運航線
          </button>
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 my-2 overflow-y-auto space-y-2 pr-0.5 custom-scrollbar">
        {tab === 'AIR' ? (
          aeroData.flights.map((flight, idx) => {
            const isBoarding = flight.statusCode === 'boarding';

            return (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 transition-all flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 py-1 rounded-xl bg-slate-950 border border-white/5 text-center">
                    <span className="text-[10px] font-bold text-slate-400">起飛</span>
                    <div className="text-sm font-black font-mono text-white">
                      {flight.scheduledTime}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">{flight.flightNo}</span>
                      <span className="text-xs text-slate-400 font-medium">
                        ➔ {flight.destination}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5 font-mono">
                      <span>{flight.airport.split(' ')[0]}</span>
                      <span>•</span>
                      <span>{flight.terminal}</span>
                      <span>•</span>
                      <span className="text-sky-300 font-bold">登機門 {flight.gate}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center text-xs font-black px-2.5 py-1 rounded-xl border ${
                      isBoarding
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                        : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {flight.status}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          aeroData.ferries.map((ferry, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 py-1 rounded-xl bg-slate-950 border border-white/5 text-center">
                  <span className="text-[10px] font-bold text-slate-400">開航</span>
                  <div className="text-sm font-black font-mono text-white">{ferry.departure}</div>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{ferry.ferryName}</span>
                    <span className="text-xs text-cyan-300 font-bold">
                      ({ferry.port} ⇄ {ferry.destination})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-300 mt-1">
                    <Waves className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{ferry.seaCondition}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {ferry.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>國際航空與海港氣象資料每 60 秒同步</span>
        </span>
        <span className="text-sky-400 font-medium cursor-pointer hover:underline">
          查看行李轉盤與氣象 ➔
        </span>
      </div>
    </div>
  );
};
