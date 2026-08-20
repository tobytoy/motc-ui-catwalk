export type CategoryType = '官方還原' | '官方微調' | '現代視覺' | '開發者導向' | '戰情監控' | '極速檢索' | '情境導引' | '平臺全覽' | '智慧交通' | '即時路況' | '大眾運輸' | '低碳永續' | 'AI調度' | '自訂展示';

export type ActionType = 'like' | 'pass' | 'detailed_review';

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
