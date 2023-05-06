import { StateSchema } from 'app/providers/StoreProvider';

export const getNewsPageLoading = (state: StateSchema) => state.newsPage?.isLoading;
