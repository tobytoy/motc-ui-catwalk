import React from 'react';
import { Sparkles, Trophy, Keyboard, BookOpen, Database, Flame, PlusCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: 'catwalk' | 'dashboard';
  onChangeTab: (tab: 'catwalk' | 'dashboard') => void;
  onOpenHelp: () => void;
  onOpenExplanation: () => void;
  onOpenAddCustom?: () => void;
  totalShowcases: number;
  totalFeedbacks: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onChangeTab,
  onOpenHelp,
  onOpenExplanation,
  onOpenAddCustom,
  totalShowcases,
  totalFeedbacks,
}) => {
  return (
    <header className="w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onChangeTab('catwalk')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-indigo-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-white text-base sm:text-lg tracking-wider">
                MOTC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">CATWALK</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">
              交通科技 UI 走秀評分 · 3層資料架構與受眾分析
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => onChangeTab('catwalk')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'catwalk'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>走秀舞台</span>
            <span className="text-[10px] font-mono px-1 rounded bg-black/20 text-slate-300 ml-1">
              {totalShowcases}
            </span>
          </button>

          <button
            onClick={() => onChangeTab('dashboard')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>統計看板</span>
            <span className="text-[10px] font-mono px-1 rounded bg-black/20 text-slate-300 ml-1">
              {totalFeedbacks}
            </span>
          </button>
        </div>

        {/* Right Status & Tools */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Cloud Badges */}
          <div className="hidden lg:flex items-center space-x-2 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Supabase</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>Firebase</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </span>
          </div>

          {/* 走秀說明按鈕 (Showcase Explanation Button - Replaced from Add Custom) */}
          <button
            onClick={onOpenExplanation}
            title="開啟當前走秀說明 (H) - 3層資料階層與UI分析"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-purple-600/30 hover:from-cyan-600/50 hover:to-indigo-600/50 text-cyan-300 hover:text-white border border-cyan-400/40 text-xs font-bold transition-all shadow-md shadow-cyan-500/10 hover:scale-105"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>走秀說明</span>
            <span className="text-[10px] font-mono px-1 rounded bg-black/30 text-cyan-200 border border-cyan-500/20">
              H
            </span>
          </button>

          {/* Auxiliary Add Custom (Optional) */}
          {onOpenAddCustom && (
            <button
              onClick={onOpenAddCustom}
              title="新增自訂走秀項目"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors hidden sm:block"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          )}

          {/* Keyboard Help */}
          <button
            onClick={onOpenHelp}
            title="快捷鍵指南 (?)"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-800 hover:border-indigo-500/40 transition-colors"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
