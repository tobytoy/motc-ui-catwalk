import React from 'react';
import { UIStats } from '../../types';
import { Trophy, Star } from 'lucide-react';

interface LeaderboardTableProps {
  leaderboard: UIStats[];
  selectedUiId: string | null;
  onSelectUi: (uiId: string | null) => void;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboard,
  selectedUiId,
  onSelectUi,
}) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold font-mono text-xs shadow-md shadow-amber-500/20">
            🥇
          </span>
        );
      case 2:
        return (
          <span className="w-6 h-6 rounded-full bg-slate-300/20 text-slate-300 border border-slate-300/40 flex items-center justify-center font-bold font-mono text-xs">
            🥈
          </span>
        );
      case 3:
        return (
          <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 border border-amber-700/40 flex items-center justify-center font-bold font-mono text-xs">
            🥉
          </span>
        );
      default:
        return (
          <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-xs">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-base">走秀伸展台人氣排行榜</h3>
        </div>
        {selectedUiId && (
          <button
            onClick={() => onSelectUi(null)}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
          >
            清除篩選 (查看全部)
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
              <th className="pb-3 px-2">排名</th>
              <th className="pb-3 px-3">展示名稱 / 類別</th>
              <th className="pb-3 px-3 text-center">平均評分</th>
              <th className="pb-3 px-3 text-center">總票數</th>
              <th className="pb-3 px-3 text-center">好感分佈</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leaderboard.map((item, idx) => {
              const isSelected = selectedUiId === item.ui_id;
              const likePct = item.totalReviews > 0
                ? Math.round((item.likeCount / item.totalReviews) * 100)
                : 0;

              return (
                <tr
                  key={item.ui_id}
                  onClick={() => onSelectUi(isSelected ? null : item.ui_id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-950/50 text-white'
                      : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  {/* Rank */}
                  <td className="py-3.5 px-2 font-mono">{getRankBadge(idx + 1)}</td>

                  {/* Title & category */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <span className="font-semibold text-white truncate max-w-[160px] sm:max-w-xs">
                        {item.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 shrink-0">
                        {item.category}
                      </span>
                    </div>
                  </td>

                  {/* Avg Rating */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="inline-flex items-center space-x-1 font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.avgRating.toFixed(1)}</span>
                    </div>
                  </td>

                  {/* Total Reviews */}
                  <td className="py-3.5 px-3 text-center font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.totalReviews}
                    </span>
                  </td>

                  {/* Like / Pass Bar */}
                  <td className="py-3.5 px-3">
                    <div className="w-24 sm:w-32 mx-auto">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span className="text-emerald-400">👍 {item.likeCount}</span>
                        <span className="text-rose-400">👎 {item.passCount}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                        <div
                          className="bg-emerald-500 h-full"
                          style={{ width: `${likePct}%` }}
                        />
                        <div
                          className="bg-rose-500 h-full"
                          style={{ width: `${100 - likePct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
