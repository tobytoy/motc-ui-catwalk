import React from 'react';
import { OverallStats } from '../../types';
import { Trophy, ThumbsUp, MessageSquare, Star, Sparkles, TrendingUp } from 'lucide-react';

interface StatsOverviewProps {
  stats: OverallStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const likeRatio = stats.totalFeedbacks > 0
    ? Math.round((stats.totalLikes / stats.totalFeedbacks) * 100)
    : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* Total Votes */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-medium">累計走秀評分</span>
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
          {stats.totalFeedbacks} <span className="text-xs font-normal text-slate-400">票</span>
        </div>
        <div className="text-[11px] text-indigo-300/80 mt-1 flex items-center gap-1 font-mono">
          <TrendingUp className="w-3 h-3" /> 即時同步 Supabase
        </div>
      </div>

      {/* Avg Score */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-medium">走秀整體均分</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400/20" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tracking-tight flex items-baseline gap-1">
          {stats.avgOverallRating.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
        </div>
        <div className="text-[11px] text-amber-300/80 mt-1 flex items-center gap-1">
          <span>滿意度分佈良好</span>
        </div>
      </div>

      {/* Like Ratio */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-medium">正面好感率 (Like)</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <ThumbsUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
          {likeRatio}%
        </div>
        <div className="text-[11px] text-emerald-300/80 mt-1 font-mono">
          👍 {stats.totalLikes} 喜歡 · 👎 {stats.totalPasses} 跳過
        </div>
      </div>

      {/* Top Rated Champion */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/30 backdrop-blur-xl relative overflow-hidden group hover:border-indigo-400/60 transition-all">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-medium text-indigo-300">👑 走秀人氣冠軍</span>
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        <div className="text-sm sm:text-base font-bold text-white truncate">
          {stats.topRatedUI ? stats.topRatedUI.title : '統計計算中'}
        </div>
        <div className="text-[11px] text-indigo-200 mt-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          均分 {stats.topRatedUI ? stats.topRatedUI.avgRating.toFixed(1) : 5.0} ★ · ({stats.topRatedUI?.totalReviews || 0} 評)
        </div>
      </div>
    </div>
  );
};
