import { StateSchema } from 'app/providers/StoreProvider';

export const getNewsPageApiPage = (state: StateSchema) => state.newsPage?.page || 1;
