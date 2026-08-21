import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/common/Navbar';
import { CatwalkStage } from './components/catwalk/CatwalkStage';
import { DashboardView } from './components/dashboard/DashboardView';
import { KeyboardHelpModal } from './components/common/KeyboardHelpModal';
import { ShowcaseExplanationModal } from './components/common/ShowcaseExplanationModal';
import { CustomShowcaseModal } from './components/common/CustomShowcaseModal';
import { SHOWCASE_PRESETS } from './data/showcases';
import { ShowcaseItem, Feedback } from './types';
import { fetchFeedbacks, fetchCustomShowcases, supabase, isSupabaseConfigured } from './lib/supabase';
import { logCatwalkEvent } from './lib/firebase';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'catwalk' | 'dashboard'>('catwalk');
  const [showcases, setShowcases] = useState<ShowcaseItem[]>(SHOWCASE_PRESETS);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  const [selectedExplanationItem, setSelectedExplanationItem] = useState<ShowcaseItem>(SHOWCASE_PRESETS[0]);
  const [isAddCustomOpen, setIsAddCustomOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load custom showcases and feedbacks on mount
  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const customList = fetchCustomShowcases();
      setShowcases([...SHOWCASE_PRESETS, ...customList]);

      const fbList = await fetchFeedbacks();
      setFeedbacks(fbList);
    } catch (err) {
      console.warn('Data load warning:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    logCatwalkEvent('page_view', { page: 'catwalk' });

    // Optional Supabase Realtime Subscription
    if (isSupabaseConfigured) {
      try {
        const channel = supabase
          .channel('schema-db-changes')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'ui_feedback' },
            (payload) => {
              if (payload.new) {
                setFeedbacks((prev) => [payload.new as Feedback, ...prev]);
              }
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (e) {
        console.debug('Realtime subscription skipped', e);
      }
    }
  }, [loadData]);

  const handleTabChange = (tab: 'catwalk' | 'dashboard') => {
    setActiveTab(tab);
    logCatwalkEvent('tab_change', { tab });
  };

  const handleFeedbackAdded = (newFb: Feedback) => {
    setFeedbacks((prev) => [newFb, ...prev]);
  };

  const handleCustomShowcaseAdded = (item: ShowcaseItem) => {
    setShowcases((prev) => [...prev, item]);
    logCatwalkEvent('add_custom_showcase', { title: item.title });
  };

  const handleOpenExplanation = (item?: ShowcaseItem) => {
    if (item) {
      setSelectedExplanationItem(item);
    }
    setIsExplanationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onChangeTab={handleTabChange}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenExplanation={() => handleOpenExplanation(showcases[0])}
        onOpenAddCustom={() => setIsAddCustomOpen(true)}
        totalShowcases={showcases.length}
        totalFeedbacks={feedbacks.length}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col justify-center">
        {activeTab === 'catwalk' ? (
          <CatwalkStage
            showcases={showcases}
            feedbacks={feedbacks}
            onOpenHelp={() => setIsHelpOpen(true)}
            onOpenExplanation={() => handleOpenExplanation()}
            onOpenAddCustom={() => setIsAddCustomOpen(true)}
            onNavigateDashboard={() => handleTabChange('dashboard')}
            onFeedbackUpdated={handleFeedbackAdded}
          />
        ) : (
          <DashboardView
            feedbacks={feedbacks}
            showcases={showcases}
            onBackToCatwalk={() => handleTabChange('catwalk')}
            onRefreshData={loadData}
            isRefreshing={isRefreshing}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MOTC UI CATWALK · 交通科技走秀評分平台</span>
          <span className="text-slate-600">
            Powered by Vite + React + Framer Motion + Supabase + Firebase
          </span>
        </div>
      </footer>

      {/* Keyboard Shortcuts Cheatsheet Modal */}
      <KeyboardHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Showcase Explanation Modal (Top-Level) */}
      <ShowcaseExplanationModal
        isOpen={isExplanationOpen}
        onClose={() => setIsExplanationOpen(false)}
        currentItem={selectedExplanationItem || showcases[0]}
        allShowcases={showcases}
        onSelectItem={(item) => setSelectedExplanationItem(item)}
      />

      {/* Add Custom Showcase Modal */}
      <CustomShowcaseModal
        isOpen={isAddCustomOpen}
        onClose={() => setIsAddCustomOpen(false)}
        onItemAdded={handleCustomShowcaseAdded}
      />
    </div>
  );
};
