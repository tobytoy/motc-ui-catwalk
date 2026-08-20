import React, { useState } from 'react';
import { Search, Command, ArrowRight, Check, Copy, Zap } from 'lucide-react';
import servicesCatalog from '../../data/tdx/services_catalog.json';

export const TDXCommandPaletteUI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const tags = ['全部', '免審核基礎', '即時串流', '軌道運輸', '公車動態', '低碳微移動', '國道路況'];

  // Flatten all endpoints
  const allEndpoints = servicesCatalog.categories.flatMap((cat) =>
    cat.endpoints.map((ep) => ({
      ...ep,
      categoryName: cat.name,
      categoryId: cat.id,
      quota: cat.quota,
    }))
  );

  const filtered = allEndpoints.filter((ep) => {
    const matchesTag =
      !selectedTag ||
      selectedTag === '全部' ||
      (selectedTag === '免審核基礎' && ep.categoryName.includes('基礎')) ||
      (selectedTag === '即時串流' && ep.format.includes('MQTT')) ||
      (selectedTag === '軌道運輸' && ep.categoryName.includes('軌道')) ||
      (selectedTag === '公車動態' && ep.name.includes('公車')) ||
      (selectedTag === '低碳微移動' && ep.name.includes('Bike')) ||
      (selectedTag === '國道路況' && ep.categoryName.includes('公路'));

    if (!matchesTag) return false;

    if (!query) return true;
    const q = query.toLowerCase();
    return (
      ep.name.toLowerCase().includes(q) ||
      ep.categoryName.toLowerCase().includes(q) ||
      ep.format.toLowerCase().includes(q)
    );
  });

  const [selectedItem, setSelectedItem] = useState(filtered[0] || allEndpoints[0]);

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="w-full h-full bg-[#080c14] text-slate-100 p-4 sm:p-5 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Command className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                UI 典範 5 · 極速指令與搜尋中樞
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-white">TDX Spotlight 快速檢索</h3>
            </div>
            <p className="text-[10px] text-slate-400">效率至上 · 打字即時篩選、鍵盤方向鍵導覽與一鍵呼叫端點</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 font-mono text-[10px] bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-slate-400">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">⌘</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">K</kbd>
          <span className="ml-1">快速喚醒</span>
        </div>
      </div>

      {/* Spotlight Big Search Bar */}
      <div className="my-2.5 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋任何交通 API（例: 公車、誤點、CCTV、YouBike、起降、CMS）..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950/90 border border-purple-500/40 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 text-sm text-white placeholder-slate-500 outline-none shadow-xl transition-all"
        />
        <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Filter Quick Chips */}
      <div className="flex space-x-1.5 overflow-x-auto pb-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTag(t === selectedTag ? null : t)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTag === t || (!selectedTag && t === '全部')
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 2-Pane Results Explorer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-hidden my-1">
        {/* Left Results List */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800/80 p-2 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">查無符合關鍵字的 API 服務</div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedItem?.name === item.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-950/60 border border-purple-500/50 text-white shadow-md'
                      : 'hover:bg-slate-900/60 border border-transparent text-slate-300'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="text-xs font-bold truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">{item.categoryName}</div>
                  </div>
                  <div className="flex items-center space-x-1 shrink-0">
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      {item.frequency}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800/80 p-3.5 flex flex-col justify-between overflow-y-auto">
          {selectedItem ? (
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    {selectedItem.version}
                  </span>
                  <h4 className="font-extrabold text-sm text-white mt-1">{selectedItem.name}</h4>
                  <p className="text-[11px] text-slate-400">{selectedItem.categoryName}</p>
                </div>
              </div>

              <div className="space-y-2.5 my-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-1">API 端點 URL:</div>
                  <div className="flex items-center justify-between bg-black/40 p-1.5 rounded font-mono text-[10px] text-cyan-300">
                    <span className="truncate">https://tdx.transportdata.tw/api/basic/v2/data</span>
                    <button
                      onClick={() => handleCopy('https://tdx.transportdata.tw/api/basic/v2/data')}
                      className="ml-2 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
                    >
                      {copiedPath ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">更新頻率</span>
                    <span className="text-white font-bold">{selectedItem.frequency}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">支援格式</span>
                    <span className="text-purple-300 font-bold">{selectedItem.format}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-purple-200">
                  ⚡ 計費配額：{selectedItem.quota || '計次 1500次/點 · 150MB/點'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-center py-12">請於左側選擇端點</div>
          )}

          <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-2 border-t border-slate-800">
            <span>支援模糊即時比對 (Fuzzy Search)</span>
            <span className="text-purple-400">SPOTLIGHT ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          全平臺 150+ 服務即時索引建置完成
        </span>
        <span className="font-mono text-purple-400 font-bold">
          符合項目: {filtered.length} 項
        </span>
      </div>
    </div>
  );
};
