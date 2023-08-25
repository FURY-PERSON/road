import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsDetailsCommentsLoading = (state: StateSchema) =>
  state.newsDetailsComments?.isLoading;
