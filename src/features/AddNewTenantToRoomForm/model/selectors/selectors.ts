import { StateSchema } from '@/app/providers/StoreProvider';

export const getSelectedUserLogin = (state: StateSchema) => state.addNewTenantToRoom?.userLogin;

export const getLoading = (state: StateSchema) => state.addNewTenantToRoom?.isLoading;

export const getError = (state: StateSchema) => state.addNewTenantToRoom?.error;
