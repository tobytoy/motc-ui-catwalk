import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShowcaseItem, Feedback } from '../../types';
import { submitFeedback } from '../../lib/supabase';
import { logCatwalkEvent } from '../../lib/firebase';
import { playSuccessSound } from '../../lib/sound';
import confetti from 'canvas-confetti';
import {
  Star,
  Send,
  X,
  User,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Tag,
  CornerDownLeft,
} from 'lucide-react';

interface RatingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: ShowcaseItem;
  onPrevItem: () => void;
  onNextItem: () => void;
  onFeedbackSubmitted: (feedback: Feedback) => void;
}

const PRESET_TAGS = [
  '視覺驚艷 ✨',
  '排版清晰 📐',
  '科技感強 ⚡',
  '易用性高 🎯',
  '配色前衛 🎨',
  '動態流暢 🌊',
  '資訊密度佳 📊',
  '期待上線 🚀',
];

export const RatingDrawer: React.FC<RatingDrawerProps> = ({
  isOpen,
  onClose,
  currentItem,
  onPrevItem,
  onNextItem,
  onFeedbackSubmitted,
}) => {
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem('motc_catwalk_nickname') || '';
  });
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const reviewTextareaRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Auto focus when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (!nickname) {
          nicknameInputRef.current?.focus();
        } else {
          reviewTextareaRef.current?.focus();
        }
      }, 150);
    } else {
      setSubmittedSuccess(false);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts within drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape or Down Arrow (when not focused on textarea) to close
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Enter + Ctrl / Cmd to submit
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmit();
        return;
      }

      // Number keys 1-5 for fast rating (when not typing in inputs)
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      if (!isInput && ['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        setRating(parseInt(e.key, 10));
      }

      // ArrowUp/ArrowDown when not in textarea to switch showcase items
      if (!isInput) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          onPrevItem();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          onNextItem();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nickname, rating, review, selectedTags, currentItem]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch (e) {
      console.debug('Confetti skipped', e);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    const finalNickname = nickname.trim() || '匿名走秀評審';
    setIsSubmitting(true);

    // Persist nickname
    localStorage.setItem('motc_catwalk_nickname', finalNickname);

    const feedbackPayload = {
      ui_id: currentItem.id,
      nickname: finalNickname,
      rating,
      review: review.trim(),
      action_type: 'detailed_review' as const,
      tags: selectedTags,
    };

    const res = await submitFeedback(feedbackPayload);

    // Track in Firebase Analytics
    logCatwalkEvent('submit_feedback', {
      ui_id: currentItem.id,
      rating,
      has_review: Boolean(review.trim()),
      tags_count: selectedTags.length,
    });

    playSuccessSound();
    triggerConfetti();

    setIsSubmitting(false);
    setSubmittedSuccess(true);

    if (res.data) {
      onFeedbackSubmitted(res.data);
    }

    // Reset review input for next time and close after brief moment
    setTimeout(() => {
      setReview('');
      setSelectedTags([]);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
          />

          {/* Slide-up Drawer */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto z-50 bg-slate-900/95 border-t border-x border-white/15 rounded-t-3xl shadow-2xl backdrop-blur-2xl text-slate-100 p-5 sm:p-7 max-h-[92vh] overflow-y-auto"
          >
            {/* Drawer Drag Bar */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-4 cursor-grab" onClick={onClose} />

            {/* Header with item title and navigation */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full ring-4 ring-white/10"
                  style={{ backgroundColor: currentItem.accentColor }}
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                      {currentItem.category}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-white">
                      {currentItem.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">填寫評分並留下您的設計回饋與建議</p>
                </div>
              </div>

              {/* Prev / Next item switchers inside drawer */}
              <div className="flex items-center space-x-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={onPrevItem}
                  title="切換上一組展示 (↑)"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onNextItem}
                  title="切換下一組展示 (↓)"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {submittedSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">評分與建議已送出！</h4>
                <p className="text-sm text-slate-400">已同步寫入 Supabase 資料庫並列入統計榜單</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {/* Field 1: Nickname */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      評審姓名或暱稱 <span className="text-slate-500 font-normal">(可留空使用預設)</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">TAB 切換下一項</span>
                  </label>
                  <input
                    ref={nicknameInputRef}
                    type="text"
                    tabIndex={1}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="例如: 台北市民小張 / UI 設計師 Alice"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-600 outline-none transition-all"
                  />
                </div>

                {/* Field 2: Interactive Star Rating */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      整體滿意度評分
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {hoverRating || rating} / 5 星
                    </span>
                  </label>
                  <div
                    tabIndex={2}
                    className="flex items-center space-x-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') setRating((r) => Math.min(5, r + 1));
                      if (e.key === 'ArrowLeft') setRating((r) => Math.max(1, r - 1));
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 text-slate-600 hover:text-amber-400 transition-transform transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                            (hoverRating !== null ? hoverRating >= star : rating >= star)
                              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 ml-auto hidden sm:inline">
                      (支援鍵盤 1~5 鍵快速評分)
                    </span>
                  </div>
                </div>

                {/* Field 3: Preset Impression Tags */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                    快速印象標籤 <span className="text-slate-500 font-normal">(點選加入)</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_TAGS.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          tabIndex={3}
                          onClick={() => toggleTag(tag)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
                              : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 4: Detailed Review Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                      評論與具體優化建議
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Ctrl + Enter 送出</span>
                  </label>
                  <textarea
                    ref={reviewTextareaRef}
                    rows={3}
                    tabIndex={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="分享您對這組 UI 的視覺排版、色彩搭配、功能易用性或創新的看法..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Action Bar */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-mono hidden sm:flex items-center gap-1">
                    <CornerDownLeft className="w-3.5 h-3.5" />
                    <span>按 Enter 送出評分</span>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                    >
                      關閉 (Esc)
                    </button>

                    <button
                      ref={submitButtonRef}
                      type="submit"
                      tabIndex={5}
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? '正在寫入 Supabase...' : '送出評分 (Enter)'}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
