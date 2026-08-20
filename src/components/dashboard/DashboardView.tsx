import React, { useState } from 'react';
import { Feedback, ShowcaseItem, UIStats, OverallStats } from '../../types';
import { StatsOverview } from './StatsOverview';
import { LeaderboardTable } from './LeaderboardTable';
import { StatsCharts } from './StatsCharts';
import { CommentFeed } from './CommentFeed';
import { ArrowLeft, Download, RefreshCw, Trash2 } from 'lucide-react';

interface DashboardViewProps {
  feedbacks: Feedback[];
  showcases: ShowcaseItem[];
  onBackToCatwalk: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  feedbacks,
  showcases,
  onBackToCatwalk,
  onRefreshData,
  isRefreshing,
}) => {
  const [selectedUiId, setSelectedUiId] = useState<string | null>(null);

  // Filter feedbacks strictly to currently active showcases
  const validFeedbacks = feedbacks.filter((fb) =>
    showcases.some((s) => s.id === fb.ui_id)
  );

  // Compute UI Statistics
  const uiStatsMap = new Map<string, UIStats>();

  showcases.forEach((item) => {
    uiStatsMap.set(item.id, {
      ui_id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      category: item.category,
      accentColor: item.accentColor,
      avgRating: 0,
      totalReviews: 0,
      likeCount: 0,
      passCount: 0,
      detailedCount: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      recentReviews: [],
    });
  });

  let totalScoreSum = 0;
  let totalLikes = 0;
  let totalPasses = 0;
  let totalDetailed = 0;

  validFeedbacks.forEach((fb) => {
    const stat = uiStatsMap.get(fb.ui_id);
    if (!stat) return;

    stat.totalReviews += 1;
    totalScoreSum += fb.rating;
    if (fb.rating >= 1 && fb.rating <= 5) {
      stat.ratingDistribution[fb.rating] += 1;
    }

    if (fb.action_type === 'like') {
      stat.likeCount += 1;
      totalLikes += 1;
    } else if (fb.action_type === 'pass') {
      stat.passCount += 1;
      totalPasses += 1;
    } else {
      stat.detailedCount += 1;
      totalDetailed += 1;
    }

    stat.recentReviews.push(fb);
  });

  // Calculate averages
  uiStatsMap.forEach((stat) => {
    if (stat.totalReviews > 0) {
      let sum = 0;
      Object.entries(stat.ratingDistribution).forEach(([star, count]) => {
        sum += parseInt(star, 10) * count;
      });
      stat.avgRating = parseFloat((sum / stat.totalReviews).toFixed(2));
    }
  });

  const leaderboard = Array.from(uiStatsMap.values()).sort((a, b) => {
    if (b.avgRating !== a.avgRating) return b.avgRating - a.avgRating;
    return b.totalReviews - a.totalReviews;
  });

  const overallStats: OverallStats = {
    totalFeedbacks: validFeedbacks.length,
    totalLikes,
    totalPasses,
    totalDetailed,
    avgOverallRating: validFeedbacks.length > 0 ? parseFloat((totalScoreSum / validFeedbacks.length).toFixed(2)) : 5.0,
    topRatedUI: leaderboard.length > 0 ? leaderboard[0] : undefined,
  };

  const selectedUi = selectedUiId ? uiStatsMap.get(selectedUiId) || null : null;

  // Clear Local Cache
  const handleClearLocalCache = () => {
    if (window.confirm('確定要清空本機暫存的評分與流言紀錄嗎？')) {
      localStorage.clear();
      onRefreshData();
      window.location.reload();
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Feedback ID', 'UI ID', 'Nickname', 'Rating', 'Review', 'Action Type', 'Tags', 'Created At'];
    const rows = validFeedbacks.map((fb) => [
      fb.id || '',
      fb.ui_id,
      `"${(fb.nickname || '').replace(/"/g, '""')}"`,
      fb.rating,
      `"${(fb.review || '').replace(/"/g, '""')}"`,
      fb.action_type,
      `"${(fb.tags || []).join(';')}"`,
      fb.created_at || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `motc_catwalk_feedback_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Action Nav Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToCatwalk}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回走秀舞台</span>
          </button>

          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
              <span>📊 TDX UI 走秀即時統計與評分總榜</span>
            </h2>
            <p className="text-xs text-slate-400">8 款 TDX 資料呈現典範即時評分、好感度與評審回饋</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRefreshData}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            <span>{isRefreshing ? '更新中...' : '重新整理'}</span>
          </button>

          <button
            onClick={handleClearLocalCache}
            title="清空本機快取"
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-semibold transition-all shadow-md hover:shadow-indigo-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>匯出 CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Overview */}
      <StatsOverview stats={overallStats} />

      {/* Leaderboard Table */}
      <LeaderboardTable
        leaderboard={leaderboard}
        selectedUiId={selectedUiId}
        onSelectUi={setSelectedUiId}
      />

      {/* Charts (Distribution & Category) */}
      <StatsCharts leaderboard={leaderboard} selectedUi={selectedUi} />

      {/* Live Comment Stream Feed */}
      <CommentFeed
        feedbacks={validFeedbacks}
        showcases={showcases}
        selectedUiId={selectedUiId}
      />
    </div>
  );
};
