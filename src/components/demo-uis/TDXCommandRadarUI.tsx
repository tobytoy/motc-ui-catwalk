import React, { useState, useEffect } from 'react';
import { Radio, Globe } from 'lucide-react';

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
    '【加值交通治理】南投縣友善停車績效指標：年統計模型運算完成 (200 OK)',
    '【道安事故大數據】易肇事路口碰撞風險情報分析：完成全臺 22 縣市矩陣運算',
  ];

  useEffect(() => {
    const packetTimer = setInterval(() => {
      setPacketCount((p) => p + Math.floor(Math.random() * 25 + 10));
    }, 1000);
    const streamTimer = setInterval(() => {
      setLiveStreamIndex((prev) => (prev + 1) % streams.length);
    }, 3500);
    return () => {
      clearInterval(packetTimer);
      clearInterval(streamTimer);
    };
  }, []);

  const nodes = [
    { name: '基礎服務', apis: 213, status: '99.99%', latency: '11ms', color: 'from-cyan-500 to-blue-600', ring: 'border-cyan-400' },
    { name: '加值服務', apis: 201, status: '99.98%', latency: '16ms', color: 'from-indigo-500 to-purple-600', ring: 'border-indigo-400' },
    { name: '票證服務', apis: 155, status: '99.95%', latency: '14ms', color: 'from-emerald-500 to-teal-600', ring: 'border-emerald-400' },
    { name: '歷史服務', apis: 99, status: '100%', latency: '38ms', color: 'from-amber-500 to-orange-600', ring: 'border-amber-400' },
    { name: '機敏與道安', apis: 43, status: '99.99%', latency: '12ms', color: 'from-rose-500 to-pink-600', ring: 'border-rose-400' },
    { name: '觀光與氣象', apis: 27, status: '99.92%', latency: '15ms', color: 'from-sky-500 to-cyan-600', ring: 'border-sky-400' },
  ];

  const currentNode = nodes.find((n) => n.name === selectedNode) || nodes[0];

  return (
    <div className="w-full h-full bg-[#070a12] text-slate-100 p-3 sm:p-5 flex flex-col justify-between select-none overflow-hidden font-sans text-xs">
      {/* Top HUD Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5 shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                戰情雷達與全景脈衝
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-white">TDX 核心資料流通戰情中樞</h3>
            </div>
            <p className="text-[10px] text-slate-400">宏觀全景可視化 · 即時吞吐流量監控、節點延遲雷達與串流廣播 (738 API)</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-right">
          <div className="bg-slate-900/80 px-3 py-1 rounded-xl border border-slate-800">
            <div className="text-[9px] text-slate-400 font-mono">本日累計 API 呼叫</div>
            <div className="text-sm sm:text-base font-black font-mono text-cyan-400">
              {packetCount.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">次</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stream Broadcast Ticker */}
      <div className="my-2 bg-slate-900/90 border border-cyan-500/30 px-3 py-1.5 rounded-xl flex items-center space-x-2.5 overflow-hidden shrink-0">
        <div className="flex items-center space-x-1.5 text-cyan-400 font-mono text-[10px] uppercase font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>MQTT LIVE:</span>
        </div>
        <div className="text-[11px] font-mono text-cyan-200 truncate animate-fade-in">
          {streams[liveStreamIndex]}
        </div>
      </div>

      {/* Radar Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-1 shrink-0">
        {nodes.map((node) => {
          const isSelected = selectedNode === node.name;
          return (
            <button
              key={node.name}
              onClick={() => setSelectedNode(node.name)}
              className={`p-2.5 rounded-2xl border transition-all flex flex-col justify-between text-left ${
                isSelected
                  ? `bg-slate-900 ${node.ring} shadow-lg shadow-cyan-500/10 scale-105`
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="font-bold text-white">{node.name}</span>
                <span className="text-cyan-400 font-mono">{node.apis} 支</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>可用度 {node.status}</span>
                <span className="text-emerald-400 font-bold">{node.latency}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Central Visual Hologram */}
      <div className="flex-1 rounded-2xl bg-gradient-to-b from-slate-950 to-[#04060b] border border-cyan-500/20 p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden my-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-xs text-white">
              節點監控：{currentNode.name} (共 {currentNode.apis} 支 API 端點)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
            SLA: {currentNode.status}
          </span>
        </div>

        {/* Dynamic Wave Pulse Bar */}
        <div className="flex items-end space-x-1.5 h-20 my-2 px-4 justify-between">
          {Array.from({ length: 28 }).map((_, i) => {
            const height = Math.floor(Math.sin((i + packetCount) * 0.4) * 35 + 45);
            return (
              <div
                key={i}
                className="w-1.5 rounded-t bg-gradient-to-t from-cyan-600 via-indigo-500 to-cyan-300 transition-all duration-300"
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
          <span>即時延遲: {currentNode.latency} (邊緣節點就緒)</span>
          <span>738 支 API 實時流向分析</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-2 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between text-[10px] text-slate-500">
        <span>全域戰情已連接交通部最新 738 API 節點</span>
        <span>Command Radar v5.0</span>
      </div>
    </div>
  );
};
