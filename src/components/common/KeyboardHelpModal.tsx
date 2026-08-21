import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

interface KeyboardHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardHelpModal: React.FC<KeyboardHelpModalProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    {
      keys: ['H'],
      action: '走秀說明 (Showcase Guide)',
      desc: '彈出當前走秀項目的 3 層資料階層架構圖解、設計理念與受眾友善度分析',
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/15',
    },
    {
      keys: ['→', '右鍵 / 右滑'],
      action: '喜歡 (Like)',
      desc: '將當前走秀卡片向右拋出並記錄喜歡，自動切換至下一組',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      keys: ['←', '左鍵 / 左滑'],
      action: '跳過 (Pass)',
      desc: '將當前走秀卡片向左拋出並跳過，切換至下一組',
      color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    },
    {
      keys: ['↑', '上鍵'],
      action: '評分與評論面板',
      desc: '向上彈出深度評分反饋抽屜，進入評分模式',
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    },
    {
      keys: ['Space', 'P'],
      action: '暫停 / 繼續自動播放',
      desc: '一鍵切換走秀自動輪播巡航模式，可自由選擇播放間隔',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      keys: ['↓', '下鍵 / Esc'],
      action: '收合評分面板 / 換頁',
      desc: '收合評分抽屜或快速預覽下一組走秀展示',
      color: 'text-slate-300 border-slate-700 bg-slate-800/40',
    },
    {
      keys: ['Tab', 'Shift+Tab'],
      action: '欄位快速焦點切換',
      desc: '在評分抽屜中於「暱稱 ➔ 星級評分 ➔ 標籤 ➔ 評論 ➔ 送出」間順暢切換',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      keys: ['1 ~ 5'],
      action: '快速設定 1~5 星評分',
      desc: '在走秀或評分抽屜中快速打分',
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      keys: ['Enter', 'Ctrl+Enter'],
      action: '送出評分建議',
      desc: '完成評分表單並觸發彩帶動畫，寫入 Supabase 資料庫',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      keys: ['D'],
      action: '切換統計分析看板',
      desc: '查看即時排行榜、評分直方圖與評語流動牆',
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl z-10 bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar select-none my-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">走秀鍵盤操作指南</h3>
                  <p className="text-xs text-slate-400">極致流暢的快捷鍵與手勢體驗</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{s.action}</div>
                    <div className="text-[11px] text-slate-400">{s.desc}</div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border shadow-sm ${s.color}`}
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                我知道了 (Esc)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
