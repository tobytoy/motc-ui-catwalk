import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ShowcaseItem, Feedback } from '../../types';
import { CatwalkCard } from './CatwalkCard';
import { CatwalkControls } from './CatwalkControls';
import { RatingDrawer } from './RatingDrawer';
import { ShowcaseExplanationModal } from '../common/ShowcaseExplanationModal';
import { submitFeedback } from '../../lib/supabase';
import { logCatwalkEvent } from '../../lib/firebase';
import {
  playLikeSound,
  playPassSound,
  playOpenSound,
  isSoundEnabled,
  toggleSound,
} from '../../lib/sound';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Shuffle, BookOpen } from 'lucide-react';

interface CatwalkStageProps {
  showcases: ShowcaseItem[];
  feedbacks?: Feedback[];
  onOpenHelp: () => void;
  onOpenExplanation?: () => void;
  onOpenAddCustom?: () => void;
  onNavigateDashboard: () => void;
  onFeedbackUpdated: (feedback: Feedback) => void;
}

export const CatwalkStage: React.FC<CatwalkStageProps> = ({
  showcases,
  feedbacks = [],
  onOpenHelp,
  onOpenAddCustom,
  onNavigateDashboard,
  onFeedbackUpdated,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());

  // Auto-Play states
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [autoPlayDuration, setAutoPlayDuration] = useState(8); // in seconds
  const [autoPlayProgress, setAutoPlayProgress] = useState(0); // 0 to 100

  const currentItem = showcases[currentIndex] || showcases[0];
  const nextItem = showcases[(currentIndex + 1) % showcases.length];

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const handleToggleAutoPlay = () => {
    setIsAutoPlay((prev) => !prev);
    setAutoPlayProgress(0);
    logCatwalkEvent('toggle_autoplay', { enabled: !isAutoPlay });
  };

  const handleChangeDuration = (sec: number) => {
    setAutoPlayDuration(sec);
    setAutoPlayProgress(0);
  };

  // Open explanation modal
  const handleOpenExplanation = useCallback(() => {
    playOpenSound();
    setIsExplanationOpen(true);
    logCatwalkEvent('open_explanation_modal', { ui_id: currentItem.id });
  }, [currentItem.id]);

  // Like Swipe Handler
  const handleLike = useCallback(async () => {
    if (isRatingOpen || isExplanationOpen) return;
    playLikeSound();
    setAutoPlayProgress(0);

    // Confetti effect
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: 0.8, y: 0.5 },
        colors: ['#10b981', '#34d399', '#6ee7b7'],
      });
    } catch {}

    // Record Quick Like to Supabase
    const nickname =
      localStorage.getItem('motc_catwalk_nickname') || '走秀觀眾 (快捷喜歡)';
    const fb = await submitFeedback({
      ui_id: currentItem.id,
      nickname,
      rating: 5,
      review: '透過走秀快速喜歡 (Swipe Right)',
      action_type: 'like',
      tags: ['快速喜歡'],
    });

    logCatwalkEvent('swipe_like', { ui_id: currentItem.id });
    if (fb.data) onFeedbackUpdated(fb.data);

    // Advance to next
    setCurrentIndex((prev) => (prev + 1) % showcases.length);
  }, [currentItem, isRatingOpen, isExplanationOpen, showcases.length, onFeedbackUpdated]);

  // Pass Swipe Handler
  const handlePass = useCallback(async () => {
    if (isRatingOpen || isExplanationOpen) return;
    playPassSound();
    setAutoPlayProgress(0);

    const nickname =
      localStorage.getItem('motc_catwalk_nickname') || '走秀觀眾 (快捷略過)';
    const fb = await submitFeedback({
      ui_id: currentItem.id,
      nickname,
      rating: 3,
      review: '透過走秀快速略過 (Swipe Left)',
      action_type: 'pass',
      tags: ['快速跳過'],
    });

    logCatwalkEvent('swipe_pass', { ui_id: currentItem.id });
    if (fb.data) onFeedbackUpdated(fb.data);

    // Advance to next
    setCurrentIndex((prev) => (prev + 1) % showcases.length);
  }, [currentItem, isRatingOpen, isExplanationOpen, showcases.length, onFeedbackUpdated]);

  const handleOpenRating = useCallback(() => {
    playOpenSound();
    setIsRatingOpen(true);
    logCatwalkEvent('open_rating_drawer', { ui_id: currentItem.id });
  }, [currentItem.id]);

  const handlePrevItem = useCallback(() => {
    playPassSound();
    setAutoPlayProgress(0);
    setCurrentIndex((prev) => (prev === 0 ? showcases.length - 1 : prev - 1));
  }, [showcases.length]);

  const handleNextItem = useCallback(() => {
    playPassSound();
    setAutoPlayProgress(0);
    setCurrentIndex((prev) => (prev + 1) % showcases.length);
  }, [showcases.length]);

  const handleSelectIndex = (index: number) => {
    setAutoPlayProgress(0);
    setCurrentIndex(index % showcases.length);
  };

  // Auto-Play Timer Loop
  useEffect(() => {
    if (!isAutoPlay || isRatingOpen || isExplanationOpen) {
      return;
    }

    const intervalMs = 100;
    const step = 100 / ((autoPlayDuration * 1000) / intervalMs);

    const timer = setInterval(() => {
      setAutoPlayProgress((prev) => {
        if (prev + step >= 100) {
          // Time to advance
          setCurrentIndex((curr) => (curr + 1) % showcases.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoPlay, isRatingOpen, isExplanationOpen, autoPlayDuration, showcases.length]);

  // Global Keyboard Navigation (including 'h' for explanation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is typing in form inputs, let drawer/modal handle it
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      if (isTyping) return;

      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setIsExplanationOpen((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleLike();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePass();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleOpenRating();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextItem();
      } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handleToggleAutoPlay();
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        onNavigateDashboard();
      } else if (e.key === '?') {
        e.preventDefault();
        onOpenHelp();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleLike,
    handlePass,
    handleOpenRating,
    handleNextItem,
    isAutoPlay,
    onNavigateDashboard,
    onOpenHelp,
  ]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 sm:py-6 px-4 relative">
      {/* Background Catwalk Spotlight Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Catwalk Runway Header Info */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-3 px-1">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-white tracking-wide flex items-center gap-1.5">
              <span>TDX 交通科技走秀台</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                CATWALK STAGE
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              左右滑動表達喜好 · 支援自動輪播巡航 · 按 <kbd className="px-1 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono text-[10px]">H</kbd> 開啟 3 層資料架構與 UI 說明
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Explanation Trigger Button */}
          <button
            onClick={handleOpenExplanation}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all"
            title="查看此走秀項目的資料階層與設計說明 (H)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">走秀說明</span>
            <span className="font-mono text-[10px] ml-1 text-slate-400">(H)</span>
          </button>

          <button
            onClick={() => {
              setAutoPlayProgress(0);
              setCurrentIndex(Math.floor(Math.random() * showcases.length));
            }}
            title="隨機走秀"
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onNavigateDashboard}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition-all"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">走秀排行榜</span>
            <span className="font-mono text-[10px] ml-1 text-slate-400">(D)</span>
          </button>
        </div>
      </div>

      {/* Main Catwalk 3D Card Arena - Full Width max-w-6xl */}
      <div className="w-full max-w-6xl h-[600px] sm:h-[660px] lg:h-[700px] relative perspective-1000 flex items-center justify-center">
        {/* Next Card in Stack (Visual depth) */}
        {nextItem && (
          <div className="absolute inset-0 scale-95 translate-y-3 opacity-40 blur-[1px] pointer-events-none rounded-3xl overflow-hidden border border-white/5 bg-slate-900/60 shadow-xl">
            <div className="p-4 border-b border-white/5 flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-bold">{nextItem.title}</span>
            </div>
          </div>
        )}

        {/* Current Active Top Card with Gestures */}
        <AnimatePresence mode="wait">
          <CatwalkCard
            key={currentItem.id}
            item={currentItem}
            isTop={true}
            onSwipe={(direction) =>
              direction === 'right' ? handleLike() : handlePass()
            }
            onOpenRating={handleOpenRating}
            onOpenExplanation={handleOpenExplanation}
            isAutoPlay={isAutoPlay}
            autoPlayProgress={autoPlayProgress}
            feedbacks={feedbacks}
            onQuickFeedbackSubmitted={onFeedbackUpdated}
          />
        </AnimatePresence>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <CatwalkControls
        currentIndex={currentIndex}
        totalItems={showcases.length}
        onSwipeLeft={handlePass}
        onSwipeRight={handleLike}
        onOpenRating={handleOpenRating}
        onOpenHelp={onOpenHelp}
        onOpenExplanation={handleOpenExplanation}
        onOpenAddCustom={onOpenAddCustom}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={handleToggleAutoPlay}
        autoPlayDuration={autoPlayDuration}
        onChangeDuration={handleChangeDuration}
        autoPlayProgress={autoPlayProgress}
        onSelectIndex={handleSelectIndex}
      />

      {/* Slide-Up Rating Drawer */}
      <RatingDrawer
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        currentItem={currentItem}
        onPrevItem={handlePrevItem}
        onNextItem={handleNextItem}
        onFeedbackSubmitted={(fb) => onFeedbackUpdated(fb)}
      />

      {/* Showcase Explanation Modal (Opened with H or Header Button) */}
      <ShowcaseExplanationModal
        isOpen={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        currentItem={currentItem}
        allShowcases={showcases}
        onSelectItem={(item) => {
          const idx = showcases.findIndex((s) => s.id === item.id);
          if (idx >= 0) setCurrentIndex(idx);
        }}
      />
    </div>
  );
};
