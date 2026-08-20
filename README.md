# 🌟 MOTC UI Catwalk (交通部 TDX 運輸科技走秀評分平台)

> 為交通部 TDX 運輸資料流通平臺（全臺 150+ 項 API 資料服務）打造的「多維度 UI 呈現典範走秀評審平台」。透過 3D 擬真卡片滑動（Tinder-style）、自動巡航輪播、即時流言回饋與雲端統計排行榜，快速評測哪種資訊架構與互動設計最符合使用者與開發者體驗！

🔗 **線上即時體驗**：[https://motc-ui-catwalk.web.app](https://motc-ui-catwalk.web.app)

---

## 🏛️ 8 大 TDX 資料呈現典範 (UI Paradigms)

本專案收錄了同一份 TDX 全平臺核心資料的 8 種截然不同 UI 呈現方式：

1. **🏛️ UI 典範 1：官方原版 1:1 像素級還原 (`TDXClassicPortalUI`)**
   - 1:1 還原交通部 TDX 官方入口網站：深海軍藍導覽列、左側主題與領域計數樹、右側高密度即時資料表格與 OpenAPI 說明彈窗。
2. **🗂️ UI 典範 1A：官方微調 · 現代卡匣表格版 (`TDXModernTableUI`)**
   - 保留官方藍白格局與分類樹，將傳統表格資料列升級為**圓角懸浮卡匣（Card Rows）**，直接附帶一鍵複製 cURL 與即時動態燈號。
3. **📑 UI 典範 1B：官方微調 · 雙欄直列速查版 (`TDXMasterDetailUI`)**
   - 保留官方經典導覽，右側改為**左右分割的 Master-Detail 雙欄直列**：點選左側端點，右側立即無縫展開完整欄位定義與 JSON 範例，免開彈窗！
4. **🍱 UI 典範 2：現代 Bento 模組矩陣 (`TDXBentoMatrixUI`)**
   - Apple / Linear 風格 Bento Grid。將公路、軌道、公車、微移動、高快速路與空海運 6 大領域封裝為獨立色塊模組。
5. **💻 UI 典範 3：開發者終端與 API 即時沙盒 (`TDXDeveloperSandboxUI`)**
   - Swagger / Postman 風格，支援即時調整 OData 參數、多語言代碼生成（cURL/TS/Python）與即時 JSON 預覽。
6. **📡 UI 典範 4：戰情雷達與全景脈衝 (`TDXCommandRadarUI`)**
   - Cyberpunk / NASA 航太級戰情室：中央波形雷達、2.4 億次吞吐量即時跳動、MQTT 串流廣播跑馬燈與節點延遲監控。
7. **🔍 UI 典範 5：極速指令與搜尋中樞 (`TDXCommandPaletteUI`)**
   - Raycast / Spotlight (`Cmd+K`) 極簡快速搜尋，大搜尋列即時模糊檢索 150+ 服務。
8. **🧭 UI 典範 6：生活情境與服務套件導引 (`TDXScenarioJourneyUI`)**
   - 以解決實際應用為出發點（連假國道、雙北公車轉乘、企業 ESG 減碳存摺、空海聯運），一鍵打包所需 API 組合。

---

## 🚀 快速開始 (Local Development)

### 1. 安裝相依套件
```bash
npm install
```

### 2. 環境變數設定
複製 `.env.example` 並建立 `.env`：
```bash
cp .env.example .env
```

填入 Firebase 與 Supabase 連線金鑰：
```env
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="motc-4ebdb.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="motc-4ebdb"
VITE_FIREBASE_STORAGE_BUCKET="motc-4ebdb.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="411757836173"
VITE_FIREBASE_APP_ID="1:411757836173:web:66e34870b24d214aa56fc4"
VITE_FIREBASE_MEASUREMENT_ID="G-FZQKB6PNMP"

VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

### 3. 啟動本地開發伺服器
```bash
npm run dev
```

### 4. 構建與部署
```bash
npm run build
npm run deploy
```

---

## 🛠️ 技術棧 (Tech Stack)

- **核心框架**：React 18, TypeScript, Vite
- **視覺與動效**：Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti
- **圖表可視化**：Recharts
- **雲端資料庫**：Supabase (PostgreSQL with Realtime RLS)
- **分析與託管**：Firebase Hosting & Google Analytics 4

---

## ⌨️ 走秀操作快捷鍵

| 按鍵 | 功能 |
| :--- | :--- |
| 👉 **`→`** | 快速喜歡 (Swipe Right) |
| 👈 **`←`** | 快速略過 (Swipe Left) |
| ⬆️ **`↑`** | 開啟深度評分與留言抽屜 |
| ⬇️ **`↓`** / **`Esc`** | 關閉評分抽屜 |
| **`Space`** / **`P`** | 暫停 / 繼續自動輪播巡航 |
| **`D`** | 切換至統計評分排行榜總榜 |
| **`1` ~ `5`** | 快速給予 1 ~ 5 星評分 |
