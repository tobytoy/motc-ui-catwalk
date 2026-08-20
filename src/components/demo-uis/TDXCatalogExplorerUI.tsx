import React, { useState } from 'react';
import { Database, Layers, ExternalLink, ShieldCheck, Server } from 'lucide-react';
import catalogData from '../../data/tdx/services_catalog.json';

export const TDXCatalogExplorerUI: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState(catalogData.categories[0].id);

  const activeCategory =
    catalogData.categories.find((c) => c.id === selectedCatId) || catalogData.categories[0];

  return (
    <div className="w-full h-full p-3 sm:p-5 bg-gradient-to-br from-[#0e1626] via-[#090f1a] to-[#04060b] text-slate-100 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-400 shadow-lg shadow-indigo-500/10">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                TDX 交通部運輸資料全服務導覽
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                Open Data Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <span>https://tdx.transportdata.tw/data-service/basic</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            免審核基礎服務 + 多樣服務
          </span>
        </div>
      </div>

      {/* Category Pills Selector */}
      <div className="flex items-center space-x-1.5 overflow-x-auto py-1.5 custom-scrollbar">
        {catalogData.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCatId(cat.id)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCatId === cat.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.name.split(' - ')[0]}
          </button>
        ))}
      </div>

      {/* Active Category Details & Endpoints */}
      <div className="flex-1 my-1 p-3 rounded-2xl bg-slate-900/70 border border-slate-800/80 overflow-y-auto custom-scrollbar flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-black text-sm text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              {activeCategory.name}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {activeCategory.tier} • {activeCategory.quota}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {activeCategory.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeCategory.endpoints.map((ep, i) => (
              <div
                key={i}
                className="p-2 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="text-xs font-bold text-slate-200">{ep.name}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-semibold">
                    {ep.version}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300">
                    {ep.frequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Server className="w-3.5 h-3.5 text-indigo-400" />
          <span>涵蓋 OData 標準、Swagger API 與 MQTT 實時推播</span>
        </span>
        <a
          href="https://tdx.transportdata.tw/data-service/basic"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 font-semibold hover:underline flex items-center gap-1"
        >
          <span>TDX 官方服務平臺</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
