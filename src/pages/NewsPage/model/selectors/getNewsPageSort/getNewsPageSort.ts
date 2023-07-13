import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsPageSort = (state: StateSchema) => state.newsPage?.sort;
