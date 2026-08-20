import React, { useState, useEffect } from 'react';
import { Activity, Radio, Zap, Globe } from 'lucide-react';

export const TDXCommandRadarUI: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState('基礎服務');
  const [packetCount, setPacketCount] = useState(248920150);
  const [liveStreamIndex, setLiveStreamIndex] = useState(0);

  const streams = [
    '【MQTT 即時串流】TRA 臺鐵局 128 次自強號：通過七堵站，準點 0 分',
    '【VD 偵測器廣播】國道一號北上 25K：車速 78 km/h，全線順暢',
    '【CityBus GPS 封包】臺北市 307 路幹線：車號 KKA-8901 即時座標 (121.524, 25.042)',
    '【YouBike 2.0 狀態】捷運台北車站 3 號出口：可借 24 輛，可還 6 輛',
    '【Air FIDS 航班異動】桃機 CI-008 飛往洛杉磯：預計 23:50 於 D4 登機門起飛',
  ];

  useEffect(() => {
    const packetTimer = setInterval(() => {
      setPacketCount((p) => p + Math.floor(Math.random() * 25 + 10));
    }, 1000);
    const streamTimer = setInterval(() => {
      setLiveStreamIndex((prev) => (prev + 1) % streams.length);
    }, 4000);
    return () => {
      clearInterval(packetTimer);
      clearInterval(streamTimer);
    };
  }, []);

  const nodes = [
    { name: '基礎服務', apis: 24, status: '99.99%', latency: '11ms', color: 'from-cyan-500 to-blue-600', ring: 'border-cyan-400' },
    { name: '進階服務', apis: 42, status: '99.98%', latency: '14ms', color: 'from-indigo-500 to-purple-600', ring: 'border-indigo-400' },
    { name: '加值服務', apis: 18, status: '99.95%', latency: '18ms', color: 'from-emerald-500 to-teal-600', ring: 'border-emerald-400' },
    { name: '歷史服務', apis: 12, status: '100%', latency: '42ms', color: 'from-amber-500 to-orange-600', ring: 'border-amber-400' },
    { name: '觀光與氣象', apis: 23, status: '99.92%', latency: '15ms', color: 'from-rose-500 to-pink-600', ring: 'border-rose-400' },
    { name: 'MaaS整合', apis: 9, status: '99.96%', latency: '12ms', color: 'from-sky-500 to-cyan-600', ring: 'border-sky-400' },
  ];

  const currentNode = nodes.find((n) => n.name === selectedNode) || nodes[0];

  return (
    <div className="w-full h-full bg-[#070a12] text-slate-100 p-4 sm:p-5 flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Top HUD Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                UI 典範 4 · 戰情雷達與全景脈衝
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-white">TDX 核心資料流通戰情中樞</h3>
            </div>
            <p className="text-[10px] text-slate-400">宏觀全景可視化 · 即時吞吐流量監控、節點延遲雷達與串流廣播</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-right">
          <div className="bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="text-[9px] text-slate-400 font-mono">本日累計 API 呼叫</div>
            <div className="text-sm sm:text-base font-black font-mono text-cyan-400">
              {packetCount.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">次</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stream Broadcast Ticker */}
      <div className="my-2.5 px-3 py-2 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-center space-x-2 text-xs">
        <Activity className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
        <span className="text-cyan-200 font-medium truncate font-mono">{streams[liveStreamIndex]}</span>
      </div>

      {/* Center Radar Orbit Node Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-2">
        {nodes.map((n) => (
          <button
            key={n.name}
            onClick={() => setSelectedNode(n.name)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedNode === n.name
                ? `bg-slate-900 ${n.ring} ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20 scale-105`
                : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            <div className="text-xs font-bold text-white truncate">{n.name}</div>
            <div className="flex items-center justify-between mt-1 text-[10px] font-mono">
              <span className="text-cyan-400">{n.apis} 支 API</span>
              <span className="text-emerald-400">{n.latency}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Oscilloscope & Cluster Stats */}
      <div className="flex-1 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-bold flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-cyan-400" />
            【{currentNode.name}】全臺節點即時頻寬與併發請求分佈
          </span>
          <span className="font-mono text-emerald-400 text-[11px]">SLA 服務水準: {currentNode.status}</span>
        </div>

        {/* Dynamic Telemetry Wave */}
        <div className="h-24 flex items-end space-x-1 px-1 my-2">
          {[60, 85, 40, 95, 70, 50, 90, 80, 65, 75, 88, 92, 58, 48, 78, 84, 96, 68, 82, 74].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-cyan-600/30 via-cyan-400 to-indigo-500 rounded-t transition-all duration-500 hover:brightness-125"
              style={{
                height: `${((h + (i % 4) * 6) % 100) * 0.75 + 20}%`,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
          <div>
            <span>節點平均延遲: </span>
            <strong className="text-cyan-300">{currentNode.latency}</strong>
          </div>
          <div>
            <span>MQTT Broker 負載: </span>
            <strong className="text-emerald-400">正常 (14%)</strong>
          </div>
          <div>
            <span>容錯備援節點: </span>
            <strong className="text-indigo-300">雙中心熱備</strong>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5 font-mono">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          全臺 22 縣市 + 雙鐵 + 機場 + 國道 全時資料串流中
        </span>
        <span className="text-cyan-400 font-mono">PEAK THROUGHPUT: 18,400 QPS</span>
      </div>
    </div>
  );
};
