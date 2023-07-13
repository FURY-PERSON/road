import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsPageError = (state: StateSchema) => state.newsPage?.error;
