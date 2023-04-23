import { News } from 'entities/News';

export interface NewsRecommendationListSchema {
  isLoading?: boolean;
  error?: string,
  items?: News[]
}
