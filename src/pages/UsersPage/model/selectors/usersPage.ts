import { StateSchema } from 'app/providers/StoreProvider';

export const getApiLimit = (state: StateSchema) => state.usersPage?.limit;

export const getApiPage = (state: StateSchema) => state.usersPage?.page || 1;

export const getApiHasMore = (state: StateSchema) => state.usersPage?.hasMore;

export const getInited = (state: StateSchema) => state.usersPage?._inited;

export const getSearch = (state: StateSchema) => state.usersPage?.search;

export const getOrder = (state: StateSchema) => state.usersPage?.order;

export const getRole = (state: StateSchema) => state.usersPage?.role;

export const getSort = (state: StateSchema) => state.usersPage?.sort;

export const getLoading = (state: StateSchema) => state.usersPage?.isLoading;

export const getError = (state: StateSchema) => state.usersPage?.error;
