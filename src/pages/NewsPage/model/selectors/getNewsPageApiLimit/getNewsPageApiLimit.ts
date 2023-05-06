import { StateSchema } from 'app/providers/StoreProvider';

export const getNewsPageApiLimit = (state: StateSchema) => state.newsPage?.limit || 20;
