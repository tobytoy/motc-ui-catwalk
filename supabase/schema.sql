-- ==============================================================================
-- MOTC UI Catwalk - Supabase Database Schema
-- ==============================================================================

-- 1. 展示項目清單資料表 (UI Items)
CREATE TABLE IF NOT EXISTS public.ui_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    image_url TEXT,
    component_name TEXT,
    metrics JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 使用者反饋評分資料表 (UI Feedback)
CREATE TABLE IF NOT EXISTS public.ui_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ui_id TEXT NOT NULL,
    nickname TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    action_type TEXT DEFAULT 'detailed_review', -- 'like', 'pass', 'detailed_review'
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. 建立索引提升即時查詢效能
CREATE INDEX IF NOT EXISTS idx_ui_feedback_ui_id ON public.ui_feedback(ui_id);
CREATE INDEX IF NOT EXISTS idx_ui_feedback_created_at ON public.ui_feedback(created_at DESC);

-- 4. 啟用 Row Level Security (RLS)
ALTER TABLE public.ui_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ui_feedback ENABLE ROW LEVEL SECURITY;

-- 5. 建立公開讀取、寫入與管理策略 (允許走秀訪客評分與查看統計)
DROP POLICY IF EXISTS "Allow public read ui_items" ON public.ui_items;
CREATE POLICY "Allow public read ui_items" ON public.ui_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert ui_items" ON public.ui_items;
CREATE POLICY "Allow public insert ui_items" ON public.ui_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete ui_items" ON public.ui_items;
CREATE POLICY "Allow public delete ui_items" ON public.ui_items FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read ui_feedback" ON public.ui_feedback;
CREATE POLICY "Allow public read ui_feedback" ON public.ui_feedback FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert ui_feedback" ON public.ui_feedback;
CREATE POLICY "Allow public insert ui_feedback" ON public.ui_feedback FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete ui_feedback" ON public.ui_feedback;
CREATE POLICY "Allow public delete ui_feedback" ON public.ui_feedback FOR DELETE USING (true);
