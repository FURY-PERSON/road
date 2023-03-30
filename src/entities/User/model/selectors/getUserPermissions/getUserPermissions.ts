import { StateSchema } from 'app/providers/StoreProvider';

export const getUserPermissions = (state: StateSchema) => state.user.userData?.permissions;
