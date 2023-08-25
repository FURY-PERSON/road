import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsRecommendations = (state: StateSchema) => state.newsRecommendationList?.items;

export const getNewsRecommendationsLoading = (state: StateSchema) =>
  state.newsRecommendationList?.isLoading;
