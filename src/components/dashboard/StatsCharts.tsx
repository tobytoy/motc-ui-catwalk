import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { UIStats } from '../../types';
import { BarChart3, PieChart } from 'lucide-react';

interface StatsChartsProps {
  leaderboard: UIStats[];
  selectedUi: UIStats | null;
}

export const StatsCharts: React.FC<StatsChartsProps> = ({
  leaderboard,
  selectedUi,
}) => {
  // Aggregate 1-5 star distributions
  const distributionMap: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const targetList = selectedUi ? [selectedUi] : leaderboard;
  targetList.forEach((item) => {
    Object.entries(item.ratingDistribution).forEach(([star, count]) => {
      const s = parseInt(star, 10);
      if (distributionMap[s] !== undefined) {
        distributionMap[s] += count;
      }
    });
  });

  const ratingChartData = [
    { name: '1 星 (待加強)', count: distributionMap[1], color: '#f43f5e' },
    { name: '2 星 (普通)', count: distributionMap[2], color: '#fb7185' },
    { name: '3 星 (尚可)', count: distributionMap[3], color: '#f59e0b' },
    { name: '4 星 (良好)', count: distributionMap[4], color: '#38bdf8' },
    { name: '5 星 (極佳)', count: distributionMap[5], color: '#10b981' },
  ];

  // Category average scores
  const categoryMap: Record<string, { totalScore: number; count: number }> = {};
  leaderboard.forEach((item) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = { totalScore: 0, count: 0 };
    }
    categoryMap[item.category].totalScore += item.avgRating * item.totalReviews;
    categoryMap[item.category].count += item.totalReviews;
  });

  const categoryChartData = Object.entries(categoryMap).map(([category, data]) => ({
    category,
    avg: data.count > 0 ? parseFloat((data.totalScore / data.count).toFixed(2)) : 0,
    votes: data.count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-6">
      {/* Chart 1: Score Distribution Bar Chart */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <h4 className="font-bold text-white text-sm">
              {selectedUi ? `【${selectedUi.title}】評分分佈` : '全站星等評分分佈'}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400">分佈直方圖</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {ratingChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Category Average Ratings */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <PieChart className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-white text-sm">領域類別平均滿意度</h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400">5.0 滿分制</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryChartData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
            >
              <XAxis type="number" domain={[0, 5]} stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="category" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value: any) => [`${value} ★`, '類別平均分']}
              />
              <Bar dataKey="avg" fill="#6366f1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
