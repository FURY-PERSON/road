import { rtkApi } from "@/shared/api/rtkApi";

const recommendationListApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNewsRecommendations: build.query({
      query: (limit) => ({
        url: 'news',
        params: {
          limit: limit,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const useGetNewsRecommendations = recommendationListApi.useGetNewsRecommendationsQuery;