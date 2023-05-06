import { StateSchema } from 'app/providers/StoreProvider';

export const getNewsDetailsLoading = (state: StateSchema) => state.newsDetails?.isLoading;
