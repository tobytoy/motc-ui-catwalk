import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShowcaseItem } from '../../types';
import { saveCustomShowcase } from '../../lib/supabase';
import { X, PlusCircle, Image, Tag, Palette } from 'lucide-react';

interface CustomShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: (item: ShowcaseItem) => void;
}

export const CustomShowcaseModal: React.FC<CustomShowcaseModalProps> = ({
  isOpen,
  onClose,
  onItemAdded,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<'智慧交通' | '即時路況' | '大眾運輸' | '低碳永續' | 'AI調度' | '自訂展示'>('自訂展示');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [accentColor, setAccentColor] = useState('#06b6d4');

  const colorPresets = ['#06b6d4', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: ShowcaseItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || '客製化 UI 截圖展示',
      category,
      description: description.trim() || '使用者新增之 UI 走秀展示',
      imageUrl: imageUrl.trim() || undefined,
      accentColor,
      tags: tagsInput.split(/[,， ]/).filter(Boolean),
      author: '客製新增',
      version: 'v1.0',
    };

    saveCustomShowcase(newItem);
    onItemAdded(newItem);
    onClose();

    // Reset
    setTitle('');
    setSubtitle('');
    setImageUrl('');
    setDescription('');
    setTagsInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">新增走秀展示 UI</h3>
                  <p className="text-xs text-slate-400">支援貼上圖片網址或客製設計項目</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">展示標題 *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如: 智慧停車導引系統 2.0"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">副標題 / 英文名稱</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="例如: Smart Parking Navigation Hub"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Image className="w-3.5 h-3.5 text-cyan-400" /> UI 截圖圖片網址 (可留空)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/screenshot.png"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 text-white outline-none font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">分類領域</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white outline-none"
                  >
                    <option value="智慧交通">智慧交通</option>
                    <option value="即時路況">即時路況</option>
                    <option value="大眾運輸">大眾運輸</option>
                    <option value="低碳永續">低碳永續</option>
                    <option value="AI調度">AI調度</option>
                    <option value="自訂展示">自訂展示</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Palette className="w-3 h-3 text-cyan-400" /> 主題色調
                  </label>
                  <div className="flex items-center space-x-2 py-1.5">
                    {colorPresets.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setAccentColor(c)}
                        className={`w-6 h-6 rounded-full transition-transform ${
                          accentColor === c ? 'scale-125 ring-2 ring-white shadow-lg' : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" /> 標籤 (用空格或逗號隔開)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="停車導引, 智慧地圖, 即時空位"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">功能描述簡介</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="簡要描述此 UI 的核心功能與亮點..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 text-white outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20"
                >
                  確認加入走秀
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
