export type CategoryType =
  | '官方還原'
  | '官方微調'
  | '現代視覺'
  | '開發者導向'
  | '戰情監控'
  | '極速檢索'
  | '情境導引'
  | '平臺全覽'
  | '智慧交通'
  | '即時路況'
  | '大眾運輸'
  | '低碳永續'
  | 'AI調度'
  | '自訂展示';

export type ActionType = 'like' | 'pass' | 'detailed_review';

export interface DataHierarchyLevel {
  name: string;
  tag: string;
  description: string;
  examples?: string[];
}

export interface DataHierarchyInfo {
  tierCount: number; // Maximum 3 tiers
  level1: DataHierarchyLevel;
  level2: DataHierarchyLevel;
  level3: DataHierarchyLevel;
  rationale: string; // 為什麼這樣排？資料面的優點與特性論述
  advantages: string[]; // 資料面優點列表
}

export interface PersonaBenefit {
  role: string;
  benefit: string;
  suitability: string; // 例如: '高度推薦 ★★★★★', '極佳 ★★★★☆'
}

export interface UILayoutInfo {
  styleName: string; // UI 排版風格 (例如: Classic Enterprise, Bento Grid, Master-Detail)
  layoutFeatures: string[]; // 排版佈局與互動特點
  targetAudience: string; // 這組走秀對哪類人最友善
  personaBenefits: PersonaBenefit[]; // 各角色友善度詳細說明
  accessibilityHighlights: string[]; // 易讀性與無障礙亮點
}

export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  description: string;
  tags: string[];
  componentName?: string;
  imageUrl?: string;
  accentColor: string;
  hierarchyGroup?: string; // Grouping identifier (e.g. 'ui-classic-portal')
  hierarchyVariant?: string; // Variant title (e.g. '服務大類優先' vs '運具領域優先')
  dataHierarchy?: DataHierarchyInfo; // 資料面說明 (最多 3 層)
  uiLayout?: UILayoutInfo; // UI 面說明與受眾友善度
  metrics?: {
    label: string;
    value: string;
    change?: string;
  }[];
  author?: string;
  version?: string;
}

export interface Feedback {
  id?: string;
  ui_id: string;
  nickname: string;
  rating: number; // 1 - 5
  review?: string;
  action_type: ActionType;
  tags?: string[];
  created_at?: string;
}

export interface UIStats {
  ui_id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  accentColor: string;
  avgRating: number;
  totalReviews: number;
  likeCount: number;
  passCount: number;
  detailedCount: number;
  ratingDistribution: Record<number, number>; // 1: n, 2: n, ...
  recentReviews: Feedback[];
}

export interface OverallStats {
  totalFeedbacks: number;
  totalLikes: number;
  totalPasses: number;
  totalDetailed: number;
  avgOverallRating: number;
  topRatedUI?: UIStats;
  mostDiscussedUI?: UIStats;
}
