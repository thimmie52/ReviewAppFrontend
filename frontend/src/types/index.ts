// src/types/index.ts
export interface AppData {
  name: string;
  install_count: string;
  score: number;
  review_count: number;
  image: string;
  positive_reviews: number;
  negative_reviews: number;
  trust_score: number;
  top_complaints: string[];
  top_praises: string[];
  summary: string;
}

export interface ComparisonResponse {
  app1: AppData;
  app2: AppData;
}