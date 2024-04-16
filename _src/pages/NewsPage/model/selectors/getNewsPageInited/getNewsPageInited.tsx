import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewsPageInited = (state: StateSchema) => state.newsPage?._inited;
