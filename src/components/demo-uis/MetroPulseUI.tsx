import React, { useState } from 'react';
import { Train, ArrowRightLeft, ShieldCheck } from 'lucide-react';

export const MetroPulseUI: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<'BL' | 'R' | 'G'>('BL');

  const lines = [
    { code: 'BL', name: '板南線', color: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500', term: '往 頂埔 / 南港展覽館', headway: '2分15秒' },
    { code: 'R', name: '淡水信義線', color: 'bg-red-600', text: 'text-red-400', border: 'border-red-500', term: '往 象山 / 淡水', headway: '3分00秒' },
    { code: 'G', name: '松山新店線', color: 'bg-green-600', text: 'text-green-400', border: 'border-green-500', term: '往 新店 / 松山', headway: '3分30秒' },
  ];

  const current = lines.find((l) => l.code === selectedLine) || lines[0];

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-gradient-to-br from-[#0c0e1e] to-[#060710] text-slate-100 flex flex-col justify-between select-none">
      {/* Header with Metro lines tabs */}
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
            <Train className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm sm:text-base">全路網軌道車輛即時動態儀表</h3>
            <p className="text-xs text-slate-400 font-mono">STATION: 台北車站 (R10 / BL12)</p>
          </div>
        </div>

        {/* Line Switchers */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {lines.map((l) => (
            <button
              key={l.code}
              onClick={() => setSelectedLine(l.code as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedLine === l.code
                  ? `${l.color} text-white shadow-md`
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {l.code} {l.name.slice(0, 2)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
        {/* Next Train Left */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${current.color}`} />
              月台 1 (上行)
            </span>
            <span className="font-mono text-emerald-400">準點 ON TIME</span>
          </div>
          <div className="text-lg font-bold text-white">{current.term.split(' / ')[0]}</div>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-2xl font-black font-mono text-indigo-300">01:45</span>
            <span className="text-xs text-slate-400">進站中 (列車編號: 124)</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full w-[78%] animate-pulse" />
          </div>
        </div>

        {/* Next Train Right */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${current.color}`} />
              月台 2 (下行)
            </span>
            <span className="font-mono text-emerald-400">準點 ON TIME</span>
          </div>
          <div className="text-lg font-bold text-white">{current.term.split(' / ')[1] || '終點站'}</div>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-2xl font-black font-mono text-indigo-300">03:10</span>
            <span className="text-xs text-slate-400">接近忠孝新生</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-500 h-full w-[45%]" />
          </div>
        </div>
      </div>

      {/* Interchange Navigator & Crowding */}
      <div className="flex-1 min-h-[120px] bg-slate-950/60 rounded-xl border border-slate-800/80 p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-400" />
            地下站體智慧轉乘動線指引
          </span>
          <span className="font-mono text-indigo-400">平均換乘: 2.8 分鐘</span>
        </div>

        {/* Car Load Breakdown */}
        <div className="my-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span>車廂 1 ~ 6 擁擠度熱圖 (AI 負重感測)</span>
            <span className="text-emerald-400 font-mono">第 2、5 車廂最寬敞</span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {[
              { car: 1, load: '75%', color: 'bg-amber-500/30 text-amber-300 border-amber-500/40' },
              { car: 2, load: '32%', color: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40' },
              { car: 3, load: '88%', color: 'bg-rose-500/30 text-rose-300 border-rose-500/40' },
              { car: 4, load: '82%', color: 'bg-rose-500/30 text-rose-300 border-rose-500/40' },
              { car: 5, load: '38%', color: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40' },
              { car: 6, load: '60%', color: 'bg-cyan-500/30 text-cyan-300 border-cyan-500/40' },
            ].map((c) => (
              <div key={c.car} className={`p-1.5 rounded-lg border text-center ${c.color}`}>
                <div className="text-[10px] font-mono">CAR {c.car}</div>
                <div className="text-xs font-bold font-mono">{c.load}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            月台安全門全數連動正常
          </span>
          <span className="font-mono text-slate-400">尖峰發車間距: {current.headway}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          全路網 117 車站即時聯網
        </span>
        <span className="font-mono text-indigo-400">SYSTEM RELIABILITY: 99.99%</span>
      </div>
    </div>
  );
};
