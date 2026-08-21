import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ShowcaseItem, Feedback } from '../../types';
import { DynamicUIRenderer } from '../demo-uis';
import { Heart, X, Tag, Sparkles, MessageSquare, BookOpen } from 'lucide-react';
import { submitFeedback } from '../../lib/supabase';
import { logCatwalkEvent } from '../../lib/firebase';
import { playLikeSound } from '../../lib/sound';
import confetti from 'canvas-confetti';

interface CatwalkCardProps {
  item: ShowcaseItem;
  isTop: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
  onOpenRating: () => void;
  onOpenExplanation?: () => void;
  isAutoPlay?: boolean;
  autoPlayProgress?: number; // 0 - 100
  feedbacks?: Feedback[];
  onQuickFeedbackSubmitted?: (fb: Feedback) => void;
}

const QUICK_TAGS = ['✨ 視覺驚艷', '⚡ 資訊即時', '📐 排版清晰', '🌟 推薦採用'];

export const CatwalkCard: React.FC<CatwalkCardProps> = ({
  item,
  isTop,
  onSwipe,
  onOpenRating,
  onOpenExplanation,
  isAutoPlay = false,
  autoPlayProgress = 0,
  feedbacks = [],
  onQuickFeedbackSubmitted,
}) => {
  const [quickSentTag, setQuickSentTag] = useState<string | null>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-14, 0, 14]);
  const opacity = useTransform(x, [-250, -180, 0, 180, 250], [0.6, 1, 1, 1, 0.6]);

  // Like opacity badge
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const likeScale = useTransform(x, [40, 140], [0.8, 1.1]);

  // Pass opacity badge
  const passOpacity = useTransform(x, [-40, -140], [0, 1]);
  const passScale = useTransform(x, [-40, -140], [0.8, 1.1]);
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;

    if (info.offset.x > threshold || velocity > 380) {
      onSwipe('right');
    } else if (info.offset.x < -threshold || velocity < -380) {
      onSwipe('left');
    }
  };

  // Find recent reviews for this specific UI
  const itemReviews = feedbacks.filter(
    (fb) => fb.ui_id === item.id && fb.review && fb.review.trim() !== ''
  );
  const latestReview = itemReviews[0];

  const handleQuickTagClick = async (tag: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (quickSentTag) return;
    setQuickSentTag(tag);
    playLikeSound();

    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#06b6d4', '#10b981'],
      });
    } catch {}

    const nickname = localStorage.getItem('motc_catwalk_nickname') || '走秀觀眾 (即時流言)';
    const res = await submitFeedback({
      ui_id: item.id,
      nickname,
      rating: 5,
      review: `即時點評：${tag}`,
      action_type: 'like',
      tags: [tag],
    });

    logCatwalkEvent('quick_tag_feedback', { ui_id: item.id, tag });
    if (res.data && onQuickFeedbackSubmitted) {
      onQuickFeedbackSubmitted(res.data);
    }

    setTimeout(() => setQuickSentTag(null), 2000);
  };

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 0.85,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      className={`absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl flex flex-col justify-between select-none ${
        isTop ? 'cursor-grab active:cursor-grabbing z-20' : 'pointer-events-none z-10'
      }`}
    >
      {/* Auto-Play Top Progress Bar */}
      {isTop && isAutoPlay && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/80 z-50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 transition-all duration-100 ease-linear shadow-sm shadow-cyan-400/50"
            style={{ width: `${Math.min(100, Math.max(0, autoPlayProgress))}%` }}
          />
        </div>
      )}

      {/* Dynamic Background Glow from accent color */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: item.accentColor }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: item.accentColor }}
      />

      {/* LIKE OVERLAY BADGE (Swipe Right) */}
      {isTop && (
        <motion.div
          style={{ opacity: likeOpacity, scale: likeScale }}
          className="absolute top-8 right-8 z-50 pointer-events-none border-4 border-emerald-400 bg-emerald-950/85 px-5 py-2 rounded-2xl rotate-12 shadow-2xl shadow-emerald-500/50 backdrop-blur-md"
        >
          <div className="flex items-center space-x-2 text-emerald-400 font-black text-2xl sm:text-3xl tracking-widest uppercase">
            <Heart className="w-7 h-7 fill-emerald-400" />
            <span>LIKE !</span>
          </div>
        </motion.div>
      )}

      {/* PASS OVERLAY BADGE (Swipe Left) */}
      {isTop && (
        <motion.div
          style={{ opacity: passOpacity, scale: passScale }}
          className="absolute top-8 left-8 z-50 pointer-events-none border-4 border-rose-500 bg-rose-950/85 px-5 py-2 rounded-2xl -rotate-12 shadow-2xl shadow-rose-500/50 backdrop-blur-md"
        >
          <div className="flex items-center space-x-2 text-rose-400 font-black text-2xl sm:text-3xl tracking-widest uppercase">
            <X className="w-7 h-7" />
            <span>PASS</span>
          </div>
        </motion.div>
      )}

      {/* Card Header Bar */}
      <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/50 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div
            className="w-3.5 h-3.5 rounded-full ring-4 ring-white/10 shrink-0"
            style={{ backgroundColor: item.accentColor }}
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                {item.category}
              </span>
              <h2 className="font-extrabold text-sm sm:text-base text-white tracking-wide truncate max-w-[200px] sm:max-w-[280px]">
                {item.title}
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[240px] sm:max-w-md">
              {item.subtitle}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5">
          {item.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 flex items-center gap-1"
            >
              <Tag className="w-2.5 h-2.5 text-slate-400" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Embedded Live UI Stage Container */}
      <div className="flex-1 w-full relative overflow-hidden bg-slate-950/80 min-h-[350px] sm:min-h-[400px]">
        <DynamicUIRenderer item={item} />
      </div>

      {/* Quick 1-Tap Feedback & Live Comment Banner */}
      <div className="px-3.5 py-2 bg-slate-950/70 border-t border-white/5 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-xs">
        {/* Live Comment Stream */}
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-hidden">
          <span className="flex items-center gap-1 text-[11px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full shrink-0">
            <MessageSquare className="w-3 h-3 text-cyan-400" />
            <span>流言動態</span>
          </span>
          <p className="text-[11px] text-slate-300 truncate max-w-[260px] sm:max-w-[220px]">
            {latestReview ? (
              <span>
                <strong className="text-white font-medium">{latestReview.nickname}:</strong>{' '}
                {latestReview.review}
              </span>
            ) : (
              <span className="text-slate-400 italic">尚無留言，歡迎滑動或下方留下想法！</span>
            )}
          </p>
        </div>

        {/* Quick Tag Reaction Buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto justify-end">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={(e) => handleQuickTagClick(tag, e)}
              className={`text-[10px] px-2 py-0.5 rounded-full border transition-all whitespace-nowrap ${
                quickSentTag === tag
                  ? 'bg-emerald-500 text-slate-950 font-black border-emerald-400 scale-105'
                  : 'bg-slate-900/90 text-slate-300 border-white/10 hover:border-indigo-400/50 hover:text-white'
              }`}
            >
              {quickSentTag === tag ? '✓ 已送出' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="p-3 sm:p-3.5 border-t border-white/10 bg-slate-950/90 backdrop-blur-md flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            <span className="text-slate-500">單位: </span>
            <span className="text-slate-300 font-medium">{item.author || 'TDX 交通科技走秀'}</span>
          </div>
          {item.metrics && item.metrics.length > 0 && (
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {item.metrics[0].label}: {item.metrics[0].value}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {onOpenExplanation && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenExplanation();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-indigo-300 hover:text-white border border-slate-700/80 text-xs font-bold transition-all hover:scale-105"
              title="查看走秀說明 (H)"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>走秀說明 (H)</span>
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenRating();
            }}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>深度評分 (↑)</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
