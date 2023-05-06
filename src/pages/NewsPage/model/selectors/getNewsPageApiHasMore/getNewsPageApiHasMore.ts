import { StateSchema } from 'app/providers/StoreProvider';

export const getNewsPageApiHasMore = (state: StateSchema) => state.newsPage?.hasMore || false;
