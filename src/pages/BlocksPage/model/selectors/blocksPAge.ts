import { StateSchema } from '@/app/providers/StoreProvider';

export const getApiLimit = (state: StateSchema) => state.blocksPage?.limit;

export const getApiPage = (state: StateSchema) => state.blocksPage?.page || 1;

export const getApiHasMore = (state: StateSchema) => state.blocksPage?.hasMore;

export const getInited = (state: StateSchema) => state.blocksPage?._inited;

export const getNumber = (state: StateSchema) => state.blocksPage?.number || '';

export const getOrder = (state: StateSchema) => state.blocksPage?.order || 'ASC';

export const getFloor = (state: StateSchema) => state.blocksPage?.floor;

export const getLoading = (state: StateSchema) => state.blocksPage?.isLoading;

export const getError = (state: StateSchema) => state.blocksPage?.error;
