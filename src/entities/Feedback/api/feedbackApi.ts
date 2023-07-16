import { rtkApi } from '@/shared/api/rtkApi';
import { Feedback } from '../model/types/feedback';

interface GetNewsFeedbackArgs {
  newsId: string
}

interface CreateNewsFeedbackArgs {
  newsId: string,
  rating: number,
  text?: string
}

const feedbackApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNewsFeedback: build.query<Feedback, GetNewsFeedbackArgs>({
      providesTags: ['newsFeedback'],
      query: ({ newsId }) => ({
        url: `feedback/news/${newsId}/user`,
      }),
      transformResponse(value: Feedback[], meta, arg) {
        return value[0];
      },
    }),

    createNewsFeedback: build.mutation<Feedback, CreateNewsFeedbackArgs>({
      query: (args) => ({
        url: 'news/feedback',
        method: 'POST',
        body: {
          ...args,
          relatedEntityId: args.newsId
        },
      }),
      invalidatesTags: ['newsFeedback']
    }),
  }),
  overrideExisting: false,
});

export const useGetNewsFeedback = feedbackApi.useGetNewsFeedbackQuery;
export const refetchNewsFeedback = feedbackApi.util.invalidateTags(['newsFeedback']);

export const useCreateNewsFeedback = feedbackApi.useCreateNewsFeedbackMutation;
