import { ShowcaseItem } from '../types';

export const SHOWCASE_PRESETS: ShowcaseItem[] = [
  // =========================================================================
  // UI 典範 1 家族：官方原版 1:1 像素級還原 (Grouped Together)
  // =========================================================================
  {
    id: 'tdx-classic-portal-auth',
    title: 'UI 典範 1A：官方原版 · 服務權限階層優先',
    subtitle: 'Official Hierarchy: Category (Auth/Quota) ➔ Theme ➔ Domain',
    category: '官方還原',
    description: '1:1 還原 TDX 官方入口網站，以「服務權限與計費層級」為第一層大分類，輔以深海軍藍導覽與經典表格。',
    tags: ['官方原版樣式', '服務權限優先', '高密度表格', 'OpenAPI 說明'],
    accentColor: '#f5a623',
    componentName: 'TDXClassicPortalUI',
    author: '交通部 TDX 官方入口規範',
    version: 'v2.5.0',
    hierarchyGroup: 'ui-classic-portal',
    hierarchyVariant: '服務權限優先 (Category ➔ Theme ➔ Domain)',
    metrics: [
      { label: '最新收錄', value: '738 支', change: '最新測試機' },
      { label: '基礎服務', value: '213 支', change: '免審核即用' },
      { label: '加值與票證', value: '356 支', change: '交通治理' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '服務類別 (Category / Auth Tier)',
        tag: '第一層 (權限與計費大類)',
        description: '以基礎服務(213)、加值服務(201)、票證服務(155)、歷史服務(99)、機敏服務(22)劃分。',
        examples: ['基礎服務', '加值服務', '票證服務', '歷史服務'],
      },
      level2: {
        name: '業務主題 (Theme)',
        tag: '第二層 (業務功能主題)',
        description: '在特定權限下進一步細分交通治理、道安、公共運輸、道路編碼、停車資訊等主題。',
        examples: ['交通治理 (201)', '道安 (111)', '公共運輸 (102)'],
      },
      level3: {
        name: '功能領域與端點 (Domain / API Endpoints)',
        tag: '第三層 (具體服務實體)',
        description: '指向具體的 API 端點（如公車動態、停車績效、道安事故表等 738 支端點）。',
        examples: ['公車即時定點', '南投縣停車績效指標', '交通事故A1表'],
      },
      rationale:
        '官方原版採用「服務權限優先」的架構理由在於：政府資料開放平台必須首先解決「使用者權限邊界」與「計費額度管理」問題。使用者進入系統第一時間清楚自己具備的存取級別（免審核基礎 vs 加值申請），再依業務主題深入查找，權限邏輯極度嚴謹。',
      advantages: [
        '權限邊界清晰：第一時間區隔免審核與需申請之 API',
        '符合官網行政邏輯：清楚展示 738 支 API 的計次與計量點數規範',
        '安全合規：機敏服務與歷史檔案有明確的分級隔離',
        '官方習慣傳承：公部門承辦與現有 TDX 老用戶可無痛銜接',
      ],
    },
    uiLayout: {
      styleName: 'Classic Enterprise Navy Table (官方經典企業級表格)',
      layoutFeatures: [
        '經典深海軍藍 (#0c1938) 頂部導覽列與階層頁籤',
        '左側多層折疊主題計數樹與即時數量 Badge',
        '右側高密度即時資料表格，包含 Method、頻率與計費 Tag',
        '點擊彈出 OpenAPI 3.0 詳細規格與一鍵複製彈窗',
      ],
      targetAudience: '公部門承辦人員、資料治理稽核員、官方既有系統維運工程師。',
      personaBenefits: [
        {
          role: '政府機關/政策決策者',
          benefit: '快速確認各縣市及各類別 API 之開放進度與權限劃分。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: '資安與法規合規人員',
          benefit: '層級清晰區隔機敏資料與歷史資料，便於審核存取權限。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: '一般前端新手開發者',
          benefit: '資訊密度較高，初次查閱需理解政府分類術語。',
          suitability: '中等推薦 ★★★☆☆',
        },
      ],
      accessibilityHighlights: [
        '標準鍵盤 Tab 焦點遍歷支援',
        '高對比深藍色背景搭配明亮標籤',
        '數據欄位具備固定標題列與滾動鎖定',
      ],
    },
  },
  {
    id: 'tdx-classic-portal-entity',
    title: 'UI 典範 1B：官方原版 · 運具實體導向版',
    subtitle: 'Entity-First Hierarchy: Domain (Transit Mode) ➔ Category ➔ API',
    category: '官方還原',
    description: '保留官方藍白格局，但將第一層重構為「運具實體領域 (公車/軌道/停車/道安)」，讓業務開發者直球尋找運具。',
    tags: ['官方原版樣式', '運具實體優先', '公車/軌道分類', '高密度表格'],
    accentColor: '#eab308',
    componentName: 'TDXClassicPortalUI',
    author: '運輸業務導向小組',
    version: 'v2.5.5',
    hierarchyGroup: 'ui-classic-portal',
    hierarchyVariant: '運具實體優先 (Domain ➔ Category ➔ Endpoint)',
    metrics: [
      { label: '公車相關', value: '224 支', change: '市區與公路' },
      { label: '道安治理', value: '155 支', change: '事故與績效' },
      { label: '軌道運具', value: '30+ 支', change: '高鐵/台鐵/捷運' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '運具與實體領域 (Domain / Entity)',
        tag: '第一層 (運具實體大類)',
        description: '直接以使用者最熟悉的「公車、軌道、停車、道路安全、觀光」為第一入口。',
        examples: ['公車 (224)', '公共運輸 (70)', '道路安全 (44)', '停車資訊 (44)'],
      },
      level2: {
        name: '服務層級與時效 (Category / Tier)',
        tag: '第二層 (資料服務層級)',
        description: '在特定運具下，選擇需要的是即時基礎資料、進階空間對應還是加值統計治理。',
        examples: ['基礎免審核 (v2)', '加值治理 (v3)', '歷史資料庫'],
      },
      level3: {
        name: '端點規格與操作 (API Path & OAS)',
        tag: '第三層 (具體 API)',
        description: '取得該運具下符合該服務層級的精準 API 端點。',
        examples: ['RealTimeNearStop', 'FriendlyParkingIndicator', 'SectionIC'],
      },
      rationale:
        '運具實體優先的架構理由在於：絕大多數 App 與 Web 開發者（如公車族 App 或停車地圖工程師）是帶著「具體運具問題」前來找資料。先選運具再挑服務層級，能在最短時間內收斂目標範圍，省去跨類別比對的時間。',
      advantages: [
        '業務直覺性強：開發者不用思考「這支 API 算基礎還是加值」，直接點選運具即可',
        '降低認知負擔：將公車相關 224 支 API 一次匯總呈現',
        '利於垂直應用開發：快速打包特定運具全生命週期端點',
      ],
    },
    uiLayout: {
      styleName: 'Classic Navy Table (運具索引版)',
      layoutFeatures: [
        '維持官方經典外觀，左側樹首頁改為運具圖示與匯總數量',
        '切換運具時即時連動右側服務清單',
        '支援依運具快速過濾 JSON/XML 與 MQTT 協議',
      ],
      targetAudience: '公車與軌道 App 開發者、交通規劃系所研究員、垂直領域系統整合商。',
      personaBenefits: [
        {
          role: '交通 App 前端工程師',
          benefit: '直接在「公車」或「停車」下找到所需全部端點，減少來回切換。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: '學術研究人員',
          benefit: '容易針對單一運具進行全量數據集的批量下載與分析。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '運具名稱包含直觀繁體中文與國際通用圖示',
        '提供清晰的運具數據涵蓋率摘要',
      ],
    },
  },

  // =========================================================================
  // UI 典範 1A 家族：現代卡匣表格 (Grouped Together)
  // =========================================================================
  {
    id: 'tdx-modern-table-theme',
    title: 'UI 典範 2A：現代卡匣表格 · 業務主題優先',
    subtitle: 'Modern Card Rows: Theme (Governance/Safety) ➔ Tier ➔ Endpoint',
    category: '官方微調',
    description: '保留官方經典架構，升級為現代圓角卡匣（Card Rows），以「交通治理、道安、公共運輸」等業務主題為核心排序。',
    tags: ['官方微調版', '圓角卡匣', '業務主題優先', '一鍵複製cURL'],
    accentColor: '#3b82f6',
    componentName: 'TDXModernTableUI',
    author: '現代化使用者體驗小組',
    version: 'v2.6.0',
    hierarchyGroup: 'ui-modern-table',
    hierarchyVariant: '業務主題優先 (Theme ➔ Tier ➔ Card Row)',
    metrics: [
      { label: '交通治理', value: '201 支', change: '加值運算' },
      { label: '道安資料', value: '111 支', change: '事故主檔' },
      { label: '複製效率', value: '1 鍵完成', change: '+80%' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '業務主題 (Business Theme)',
        tag: '第一層 (業務應用主題)',
        description: '以「交通治理(201)、票證(157)、道安(111)、公共運輸(102)、道路編碼(41)」劃分。',
        examples: ['交通治理', '道安', '公共運輸', '停車資訊'],
      },
      level2: {
        name: '服務授權層級 (Service Tier)',
        tag: '第二層 (基礎/加值/歷史)',
        description: '在特定主題下標註是否為免審核基礎服務或加值演算服務。',
        examples: ['基礎免審 (1000次/點)', '加值治理 (POST)', '歷史封存'],
      },
      level3: {
        name: '卡匣端點與快捷指令 (Card Row & cURL)',
        tag: '第三層 (獨立卡匣)',
        description: '每一個獨立 API 封裝為圓角卡匣，內建一鍵複製 cURL 與即時頻率綠燈。',
        examples: ['/basic/v2/Bus/RealTimeNearStop', '/premium/Governance/...'],
      },
      rationale:
        '以業務主題優先的理由：在現代資料治理趨勢下，各局處與民間團隊多以「解決特定業務痛點（如降低事故率、改善公車轉乘縫隙）」為目標，將主題置於第一層可直接引導使用者發現相關聯的資料集合。',
      advantages: [
        '目標導向明確：交通治理與道安分析師能秒速鎖定相關 API',
        '卡匣化設計：告別傳統高壓密集格線，視覺節奏明快',
        '高效率工具列：卡匣右側直接提供 Copy cURL，減少 2 步點擊操作',
      ],
    },
    uiLayout: {
      styleName: 'Modern Card Rows Table (現代圓角卡匣表格)',
      layoutFeatures: [
        '去除生硬表格線，採用獨立圓角卡匣與微浮凸陰影',
        '卡匣內整合 HTTP Method (GET/POST) 晶片與脈衝即時綠燈',
        '右側懸浮快捷工具列：一鍵 cURL、OAS 預覽、計費規則',
        '支援鍵盤快速過濾與即時高亮搜尋結果',
      ],
      targetAudience: '資料產品經理、交通治理專案分析師、現代前端工程師。',
      personaBenefits: [
        {
          role: '資料產品經理 (Data PM)',
          benefit: '透過主題分類快速盤點平台能力，卡匣化排版便於向長官展示。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: 'API 串接工程師',
          benefit: '直接在列表上複製 cURL，不用每次開彈窗看路徑。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '卡匣間距適中 (8px gap)，不易誤觸',
        '色彩對比通過 WCAG 2.1 AA 規範',
      ],
    },
  },
  {
    id: 'tdx-modern-table-freq',
    title: 'UI 典範 2B：現代卡匣表格 · 更新時效優先',
    subtitle: 'Frequency-First Rows: Stream (15s/60s) ➔ Batch (Daily) ➔ Endpoint',
    category: '官方微調',
    description: '卡匣表格介面，但第一層改以「資料更新頻率與即時性 (秒級即時 vs 每日批次)」排序，極度利於即時監控系統開發。',
    tags: ['官方微調版', '更新頻率優先', '即時串流', '時效分級'],
    accentColor: '#0ea5e9',
    componentName: 'TDXModernTableUI',
    author: '即時串流架構組',
    version: 'v2.6.5',
    hierarchyGroup: 'ui-modern-table',
    hierarchyVariant: '更新時效優先 (Frequency ➔ Theme ➔ Card Row)',
    metrics: [
      { label: '秒級即時', value: '15~60秒', change: 'A1/A2/N1' },
      { label: '定時批次', value: '每日/每月', change: '靜態圖資' },
      { label: 'MQTT 支援', value: '秒級廣播', change: '低延遲' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '更新頻率與時效性 (Update Frequency)',
        tag: '第一層 (即時性分級)',
        description: '將資料分為「秒級即時(15s~60s)」、「分鐘級(5m~30m)」、「批次靜態(每日/不定時)」。',
        examples: ['秒級即時 (15~60秒)', '定時批次 (每日/每小時)', '歷史檔案庫'],
      },
      level2: {
        name: '業務領域與運具 (Domain / Transit)',
        tag: '第二層 (運具領域)',
        description: '在特定頻率層級下，選擇公車、鐵路、路況或天候海象。',
        examples: ['公車動態', '鐵路即時誤點', 'CCTV 串流'],
      },
      level3: {
        name: '端點卡片與連線協議 (API & Protocol)',
        tag: '第三層 (連線端點)',
        description: '標明支援 RESTful Polling 或 MQTT 串流訂閱。',
        examples: ['MQTT WebSocket', 'RESTful GET with OData'],
      },
      rationale:
        '時效優先架構的理由：在建立即時交通戰情、車隊即時調度或告警推播時，工程師最關心的是「資料延遲度與刷新成本」。將時效性作為第一層，可避免誤用高延遲的批次資料做即時決策。',
      advantages: [
        '即時性一目了然：秒級即時與每日批次涇渭分明',
        '節省伺服器輪詢成本：避免用高頻率 Polling 抓取每日才更新的資料',
        '精準對接架構：幫助架構師決定採用 Webhook/MQTT 還是定時 CronJob',
      ],
    },
    uiLayout: {
      styleName: 'Real-Time Pulse Card Rows (時效脈衝卡匣)',
      layoutFeatures: [
        '每個卡匣上方帶有「動態倒數頻率燈（綠/藍/灰）」',
        '標註 MQTT 支援標章與 WebSocket 快速連線指示',
        '支援依「延遲敏感度」一鍵過濾秒級資料',
      ],
      targetAudience: '物聯網 (IoT) 工程師、車隊監控系統架構師、即時導航開發者。',
      personaBenefits: [
        {
          role: '物聯網/後端即時架構師',
          benefit: '瞬間掌握哪些端點支援秒級即時與 MQTT，快速設計 Pub/Sub 架構。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '以文字與圖示雙重表示頻率，非僅依賴顏色區分',
      ],
    },
  },

  // =========================================================================
  // UI 典範 1B 家族：雙欄直列速查 (Grouped Together)
  // =========================================================================
  {
    id: 'tdx-master-detail-schema',
    title: 'UI 典範 3A：雙欄直列速查 · 主題規格展開版',
    subtitle: 'Split Master-Detail: Theme Tree ➔ Endpoint ➔ Instant Schema/JSON',
    category: '官方微調',
    description: '經典雙欄速查：左側主題清單點選，右側立即無縫展開完整欄位定義與 JSON 範例，免開彈窗！',
    tags: ['雙欄直列', '免開彈窗', '即選即查', '欄位Schema預覽'],
    accentColor: '#06b6d4',
    componentName: 'TDXMasterDetailUI',
    author: '高效率速查研發組',
    version: 'v2.7.0',
    hierarchyGroup: 'ui-master-detail',
    hierarchyVariant: '主題規格直列 (Theme ➔ Endpoint ➔ Schema Inspector)',
    metrics: [
      { label: '查閱步數', value: '0 彈窗', change: '即時' },
      { label: 'Schema可視化', value: '直列展開', change: '直覺' },
      { label: '審核查對效率', value: '+120%', change: '極快' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '服務大類與主題 (Category & Theme)',
        tag: '第一層 (左側側邊欄)',
        description: '基礎服務(213)、加值服務(201)、票證(155)、道安(111)樹狀結構。',
        examples: ['基礎服務', '加值交通治理', '歷史道安主檔'],
      },
      level2: {
        name: '端點清單 Master List (Endpoint List)',
        tag: '第二層 (左中欄清單)',
        description: '該主題下的 API 端點列表，支援鍵盤上下鍵秒速切換。',
        examples: ['南投縣汽車停車績效', '花蓮縣公車原始票證', '宜蘭縣肇事風險'],
      },
      level3: {
        name: '欄位定義與 Response Detail (Schema & Payload)',
        tag: '第三層 (右側檢視面板)',
        description: '右側大面板即時展示 Request 參數、OAS 欄位型別說明與即時 JSON 範例。',
        examples: ['JSON Response Tree', 'OAS Parameters', 'cURL Example'],
      },
      rationale:
        '雙欄直列的主題規格架構理由：工程師在閱讀 API 文件時，頻繁的「打開彈窗 ➔ 關閉彈窗 ➔ 打開下一個」會造成嚴重的視線跳躍與記憶中斷。雙欄佈局讓左側保持目錄上下文，右側即時渲染規格，是業界 IDE 與頂級文件標準。',
      advantages: [
        '零彈窗流暢查閱：連續查閱 10 支 API 免點擊 20 次開關彈窗',
        '即選即看 Schema：欄位型別、是否必填、預設值一覽無遺',
        '支援雙螢幕寬屏：充分利用現代寬螢幕顯示器空間',
      ],
    },
    uiLayout: {
      styleName: 'Split-Pane Master-Detail (雙欄分割速查介面)',
      layoutFeatures: [
        '左右分割 (40% Master / 60% Detail) 雙欄並排佈局',
        '左欄支援關鍵字即時過濾與鍵盤上下箭頭快速導航',
        '右欄即時語法高亮 (Syntax Highlighting) JSON 與 TypeScript Interface',
      ],
      targetAudience: '全端工程師、資料庫架構師、API 規格審查委員。',
      personaBenefits: [
        {
          role: '全端開發工程師',
          benefit: '右側直接複製 TypeScript 型別定義與 JSON 範例，省去手動轉換。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: '資料庫/ETL 工程師',
          benefit: '快速核對各 API 回傳欄位命名規格是否符合資料庫 Schema。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '左右面板各自具備獨立滾動條，互不干擾',
      ],
    },
  },
  {
    id: 'tdx-master-detail-spatial',
    title: 'UI 典範 3B：雙欄直列速查 · 空間行政區劃版',
    subtitle: 'Spatial Master-Detail: City/County ➔ Mode ➔ Endpoint Detail',
    category: '官方微調',
    description: '雙欄速查架構，第一層改以「全臺 22 縣市行政區劃 (六都/各縣市)」為第一主軸，方便地方政府與在地應用快速檢索。',
    tags: ['雙欄直列', '空間行政區', '22縣市直查', '地方政府專用'],
    accentColor: '#14b8a6',
    componentName: 'TDXMasterDetailUI',
    author: '空間地理資訊小組',
    version: 'v2.7.5',
    hierarchyGroup: 'ui-master-detail',
    hierarchyVariant: '空間行政區劃 (City/County ➔ Mode ➔ Schema Inspector)',
    metrics: [
      { label: '涵蓋縣市', value: '22 縣市', change: '全臺涵蓋' },
      { label: '六都端點', value: '450+ 支', change: '高密度' },
      { label: '非六都支援', value: '完整覆蓋', change: '包含離島' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '空間縣市行政區 (City & County)',
        tag: '第一層 (行政空間地理)',
        description: '以全臺 22 縣市（台北市、新北市、台中市、南投縣、金門縣、花蓮縣等）劃分。',
        examples: ['台北市 (Taipei)', '南投縣 (NantouCounty)', '花蓮縣 (HualienCounty)'],
      },
      level2: {
        name: '地方專屬運具 (Local Transit Mode)',
        tag: '第二層 (縣市運具)',
        description: '該縣市管轄之市區公車、路外停車、共享單車、道路安全監控。',
        examples: ['市區公車 A1/A2', '友善停車績效指標', '肇事風險情報家'],
      },
      level3: {
        name: 'API 規格與縣市專用參數 (Local API Specs)',
        tag: '第三層 (端點規格)',
        description: '右側展示該縣市專屬之路徑參數 `{City}` 與回傳範例。',
        examples: ['/basic/v2/Bus/RealTimeNearStop/City/PenghuCounty/{RouteName}'],
      },
      rationale:
        '空間行政區劃架構的理由：地方交通局處、在地公車業者或地方創生團隊，通常只關心「本縣市有哪些可用資料」。以空間縣市為第一層，省去在全量 738 支 API 中反覆尋找特定縣市參數的繁瑣流程。',
      advantages: [
        '地方治理對接精準：各縣市承辦可一鍵查看本縣市所有開放資料清單',
        '縣市 API 差異比對直觀：快速發現哪些縣市有開放停車指標、哪些僅有公車',
      ],
    },
    uiLayout: {
      styleName: 'Spatial Split Master-Detail (空間地理雙欄速查)',
      layoutFeatures: [
        '左側縣市清單帶有行政區分類 (北部/中部/南部/東部/離島)',
        '右側標註該縣市資料是否具備地理坐標 (GPS/WGS84) 支援',
      ],
      targetAudience: '地方政府交通局承辦、在地智慧城市系統商、GIS 地理資訊專家。',
      personaBenefits: [
        {
          role: '地方政府交通處承辦',
          benefit: '一鍵導出本縣市在 TDX 平台發布的所有 API 狀況與覆蓋度。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '縣市名稱具備中文與英譯標準代碼對照',
      ],
    },
  },

  // =========================================================================
  // UI 典範 2 家族：現代 Bento 模組矩陣 (Grouped Together)
  // =========================================================================
  {
    id: 'tdx-bento-matrix-transit',
    title: 'UI 典範 4A：現代 Bento 模組矩陣 · 運具主題維度',
    subtitle: 'Apple-Style Bento: Transit Domains (Road/Rail/Bus/Air) Matrix',
    category: '現代視覺',
    description: '將公路、軌道、公車、微移動、高快速路與空海運 6 大領域封裝為獨立 Bento 模組卡片，以色塊與微動效呈現。',
    tags: ['Bento Grid', '視覺模組化', '運具主題', '更新頻率燈號'],
    accentColor: '#10b981',
    componentName: 'TDXBentoMatrixUI',
    author: '現代視覺設計實驗室',
    version: 'v3.0.0',
    hierarchyGroup: 'ui-bento-matrix',
    hierarchyVariant: '運具領域模組 (Transit Mode ➔ Bento Tile ➔ Live Metrics)',
    metrics: [
      { label: '視覺模組', value: '6 大主題', change: '全景' },
      { label: '即時頻率', value: '10秒-每日', change: '分級' },
      { label: '介面直覺度', value: '98.6%', change: '極佳' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '運輸領域大板塊 (Transit Domain Tiles)',
        tag: '第一層 (Bento 大模組)',
        description: '公路客運、軌道雙鐵、都會公車、綠色微移動、空海運與智慧交通治理 6 大 Bento 磚。',
        examples: ['公車板塊 (224)', '治理板塊 (201)', '道安板塊 (111)'],
      },
      level2: {
        name: '模組核心功能項目 (Sub-Features)',
        tag: '第二層 (磚內功能細項)',
        description: '各 Bento 磚內細分即時到站、靜態班表、車輛偵測、事故主檔。',
        examples: ['即時到站 N1', '行車動態 A1/A2', '事故當事人表二'],
      },
      level3: {
        name: '即時運行指標與端點 (Live Metrics & Endpoints)',
        tag: '第三層 (指標與接口)',
        description: '卡片內部展示即時頻率燈、更新延遲度與一鍵開啟 OpenAPI 規格。',
        examples: ['15秒刷新燈', '1000次/點', 'RESTful API'],
      },
      rationale:
        'Bento 模組運具架構的理由：現代資訊設計借鑑 Apple 與 Linear 的 Bento Grid 理念，將複雜的 738 支 API 轉化為具有高度可讀性、分區鮮明的幾何視覺磚。適合在首頁做全景導覽，降低使用者的心理負擔。',
      advantages: [
        '視覺吸引力極強：打破傳統後台刻板印象，充滿現代科技感',
        '高層長官與非技術人員友善：一眼看懂全臺交通數據整體版圖',
        '響應式適配極佳：在手機、平板與寬螢幕皆能自動重排格點',
      ],
    },
    uiLayout: {
      styleName: 'Linear / Apple Bento Grid (現代模組化 Bento 矩陣)',
      layoutFeatures: [
        '非對稱 Bento 格網排版，主次分明',
        '毛玻璃漸層背景搭配各領域專屬識別色 (Emerald, Cyan, Violet, Amber)',
        '動態數值跳動效果與 Hover 微懸浮 3D 傾斜反饋',
      ],
      targetAudience: '政府決策首長、科技媒體、智慧城市參訪團、現代 UI/UX 設計師。',
      personaBenefits: [
        {
          role: '局處首長 / 貴賓參訪者',
          benefit: '5 秒內理解 TDX 包含哪些龐大交通領域，科技成果展示效果極佳。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: '視覺設計師 / 產品經理',
          benefit: '現代感強烈，易於融入大型智慧城市儀表板與大螢幕簡報。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '大字體指標與高辨識度幾何圖形',
        '觸控螢幕友好，點擊熱區寬大 (Touch Target > 48px)',
      ],
    },
  },
  {
    id: 'tdx-bento-matrix-governance',
    title: 'UI 典範 4B：現代 Bento 模組矩陣 · 智慧治理維度',
    subtitle: 'Governance Bento: Safety/Carbon/Governance KPI Matrix',
    category: '現代視覺',
    description: 'Bento 格網，但第一層改以「智慧治理目標 (零死亡願景、ESG低碳運輸、轉乘空間縫隙、路網績效)」為核心模組。',
    tags: ['Bento Grid', '智慧治理', 'ESG減碳', '道安零死亡'],
    accentColor: '#8b5cf6',
    componentName: 'TDXBentoMatrixUI',
    author: '永續與智慧政策小組',
    version: 'v3.0.5',
    hierarchyGroup: 'ui-bento-matrix',
    hierarchyVariant: '智慧治理維度 (Governance Goal ➔ Policy Bento ➔ KPI Aggregation)',
    metrics: [
      { label: '道安治理', value: '111 支', change: '零死亡目標' },
      { label: 'ESG 綠色', value: '40+ 支', change: '碳存摺' },
      { label: '績效指標', value: '201 支', change: '年/月/日' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '智慧交通治理目標 (Governance Goals)',
        tag: '第一層 (政策政策目標)',
        description: '道路安全零死亡 (Vision Zero)、ESG 綠色低碳通勤、都會轉乘縫隙彌合、路網容量優化。',
        examples: ['道路安全 (Vision Zero)', 'ESG 綠色通勤', '停車空間縫隙'],
      },
      level2: {
        name: '政策評估指標與主題 (KPI Assessment)',
        tag: '第二層 (主題評估指標)',
        description: '肇事風險情報家、事故當事人統計檔、友善停車績效指標。',
        examples: ['JunctionCBI', 'TransferSpaceGap', 'PerformanceIndicatorYear'],
      },
      level3: {
        name: '加值運算端點與演算模型 (AI / Premium Endpoints)',
        tag: '第三層 (演算端點)',
        description: '加值服務 (POST) 與歷史資料庫分析端點。',
        examples: ['/premium/Governance/RoadSafty/...', '/premium/Governance/PublicTransport/...'],
      },
      rationale:
        '智慧治理 Bento 的架構理由：交通政策的終極目標是「安全、永續、平權」。將資料直接映射到政策指標模組，能讓政策制定者與民意代表直接看到數據如何支撐施政 KPI。',
      advantages: [
        '政策對齊度 100%：直接連結 ESG、道安改善與淨零碳排政策目標',
        '引導跨運具整合：打破運具本位主義，從整體治理效益出發',
      ],
    },
    uiLayout: {
      styleName: 'Policy-Driven Bento Matrix (政策治理 Bento 矩陣)',
      layoutFeatures: [
        '模組標籤標註政策指標代碼與目標年度',
        '內建雷達圖與達成率進度條動效',
      ],
      targetAudience: '永續發展推動委員會、道安會報委員、交通顧問公司、ESG 企業顧問。',
      personaBenefits: [
        {
          role: '道安會報分析師',
          benefit: '直接在道安 Bento 模組調取 A1/A2 事故大數據與路口碰撞模型。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '數據進度條支援語意無障礙標籤',
      ],
    },
  },

  // =========================================================================
  // UI 典範 3 家族：開發者終端與 API 即時沙盒 (Grouped Together)
  // =========================================================================
  {
    id: 'tdx-developer-sandbox-path',
    title: 'UI 典範 5A：開發者沙盒 · RESTful 路徑樹優先',
    subtitle: 'Developer Workspace: RESTful Path Tree ➔ OData Params ➔ Code Gen',
    category: '開發者導向',
    description: '工程師專屬 IDE 工作區：左側 RESTful 端點樹、中段 OData 參數設定、右側自動生成 cURL / TS / Python 代碼與即時 JSON 預覽。',
    tags: ['代碼生成器', 'JSON 即時預覽', 'OData 參數', '工程師極致體驗'],
    accentColor: '#6366f1',
    componentName: 'TDXDeveloperSandboxUI',
    author: 'TDX Developer Relations 小組',
    version: 'v4.1.0',
    hierarchyGroup: 'ui-developer-sandbox',
    hierarchyVariant: 'RESTful 路徑優先 (API Path ➔ OData Query ➔ Code Gen)',
    metrics: [
      { label: '支援語言', value: 'cURL / TS / Py', change: '完整' },
      { label: '測試延遲', value: '14.2 ms', change: '即時' },
      { label: '上手時間', value: '< 5 分鐘', change: '超快' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: 'RESTful API 路徑根目錄 (Resource Path Root)',
        tag: '第一層 (URL 資源根路徑)',
        description: '以 `/basic/v2/Bus`、`/basic/v2/Rail`、`/premium/Governance`、`/ticket/v1` 等標準 URL 路徑劃分。',
        examples: ['/basic/v2/Bus/*', '/premium/Governance/*', '/ticket/v1/*'],
      },
      level2: {
        name: 'OData 查詢參數與 Method (Query & Method)',
        tag: '第二層 (參數調用層)',
        description: '配置 `$top=30`、`$filter`、`$select`、`$format=JSON` 與 POST JSON Body。',
        examples: ['$top=10&$format=JSON', 'POST JSON Payload', '$filter=City eq "Taipei"'],
      },
      level3: {
        name: '多語言程式碼與 Response Sandbox (Code & Response)',
        tag: '第三層 (程式碼與即時回應)',
        description: '自動生成 TypeScript / Python / cURL 代碼並即時執行測試查看 JSON Tree。',
        examples: ['TypeScript Fetch', 'Python Requests', 'Live 200 OK JSON'],
      },
      rationale:
        'RESTful 路徑優先的架構理由：專業後端與前端工程師最習慣遵循 URL Pattern 與 HTTP Method。直接從路徑樹出發，搭配 OData 參數試算，最符合日常 API 串接與 Swagger/Postman 測試的工作流。',
      advantages: [
        '即貼即用：自動產出包含 Token Header 的完整 cURL / TS / Python 程式碼',
        'OData 參數可視化：不用死記 `$top`、`$filter` 語法，直接在 UI 打勾設定',
        '降低串接錯誤：即時沙盒模擬回傳，避免上線後才發現 400 Bad Request',
      ],
    },
    uiLayout: {
      styleName: 'Dark IDE Swagger & Sandbox (暗黑工程師整合工作區)',
      layoutFeatures: [
        'VSCode / JetBrains 風格暗黑終端面板 (#090d16)',
        'Monaco 風格語法高亮編輯器與一鍵複製代碼按鈕',
        '即時 HTTP Status Code (200 OK, 14.2ms) 與 Response Size 監控',
      ],
      targetAudience: '後端工程師、前端架構師、系統整合商、黑客松參賽者。',
      personaBenefits: [
        {
          role: '後端工程師 (Backend Dev)',
          benefit: '直接複製 Python 或 TypeScript 代碼貼入專案，串接時間縮減 80%。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: '黑客松參賽學生',
          benefit: '5 分鐘內看懂 OData 參數並完成第一個 API Request。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '代碼區塊字體採用 JetBrains Mono / Fira Code 等寬字體',
        '清晰的行號與摺疊標記',
      ],
    },
  },
  {
    id: 'tdx-developer-sandbox-format',
    title: 'UI 典範 5B：開發者沙盒 · 數據協議優先',
    subtitle: 'Protocol-First Workspace: Format (JSON/XML/MQTT/CSV) ➔ Endpoint ➔ Sandbox',
    category: '開發者導向',
    description: '沙盒介面，第一層改以「通訊協議與數據載荷格式 (JSON / XML / MQTT WebSocket / CSV / ZIP)」為核心分類。',
    tags: ['代碼生成器', '通訊協議優先', 'MQTT 串流', 'JSON/XML/CSV'],
    accentColor: '#818cf8',
    componentName: 'TDXDeveloperSandboxUI',
    author: '跨協議傳輸架構組',
    version: 'v4.1.5',
    hierarchyGroup: 'ui-developer-sandbox',
    hierarchyVariant: '數據協議優先 (Protocol ➔ Endpoint ➔ Payload Sandbox)',
    metrics: [
      { label: '支援協議', value: 'HTTP / MQTT', change: '雙模' },
      { label: '資料格式', value: 'JSON/XML/CSV', change: '多元' },
      { label: '歷史壓縮檔', value: 'ZIP/CSV', change: '批次' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '傳輸協議與數據格式 (Protocol & Format)',
        tag: '第一層 (協議與載荷)',
        description: 'JSON (680+), XML (200+), CSV (155), MQTT Streaming (50+), ZIP (7)。',
        examples: ['JSON RESTful', 'MQTT WebSocket 廣播', 'CSV/ZIP 批次檔'],
      },
      level2: {
        name: '功能領域與端點 (Domain Endpoints)',
        tag: '第二層 (該協議下之端點)',
        description: '在特定協議下選取對應的 API（如 MQTT 下的 A1 公車動態，或 CSV 下的電子票證）。',
        examples: ['MQTT Bus Stream', 'CSV Ticket Log', 'JSON FriendlyParking'],
      },
      level3: {
        name: '協議專屬客戶端與 Payload 測試 (Client Snippet)',
        tag: '第三層 (協議調用範例)',
        description: '提供 MQTT.js 訂閱代碼、Paho Client 範例或 CSV Parser 代碼。',
        examples: ['MQTT.js Connect Snippet', 'PapaParse CSV Snippet'],
      },
      rationale:
        '數據協議優先架構的理由：針對傳統 GIS 系統（常需 XML/GML）、大數據分析團隊（常需批次 CSV）、或即時儀表（需 MQTT），工程師通常帶著「特定傳輸協議限制」前來。從協議出發可避免挑選到不支援該格式的端點。',
      advantages: [
        '避免格式不相容：第一時間確認哪些端點提供 CSV 或 XML',
        '即時 Pub/Sub 整合：專屬 MQTT 客戶端連線代碼，省去尋找 Broker 的麻煩',
      ],
    },
    uiLayout: {
      styleName: 'Multi-Protocol Developer Terminal (多協議終端工作區)',
      layoutFeatures: [
        '頂部快速切換 JSON / XML / MQTT 標籤頁',
        '內建 MQTT Topic 訂閱監聽即時訊息滾動終端',
      ],
      targetAudience: '大數據工程師、物聯網系統工程師、傳統 GIS/XML 系統維護者。',
      personaBenefits: [
        {
          role: '大數據分析工程師',
          benefit: '快速鎖定提供 CSV 與 ZIP 批量下載的歷史端點進行 ETL 載入。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '終端機滾動條具備暫停與自動跟隨開關',
      ],
    },
  },

  // =========================================================================
  // UI 典範 4 家族：戰情雷達與全景脈衝 (Grouped Together)
  // =========================================================================
  {
    id: 'tdx-command-radar-stream',
    title: 'UI 典範 6A：戰情雷達 · 即時串流優先',
    subtitle: 'Command Center: Real-Time MQTT Stream ➔ Traffic Pulse ➔ SLA',
    category: '戰情監控',
    description: '宏觀全景戰情中樞：中央即時波形雷達、即時吞吐流量計數（2.4億次/日）、MQTT 即時訊息廣播走馬燈與節點延遲監控。',
    tags: ['戰情儀表', 'MQTT 廣播', '吞吐監控', '節點延遲波形'],
    accentColor: '#38bdf8',
    componentName: 'TDXCommandRadarUI',
    author: '智慧城市營運指揮中心',
    version: 'v5.0.0',
    hierarchyGroup: 'ui-command-radar',
    hierarchyVariant: '即時串流優先 (MQTT Stream ➔ Throughput ➔ Node Health)',
    metrics: [
      { label: '日吞吐量', value: '2.4 億次', change: '+38%' },
      { label: 'MQTT 即時率', value: '100%', change: '秒級' },
      { label: '系統可用度', value: '99.99%', change: 'SLA' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '即時數據串流中樞 (Streaming Ingest Hub)',
        tag: '第一層 (全網即時串流)',
        description: '全臺公車、軌道、高快速路 VD、CCTV 與氣象海象即時串流總入口。',
        examples: ['MQTT 廣播流 (秒級)', 'VD 即時車速流', 'CCTV 影像串流'],
      },
      level2: {
        name: '吞吐量與節點分流 (Throughput & Node Distribution)',
        tag: '第二層 (節點與流量分級)',
        description: '監控各區域節點（北區、中區、南區、東區）每秒查詢率 (QPS) 與負載狀態。',
        examples: ['Taipei Node (1.2萬 QPS)', 'Central Node', 'Kaohsiung Node'],
      },
      level3: {
        name: '節點延遲、告警與健康度 (Latency, Alert & SLA)',
        tag: '第三層 (健康度與告警)',
        description: '監控 API 平均延遲 (14.2ms)、SLA 可用度 (99.99%) 與異常事件即時廣播。',
        examples: ['99.99% SLA', '14.2ms Avg Latency', 'CMS 告警推播'],
      },
      rationale:
        '戰情雷達串流架構的理由：在交通指揮中心或大規模連假疏運期間，指揮官需要「全景宏觀脈動」而非細瑣的欄位定義。以即時串流與健康度為第一層，能在 1 秒內辨識全網瓶頸與異常事件。',
      advantages: [
        '宏觀全景掌握：一眼掌握全臺灣 738 支 API 的日吞吐量與健康度',
        '秒級即時告警：MQTT 跑馬燈即時跳出路況通阻與氣象風浪告警',
        '科技感與指揮威懾力：適合智慧城市指揮中心大螢幕 24 小時輪播',
      ],
    },
    uiLayout: {
      styleName: 'Cyberpunk Command Center (賽博朋克戰情指揮中心)',
      layoutFeatures: [
        '中央動態旋轉雷達掃描線與呼吸光環',
        '底部實時跳動折線圖 (吞吐量 QPS 與延遲波動)',
        '頂部 MQTT 實時廣播跑馬燈與 SLA 綠色脈衝指示燈',
      ],
      targetAudience: '交通控制中心值班官、智慧城市指揮官、SRE 維運工程師、展示中心接待。',
      personaBenefits: [
        {
          role: '交通指揮中心值班指揮官',
          benefit: '全局俯瞰全臺交通資訊流通是否正常，若有中斷立即觸發應變措施。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: 'SRE / 雲端維運主管',
          benefit: '即時監控 API 延遲與日吞吐量趨勢，防範伺服器雪崩。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '大螢幕遠距離 (3公尺以上) 仍具備極佳視覺辨識度',
      ],
    },
  },
  {
    id: 'tdx-command-radar-infra',
    title: 'UI 典範 6B：戰情雷達 · 關鍵設施優先',
    subtitle: 'Infra Radar: Critical Assets (Rail/Highway/Ports) ➔ Health ➔ Feed',
    category: '戰情監控',
    description: '戰情雷達架構，第一層改以「關鍵交通基礎設施 (高鐵雙鐵、國道公路、國際空港港口)」為雷達監控主幹。',
    tags: ['戰情儀表', '關鍵設施', '雙鐵/國道/空港', '防災應變'],
    accentColor: '#0284c7',
    componentName: 'TDXCommandRadarUI',
    author: '國家關鍵基礎設施防護組',
    version: 'v5.0.5',
    hierarchyGroup: 'ui-command-radar',
    hierarchyVariant: '關鍵設施優先 (Infra Asset ➔ Transport Network ➔ Live Feed)',
    metrics: [
      { label: '關鍵設施', value: '4 大樞紐', change: '雙鐵/國道/空海' },
      { label: '防災連動', value: '氣象/地牛', change: '即時' },
      { label: '監控端點', value: '100+ 支', change: '關鍵' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '國家關鍵交通基礎設施 (Critical Infrastructure)',
        tag: '第一層 (關鍵設施樞紐)',
        description: '高鐵與台鐵主幹線、國道高速公路網、桃園/松山國際機場、主要商港。',
        examples: ['高鐵/台鐵樞紐', '國道 1/3/5 號路網', '國際空港與海運'],
      },
      level2: {
        name: '各設施即時運行狀態 (Operational Status)',
        tag: '第二層 (設施運作狀態)',
        description: '列車準點率、國道車速/旅行時間、航班起降 FIDS、海象浪高。',
        examples: ['準點率 99.4%', '國道平均車速 85km/h', '航班準點率'],
      },
      level3: {
        name: 'API 數據饋送源與備援鏈路 (Data Feed & Redundancy)',
        tag: '第三層 (數據源與備援)',
        description: '連接對應的 TDX 基礎與進階端點，監控數據饋送延遲與備援狀態。',
        examples: ['TRA Live Delay Feed', 'Freeway VD Speed Feed'],
      },
      rationale:
        '關鍵設施優先的架構理由：在天然災害（颱風、地震）或國家重大活動期間，防救災中心最關注的是「骨幹交通設施是否暢通」。將設施置於第一層，便於第一時間調派資源疏運。',
      advantages: [
        '防救災與重大疏運專用：快速掌握疏運骨幹運行狀況',
        '跨運具聯防：結合雙鐵、國道與天候資訊進行多維度綜合研判',
      ],
    },
    uiLayout: {
      styleName: 'Critical Infrastructure Radar (關鍵基礎設施雷達儀表)',
      layoutFeatures: [
        '以四大設施為象限劃分，支援單鍵聚焦特定樞紐',
        '天候與地震即時聯動紅黃警戒燈號',
      ],
      targetAudience: '應變中心指揮官、民防與交通疏運應變小組。',
      personaBenefits: [
        {
          role: '重大疏運應變指揮官',
          benefit: '連假期間快速比對國道車速與雙鐵座位，協同公運即時增班。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '警報狀態具備閃爍與文字標示雙重提示',
      ],
    },
  },

  // =========================================================================
  // UI 典範 5 家族：極速指令與搜尋中樞 (Grouped Together)
  // =========================================================================
  {
    id: 'tdx-command-palette-fuzzy',
    title: 'UI 典範 7A：極速指令 · 全域模糊檢索',
    subtitle: 'Raycast / Spotlight Search: Global Fuzzy Index ➔ Smart Tags ➔ 1-Step',
    category: '極速檢索',
    description: '效率導向極簡搜尋：大搜尋列即時模糊過濾、快捷標籤分類、雙欄端點清單與詳細規格面板、一鍵複製端點 URL。',
    tags: ['Spotlight', 'Cmd+K 搜尋', '極速過濾', '無繁瑣層級'],
    accentColor: '#a855f7',
    componentName: 'TDXCommandPaletteUI',
    author: '極簡效率設計小組',
    version: 'v2.2.0',
    hierarchyGroup: 'ui-command-palette',
    hierarchyVariant: '全域模糊檢索 (Fuzzy Index ➔ Smart Tag ➔ 1-Step Endpoint)',
    metrics: [
      { label: '檢索速度', value: '< 10 ms', change: '即時' },
      { label: '索引端點', value: '738 支', change: '全覆蓋' },
      { label: '操作步數', value: '1 步抵達', change: '最快' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '全域語意與關鍵字索引 (Global Search Index)',
        tag: '第一層 (全域搜尋索引)',
        description: '將 738 支 API 的名稱、路徑、描述、縣市、主題建立全內存模糊搜尋索引。',
        examples: ['打字輸入「公車」', '輸入「南投 停車」', '輸入「A1 事故」'],
      },
      level2: {
        name: '智慧標籤與權重過濾 (Smart Filter Tags)',
        tag: '第二層 (標籤群組過濾)',
        description: '點選 `#免審核`、`#即時秒級`、`#交通治理`、`#POST` 快速縮小範圍。',
        examples: ['#免審核基礎 (213)', '#加值服務 (201)', '#秒級即時'],
      },
      level3: {
        name: '1-Step 端點規格與直接複製 (Direct Endpoint Detail)',
        tag: '第三層 (直接抵達端點)',
        description: '單擊或按 Enter 立即複製 API Path 或於右側預覽完整規格。',
        examples: ['一鍵複製 /basic/v2/Bus/RealTimeNearStop', '直接開啟 OAS'],
      },
      rationale:
        '全域模糊搜尋架構的理由：現代開發者普遍推崇 Raycast 與 Spotlight 的「0 繁瑣層級、1 步直達」哲學。當平台端點高達 738 支時，逐層點選目錄可能需要點擊 4~5 次；透過全域模糊檢索，輸入 2~3 個字即可在 10 毫秒內精準定位目標。',
      advantages: [
        '極致檢索速度：< 10ms 內存模糊過濾，毫無卡頓',
        '最少操作步數：從搜尋到複製 URL 僅需「打字 ➔ 按 Enter」',
        '容錯率高：支援中英混雜、拼音縮寫與路徑片段搜尋',
      ],
    },
    uiLayout: {
      styleName: 'Raycast / Spotlight Command Palette (極速指令列與搜尋中樞)',
      layoutFeatures: [
        '居中懸浮巨型搜尋輸入框 (帶有 Cmd+K / Ctrl+K 提示)',
        '快速篩選標籤膠囊 (Pill Tags) 與即時匹配筆數顯示',
        '雙欄即時清單，支援鍵盤上下鍵秒速預覽右側規格',
      ],
      targetAudience: '資深工程師、鍵盤流重度使用者、效率狂熱者。',
      personaBenefits: [
        {
          role: '資深架構師 / 開發者',
          benefit: '完全不需摸索複雜目錄，打字「停車指標」立刻拿到 API 網址。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '100% 鍵盤可操作 (Keyboard Accessible)，免用滑鼠',
        '焦點自動鎖定於搜尋框',
      ],
    },
  },
  {
    id: 'tdx-command-palette-tier',
    title: 'UI 典範 7B：極速指令 · 權限與計費篩選',
    subtitle: 'Quota-First Palette: Policy (Free / Points) ➔ Domain ➔ 1-Step',
    category: '極速檢索',
    description: '指令列搜尋介面，第一層改以「計費政策與額度權限 (免審核 1000次/點 vs 專案授權 500點)」為篩選主軸。',
    tags: ['Spotlight', '計費篩選', '免審核優先', '點數透明'],
    accentColor: '#9333ea',
    componentName: 'TDXCommandPaletteUI',
    author: '商業營運與計費推廣組',
    version: 'v2.2.5',
    hierarchyGroup: 'ui-command-palette',
    hierarchyVariant: '權限計費優先 (Charge Policy ➔ Domain ➔ 1-Step Endpoint)',
    metrics: [
      { label: '免審核基礎', value: '213 支', change: '0 門檻' },
      { label: '計次計量', value: '1000次/點', change: '透明' },
      { label: '專案特許', value: '185 支', change: '進階' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '計費政策與審核門檻 (Billing & Auth Policy)',
        tag: '第一層 (計費與授權門檻)',
        description: '免審核公開 (213)、需會員申請 (340+)、機敏專案授權 (185)。',
        examples: ['免費/免審核 (213)', '標準計點 (1000次/點)', '專案特許 (500點/次)'],
      },
      level2: {
        name: '業務領域與運具 (Domain Filter)',
        tag: '第二層 (領域分類)',
        description: '在特定計費類別下，以關鍵字檢索公車、鐵路、道安或氣象。',
        examples: ['免審核下的公車', '標準計點下的交通治理'],
      },
      level3: {
        name: '端點詳細點數規則與呼叫限制 (Charge Spec & Limit)',
        tag: '第三層 (計費細則)',
        description: '展示計次（1000次/1點）、計量（100MB/1點）與每日 Quota 扣抵說明。',
        examples: ['ChargeBaseNumber: 1000', 'ChargePoint: 1.0'],
      },
      rationale:
        '權限計費優先的架構理由：企業在評估商業產品導入 TDX 時，「API 調用成本與審核時間」是最大考量因素。透過計費篩選指令列，能立即篩選出「零審核成本、可直接上線」的端點組合。',
      advantages: [
        '商業成本透明：清楚掌握每支 API 的扣點計費權重',
        '加速 PoC 開發：第一時間鎖定免審核端點快速完成概念驗證',
      ],
    },
    uiLayout: {
      styleName: 'Billing-Focused Command Palette (計費政策指令中樞)',
      layoutFeatures: [
        '頂部快速切換「免審核即用 / 標準計點 / 專案申請」三大標籤',
        '列表右側清晰標註每支 API 扣點比率',
      ],
      targetAudience: '新創公司技術長 (CTO)、商業開發 (BD)、專案預算編列人員。',
      personaBenefits: [
        {
          role: '新創技術長 / CTO',
          benefit: '評估商業 App 營運成本，優先挑選免審核或低點數 API 組合。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '點數規則具備直觀文字說明，免算數學公式',
      ],
    },
  },

  // =========================================================================
  // UI 典範 6 家族：生活情境與服務套件導引 (Grouped Together)
  // =========================================================================
  {
    id: 'tdx-scenario-journey-life',
    title: 'UI 典範 8A：情境導引 · 生活出行場景',
    subtitle: 'Scenario Solution Bundles: Commute / Highway / ESG / Intermodal',
    category: '情境導引',
    description: '依開發目的（連假國道、雙北公車捷運轉乘、ESG 低碳存摺、空海聯運）一鍵打包整組所需 API 藍圖與資料格式。',
    tags: ['情境套件', '一鍵打包', '落地解決方案', '跨運具組合'],
    accentColor: '#22c55e',
    componentName: 'TDXScenarioJourneyUI',
    author: '產業應用推廣小組',
    version: 'v1.5.0',
    hierarchyGroup: 'ui-scenario-journey',
    hierarchyVariant: '生活出行場景 (Life Scenario ➔ Subprocess ➔ Solution Bundle)',
    metrics: [
      { label: '預裝情境包', value: '4 大熱門套組', change: '持續擴充' },
      { label: '開發省時', value: '縮短 70%', change: '大幅加速' },
      { label: '藍圖整合', value: '1-Click Export', change: '便利' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '日常生活出行情境 (Life Mobility Scenario)',
        tag: '第一層 (生活出行情境)',
        description: '都會無縫公車捷運轉乘、連假國道返鄉路況助手、企業 ESG 低碳通勤存摺、全臺機場高鐵海運聯運。',
        examples: ['都會公車捷運轉乘', '連假國道返鄉助手', '企業 ESG 減碳存摺'],
      },
      level2: {
        name: '情境子流程與跨運具環節 (Scenario Subprocesses)',
        tag: '第二層 (業務流程步驟)',
        description: '公車即時到站 ➔ 捷運列車進站 ➔ YouBike 樁位接駁 ➔ 步行圖資導航。',
        examples: ['公車即時到站 (N1)', '車廂負載熱圖', 'YouBike 2.0 車位'],
      },
      level3: {
        name: '打包 API 解決方案套件 (1-Click Solution Bundle)',
        tag: '第三層 (打包藍圖套件)',
        description: '一鍵打包該情境所需的 4~6 支 API 端點 URL、OpenAPI JSON 與預估開發天數。',
        examples: ['1-Click 導出 JSON 藍圖', '預估 3 天可上線'],
      },
      rationale:
        '生活情境導引的架構理由：對於不熟悉 738 支 API 的非交通專業開發者（如企業內部 ESG 團隊或跨國新創），讓他們從零搜尋「哪些 API 能組合出轉乘功能」門檻極高。以生活場景直接打包完整藍圖，能大幅將開發評估期由數週縮短至數天。',
      advantages: [
        '跨運具一鍵打包：解決方案導向，免去逐一搜尋 5 種不同運具 API',
        '降低開發門檻：提供端到端情境藍圖與預估開發天數',
        '促進跨界創新：加速 ESG、旅遊、智慧零售等多元產業落地應用',
      ],
    },
    uiLayout: {
      styleName: 'Interactive Scenario Journey (互動式情境藍圖套件卡)',
      layoutFeatures: [
        '四大熱門生活情境切換按鈕，搭配情境色彩與生活化圖示 (Bus, Car, Bike, Plane)',
        '中間展示該情境包含之跨運具 API 組合清單與更新頻率',
        '底部「一鍵匯出完整情境藍圖 (Export Bundle)」按鈕與開發時程評估',
      ],
      targetAudience: '新創產品經理、企業 ESG 數位轉型團隊、智慧城市解決方案業務。',
      personaBenefits: [
        {
          role: '企業 ESG 數位轉型負責人',
          benefit: '直接採用「企業 ESG 低碳通勤存摺」套件，立即拿到所需全部計算端點。',
          suitability: '高度推薦 ★★★★★',
        },
        {
          role: '新創專案經理 (Startup PM)',
          benefit: '拿著完整情境藍圖直接向投資人或團隊說明產品架構與所需 API。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '生活化語言描述，完全去除晦澀行政術語',
        '視覺色彩與運具圖示強關聯，直覺易懂',
      ],
    },
  },
  {
    id: 'tdx-scenario-journey-biz',
    title: 'UI 典範 8B：情境導引 · 產業落地目標',
    subtitle: 'Business Journey: Industry Goal (Logistics/Tourism/MaaS) ➔ Bundle',
    category: '情境導引',
    description: '情境導引介面，第一層改以「商用產業落地目標 (冷鏈智慧物流、跨境智慧觀光、MaaS 訂票導訂、無人車隊調度)」為核心。',
    tags: ['情境套件', '產業落地', '商用物流', 'MaaS訂票'],
    accentColor: '#16a34a',
    componentName: 'TDXScenarioJourneyUI',
    author: '產業數位轉型輔導組',
    version: 'v1.5.5',
    hierarchyGroup: 'ui-scenario-journey',
    hierarchyVariant: '產業落地目標 (Industry Goal ➔ Business Module ➔ Solution Blueprint)',
    metrics: [
      { label: '商用解決方案', value: '4 大產業', change: '落地' },
      { label: 'MaaS 整合', value: '台鐵/轉運站', change: '導訂' },
      { label: '商業評估', value: '即刻落地', change: '加速' },
    ],
    dataHierarchy: {
      tierCount: 3,
      level1: {
        name: '商用產業落地目標 (Industry Business Goal)',
        tag: '第一層 (產業商用目標)',
        description: '冷鏈智慧物流調度、跨境智慧觀光行程、MaaS 跨運具訂票導訂、無人接駁車隊監控。',
        examples: ['智慧物流車隊調度', 'MaaS 訂票導訂服務', '智慧觀光深度遊'],
      },
      level2: {
        name: '商業功能模組 (Business Function Modules)',
        tag: '第二層 (商用功能模組)',
        description: '省道路況 eTag 旅行時間、臺北轉運站訂票導訂、景點氣象觀測、海運智慧航路。',
        examples: ['臺北轉運站訂票導訂 (2)', '東亞智慧航路 (7)', '觀光景點服務 (10)'],
      },
      level3: {
        name: '商業 API 套件與授權規格 (Commercial API Suite)',
        tag: '第三層 (商用 API 套組)',
        description: '打包商業合約專用端點、計量扣點政策與技術對接規格書。',
        examples: ['/ticket/v1/Ticket/Bus/...', '/cwb/api/v1/MED/product/...'],
      },
      rationale:
        '產業落地導引的架構理由：交通部推動 TDX 的核心目標之一是「賦能產業數位轉型」。針對物流、觀光與運輸票證業者，提供專屬的產業套件藍圖，能直接帶動產業商業價值。',
      advantages: [
        '商業對接精準：直擊物流業省道 eTag、觀光業景點海象、票證業訂票導訂痛點',
        '加速產業數位轉型：提供標準化商用 API 組合包',
      ],
    },
    uiLayout: {
      styleName: 'Enterprise Business Blueprint (企業商用藍圖導引)',
      layoutFeatures: [
        '以商業價值與產業分類為主要導覽維度',
        '內建商業回報率 (ROI) 與上線時程評估表',
      ],
      targetAudience: '物流車隊營運長、旅行社數位長、MaaS 平台營運商、科技顧問。',
      personaBenefits: [
        {
          role: '物流車隊營運總監',
          benefit: '打包省道 VD 車速與 eTag 配對時間，優化貨運配送路徑。',
          suitability: '高度推薦 ★★★★★',
        },
      ],
      accessibilityHighlights: [
        '清晰的商業術語與對接流程圖解',
      ],
    },
  },
];
