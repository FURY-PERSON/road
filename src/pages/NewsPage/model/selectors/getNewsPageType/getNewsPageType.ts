import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsPageType = (state: StateSchema) => state.newsPage?.type;
