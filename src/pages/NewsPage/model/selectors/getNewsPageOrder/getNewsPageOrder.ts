import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsPageOrder = (state: StateSchema) => state.newsPage?.order;
