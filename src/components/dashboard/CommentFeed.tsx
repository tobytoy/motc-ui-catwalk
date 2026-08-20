import React, { useState } from 'react';
import { Feedback, ShowcaseItem } from '../../types';
import { MessageSquare, Star, User, Clock, Heart, X, Tag } from 'lucide-react';

interface CommentFeedProps {
  feedbacks: Feedback[];
  showcases: ShowcaseItem[];
  selectedUiId: string | null;
}

export const CommentFeed: React.FC<CommentFeedProps> = ({
  feedbacks,
  showcases,
  selectedUiId,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'detailed' | 'likes'>('all');

  const showcaseMap = new Map<string, ShowcaseItem>();
  showcases.forEach((s) => showcaseMap.set(s.id, s));

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (selectedUiId && fb.ui_id !== selectedUiId) return false;
    if (filterMode === 'detailed') return fb.action_type === 'detailed_review' && Boolean(fb.review);
    if (filterMode === 'likes') return fb.action_type === 'like';
    return true;
  });

  const formatTime = (isoString?: string) => {
    if (!isoString) return '剛剛';
    try {
      const date = new Date(isoString);
      const diffMinutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
      if (diffMinutes < 1) return '剛剛';
      if (diffMinutes < 60) return `${diffMinutes} 分鐘前`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours} 小時前`;
      return date.toLocaleDateString('zh-TW');
    } catch {
      return '剛剛';
    }
  };

  const getActionBadge = (actionType: string) => {
    switch (actionType) {
      case 'like':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Heart className="w-2.5 h-2.5 fill-emerald-400" /> 快速喜歡
          </span>
        );
      case 'pass':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <X className="w-2.5 h-2.5" /> 快速跳過
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <MessageSquare className="w-2.5 h-2.5" /> 深度評分建議
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white text-base">即時走秀評論與回饋動態</h3>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            {filteredFeedbacks.length} 則
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            全部紀錄
          </button>
          <button
            onClick={() => setFilterMode('detailed')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterMode === 'detailed'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            文字評論
          </button>
          <button
            onClick={() => setFilterMode('likes')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterMode === 'likes'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            純喜歡
          </button>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {filteredFeedbacks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            目前暫無符合條件的回饋紀錄
          </div>
        ) : (
          filteredFeedbacks.map((fb, idx) => {
            const ui = showcaseMap.get(fb.ui_id);

            return (
              <div
                key={fb.id || idx}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-all text-xs sm:text-sm"
              >
                {/* Header line */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="font-bold text-white flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      {fb.nickname}
                    </span>
                    {ui && (
                      <span className="text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        評「{ui.title}」
                      </span>
                    )}
                    {getActionBadge(fb.action_type)}
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {/* Stars */}
                    <div className="flex items-center space-x-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s < fb.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {formatTime(fb.created_at)}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                {fb.review && (
                  <p className="text-slate-200 mt-1.5 leading-relaxed font-normal bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                    {fb.review}
                  </p>
                )}

                {/* Tags */}
                {fb.tags && fb.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {fb.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-950/40 text-indigo-300 border border-indigo-500/20 flex items-center gap-1"
                      >
                        <Tag className="w-2 h-2 text-indigo-400" />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
