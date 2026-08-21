import React from 'react';
import {
  Heart,
  X,
  MessageSquare,
  Volume2,
  VolumeX,
  Keyboard,
  BookOpen,
  PlusCircle,
  Play,
  Pause,
} from 'lucide-react';

interface CatwalkControlsProps {
  currentIndex: number;
  totalItems: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onOpenRating: () => void;
  onOpenHelp: () => void;
  onOpenExplanation: () => void;
  onOpenAddCustom?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  autoPlayDuration: number;
  onChangeDuration: (sec: number) => void;
  autoPlayProgress: number; // 0 - 100
  onSelectIndex: (index: number) => void;
}

const SPEED_OPTIONS = [5, 8, 12, 15];

export const CatwalkControls: React.FC<CatwalkControlsProps> = ({
  currentIndex,
  totalItems,
  onSwipeLeft,
  onSwipeRight,
  onOpenRating,
  onOpenHelp,
  onOpenExplanation,
  onOpenAddCustom,
  soundEnabled,
  onToggleSound,
  isAutoPlay,
  onToggleAutoPlay,
  autoPlayDuration,
  onChangeDuration,
  autoPlayProgress,
  onSelectIndex,
}) => {
  const remainingSec = Math.max(
    0,
    Math.ceil(autoPlayDuration * (1 - autoPlayProgress / 100))
  );

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 px-4 flex flex-col items-center select-none">
      {/* Progress Dots Bar with Clickable jumps */}
      <div className="flex items-center space-x-1.5 mb-3 overflow-x-auto max-w-full py-1 custom-scrollbar">
        {Array.from({ length: totalItems }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelectIndex(i)}
            title={`跳至第 ${i + 1} 組走秀 UI`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-8 bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-md shadow-indigo-500/50'
                : 'w-2 bg-slate-800 hover:bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Main Interactive Floating Button Pill */}
      <div className="w-full bg-slate-900/90 border border-white/10 p-2.5 sm:p-3 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2 sm:gap-4">
        {/* Left / Pass Button */}
        <button
          onClick={onSwipeLeft}
          title="略過 (鍵盤左鍵 ←)"
          className="group flex-1 py-2.5 px-3 rounded-xl bg-slate-950/70 hover:bg-rose-500/20 border border-rose-500/30 text-slate-300 hover:text-rose-400 font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-95"
        >
          <X className="w-4 h-4 text-rose-400 group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline">略過 (PASS)</span>
          <span className="text-[10px] font-mono text-slate-500">(←)</span>
        </button>

        {/* Center Rating & Comments Trigger */}
        <button
          onClick={onOpenRating}
          title="評分與留言 (鍵盤上鍵 ↑)"
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600/40 via-purple-600/40 to-cyan-600/40 hover:from-indigo-600/60 hover:to-cyan-600/60 border border-indigo-400/40 text-white font-black text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"
        >
          <MessageSquare className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span>評分與流言</span>
          <span className="text-[10px] font-mono text-indigo-300">(↑)</span>
        </button>

        {/* Right / Like Button */}
        <button
          onClick={onSwipeRight}
          title="喜歡 (鍵盤右鍵 →)"
          className="group flex-1 py-2.5 px-3 rounded-xl bg-slate-950/70 hover:bg-emerald-500/20 border border-emerald-500/30 text-slate-300 hover:text-emerald-400 font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-95"
        >
          <Heart className="w-4 h-4 text-emerald-400 group-hover:scale-125 group-hover:fill-emerald-400 transition-transform" />
          <span className="hidden sm:inline">喜歡 (LIKE)</span>
          <span className="text-[10px] font-mono text-slate-500">(→)</span>
        </button>
      </div>

      {/* Auxiliary Controls: Auto-Play, Sound, Speed, Showcase Explanation, Shortcuts */}
      <div className="w-full flex flex-wrap items-center justify-between text-xs text-slate-400 mt-3 px-1 gap-2">
        {/* Auto-Play Toggle & Countdown */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleAutoPlay}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold transition-all ${
              isAutoPlay
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {isAutoPlay ? (
              <>
                <Pause className="w-3.5 h-3.5 text-cyan-400" />
                <span>自動播放中</span>
                <span className="font-mono text-[11px] text-cyan-200">({remainingSec}s)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-400" />
                <span>啟動自動播放</span>
              </>
            )}
          </button>

          {/* Speed Switcher */}
          {isAutoPlay && (
            <div className="flex items-center space-x-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
              {SPEED_OPTIONS.map((sec) => (
                <button
                  key={sec}
                  onClick={() => onChangeDuration(sec)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    autoPlayDuration === sec
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Tools: Explanation (H), Sound, Add Custom, Shortcuts */}
        <div className="flex items-center space-x-2">
          {/* Showcase Explanation Trigger (H) */}
          <button
            onClick={onOpenExplanation}
            title="走秀說明 (按鍵盤 H)"
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 hover:text-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>走秀說明</span>
            <span className="font-mono text-[10px] bg-black/30 px-1 rounded text-cyan-300">H</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? '關閉音效' : '開啟音效'}
            className={`p-1.5 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-slate-900 border-slate-700 text-indigo-400'
                : 'bg-slate-950 border-slate-800 text-slate-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Add Custom UI Item (Optional) */}
          {onOpenAddCustom && (
            <button
              onClick={onOpenAddCustom}
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>自訂</span>
            </button>
          )}

          {/* Keyboard Help */}
          <button
            onClick={onOpenHelp}
            title="快捷鍵指南 (?)"
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px]">?</span>
          </button>
        </div>
      </div>
    </div>
  );
};
