import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShowcaseItem } from '../../types';
import {
  X,
  Layers,
  Layout,
  Users,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';

interface ShowcaseExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: ShowcaseItem;
  allShowcases: ShowcaseItem[];
  onSelectItem: (item: ShowcaseItem) => void;
}

export const ShowcaseExplanationModal: React.FC<ShowcaseExplanationModalProps> = ({
  isOpen,
  onClose,
  currentItem,
  allShowcases,
  onSelectItem,
}) => {
  const [activeTab, setActiveTab] = useState<'data' | 'ui' | 'overview'>('data');

  // Handle ESC and arrows inside modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const idx = allShowcases.findIndex((s) => s.id === currentItem.id);
        const prevIdx = idx <= 0 ? allShowcases.length - 1 : idx - 1;
        onSelectItem(allShowcases[prevIdx]);
      } else if (e.key === 'ArrowRight' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const idx = allShowcases.findIndex((s) => s.id === currentItem.id);
        const nextIdx = (idx + 1) % allShowcases.length;
        onSelectItem(allShowcases[nextIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allShowcases, currentItem.id, onClose, onSelectItem]);

  const dh = currentItem.dataHierarchy;
  const ui = currentItem.uiLayout;

  // Find related items in same UI hierarchy group for instant comparison
  const relatedVariants = allShowcases.filter(
    (s) => s.hierarchyGroup && s.hierarchyGroup === currentItem.hierarchyGroup
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-3xl z-10 bg-slate-900/95 border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-2xl text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col justify-between select-none my-auto"
          >
            {/* Header with Title and Current Item Pill */}
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2.5 rounded-2xl border shadow-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${currentItem.accentColor}20`,
                      borderColor: `${currentItem.accentColor}50`,
                      color: currentItem.accentColor,
                    }}
                  >
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white font-mono">
                        {currentItem.category}
                      </span>
                      {currentItem.hierarchyVariant && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          {currentItem.hierarchyVariant}
                        </span>
                      )}
                      <h3 className="font-extrabold text-base sm:text-lg text-white">
                        {currentItem.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      走秀深度架構說明 · 資料面 3 層階層解析與 UI 受眾分析
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Same UI Variant Switcher Bar (If variants exist) */}
              {relatedVariants.length > 1 && (
                <div className="mt-3 p-2 rounded-2xl bg-slate-950/80 border border-indigo-500/20 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-bold px-1 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>同 UI 階層變體對比:</span>
                  </div>
                  <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar">
                    {relatedVariants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => onSelectItem(v)}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-xl whitespace-nowrap transition-all ${
                          v.id === currentItem.id
                            ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold shadow-md'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {v.hierarchyVariant || v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Tab Switcher: 資料面 / UI面與受眾 / 總覽 */}
              <div className="flex items-center space-x-1 mt-4 p-1 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('data')}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                    activeTab === 'data'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>A. 資料面 (最多 3 層階層架構)</span>
                </button>

                <button
                  onClick={() => setActiveTab('ui')}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                    activeTab === 'ui'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>B. UI 面風格與受眾友善度</span>
                </button>
              </div>

              {/* Content Body */}
              <div className="mt-4 space-y-4 text-xs sm:text-sm">
                {/* TAB A: 資料面 3 層階層解析 */}
                {activeTab === 'data' && (
                  <div className="space-y-4">
                    {/* 3-Tier Visual Flow Breakdown */}
                    <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 text-cyan-400 font-extrabold text-sm">
                          <Layers className="w-4 h-4" />
                          <span>3 層資料階層架構視覺圖 (最多 3 層)</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                          Tier Count: {dh?.tierCount || 3} 層
                        </span>
                      </div>

                      {/* 3-Tier Step Flow */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 relative">
                        {/* Tier 1 */}
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 relative group hover:border-cyan-400 transition-colors">
                          <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300 mb-1">
                            <span className="font-mono bg-cyan-500/20 px-1.5 py-0.2 rounded">第 1 層 (L1)</span>
                            <span className="text-[10px] text-slate-400">{dh?.level1.tag || '大分類'}</span>
                          </div>
                          <h4 className="font-black text-sm text-white mb-1">
                            {dh?.level1.name || '服務類別 (Category)'}
                          </h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {dh?.level1.description || '基礎服務、加值服務、票證服務、歷史服務等大類劃分。'}
                          </p>
                          {dh?.level1.examples && (
                            <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex flex-wrap gap-1">
                              {dh.level1.examples.map((ex) => (
                                <span key={ex} className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Tier 2 */}
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-indigo-500/40 relative group hover:border-indigo-400 transition-colors">
                          <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300 mb-1">
                            <span className="font-mono bg-indigo-500/20 px-1.5 py-0.2 rounded">第 2 層 (L2)</span>
                            <span className="text-[10px] text-slate-400">{dh?.level2.tag || '業務主題'}</span>
                          </div>
                          <h4 className="font-black text-sm text-white mb-1">
                            {dh?.level2.name || '業務主題 (Theme)'}
                          </h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {dh?.level2.description || '交通治理、公共運輸、道安、停車資訊、路況資訊等主題領域。'}
                          </p>
                          {dh?.level2.examples && (
                            <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex flex-wrap gap-1">
                              {dh.level2.examples.map((ex) => (
                                <span key={ex} className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Tier 3 */}
                        <div className="p-3 rounded-xl bg-slate-900/90 border border-purple-500/40 relative group hover:border-purple-400 transition-colors">
                          <div className="flex items-center justify-between text-[11px] font-bold text-purple-300 mb-1">
                            <span className="font-mono bg-purple-500/20 px-1.5 py-0.2 rounded">第 3 層 (L3)</span>
                            <span className="text-[10px] text-slate-400">{dh?.level3.tag || '領域端點'}</span>
                          </div>
                          <h4 className="font-black text-sm text-white mb-1">
                            {dh?.level3.name || '功能領域與端點 (Domain / API)'}
                          </h4>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {dh?.level3.description || '公車動態、軌道即時、停車位指標、道安當事人主檔等 738 支 API 端點。'}
                          </p>
                          {dh?.level3.examples && (
                            <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex flex-wrap gap-1">
                              {dh.level3.examples.map((ex) => (
                                <span key={ex} className="text-[9px] font-mono px-1 rounded bg-slate-800 text-slate-300">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Rationale & Philosophy: 為什麼這樣排？ */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10">
                      <h4 className="font-extrabold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5 mb-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>資料面架構設計理由：為什麼這樣排？</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                        {dh?.rationale || currentItem.description}
                      </p>
                    </div>

                    {/* Data Advantages List */}
                    {dh?.advantages && dh.advantages.length > 0 && (
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10">
                        <h4 className="font-extrabold text-xs sm:text-sm text-emerald-300 flex items-center gap-1.5 mb-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>資料面核心優點與特性</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {dh.advantages.map((adv, idx) => (
                            <div
                              key={idx}
                              className="flex items-start space-x-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                              <span>{adv}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB B: UI 面風格與受眾友善度 */}
                {activeTab === 'ui' && (
                  <div className="space-y-4">
                    {/* UI Style & Layout Features */}
                    <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-extrabold text-sm text-indigo-300 flex items-center gap-1.5">
                          <Layout className="w-4 h-4 text-indigo-400" />
                          <span>UI 排版風格與佈局特點</span>
                        </h4>
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                          {ui?.styleName || currentItem.category}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {(ui?.layoutFeatures || [
                          '經典深色海軍藍視覺導覽與高對比色階',
                          '高密度數據表格與多維度標籤過濾',
                          '免開彈窗的無縫即時展開預覽',
                          '支援鍵盤快速捷徑與單手極速操作',
                        ]).map((feat, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2 text-xs text-slate-300"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Audience: 這走秀對哪類人最友善 */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30">
                      <div className="flex items-center space-x-2 mb-2 text-purple-300 font-extrabold text-sm">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span>目標受眾與最友善對象說明</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 bg-purple-950/30 p-3 rounded-xl border border-purple-500/20 leading-relaxed font-sans mb-3">
                        <strong className="text-purple-300">核心友善受眾：</strong>{' '}
                        {ui?.targetAudience || '跨領域資料整合工程師、交通政策分析師與大眾通勤族。'}
                      </p>

                      {/* Persona Benefit Cards */}
                      {ui?.personaBenefits && ui.personaBenefits.length > 0 && (
                        <div className="space-y-2 mt-2">
                          <span className="text-[11px] font-bold text-slate-400">各使用者角色友善度評估 (Persona):</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ui.personaBenefits.map((p, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-xs text-white">{p.role}</span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                                    {p.suitability}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-normal">{p.benefit}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Accessibility Highlights */}
                    {ui?.accessibilityHighlights && ui.accessibilityHighlights.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/10">
                        <h5 className="font-bold text-xs text-slate-300 mb-2 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>易用性與無障礙設計亮點</span>
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {ui.accessibilityHighlights.map((acc, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                            >
                              ✓ {acc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-5 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-500 font-mono text-[11px]">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">H</kbd>
                <span>或</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Esc</kbd>
                <span>關閉說明</span>
                <span className="text-slate-600">|</span>
                <kbd className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Ctrl + ← / →</kbd>
                <span>切換項目</span>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all"
                >
                  確認並返回走秀 (Esc)
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
