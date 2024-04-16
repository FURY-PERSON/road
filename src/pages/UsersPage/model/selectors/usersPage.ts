import { StateSchema } from '@/app/providers/StoreProvider';
import { UsersRoles, UsersSort } from '@/entities/User';

export const getApiLimit = (state: StateSchema) => state.usersPage?.limit;

export const getApiPage = (state: StateSchema) => state.usersPage?.page || 1;

export const getApiHasMore = (state: StateSchema) => state.usersPage?.hasMore;

export const getInited = (state: StateSchema) => state.usersPage?._inited;

export const getSearch = (state: StateSchema) => state.usersPage?.search || '';

export const getOrder = (state: StateSchema) => state.usersPage?.order || 'ASC';

export const getRole = (state: StateSchema) => state.usersPage?.role || UsersRoles.ALL;

export const getSort = (state: StateSchema) => state.usersPage?.sort || UsersSort.LOGIN;

export const getLoading = (state: StateSchema) => state.usersPage?.isLoading;

export const getError = (state: StateSchema) => state.usersPage?.error;
