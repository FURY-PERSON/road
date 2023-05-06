import { StateSchema } from 'app/providers/StoreProvider';

export const getNewsPageSearch = (state: StateSchema) => state.newsPage?.search;
