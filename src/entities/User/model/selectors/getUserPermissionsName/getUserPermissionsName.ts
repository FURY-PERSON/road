import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserPermissionsName = (state: StateSchema) =>
  state.user.userData?.permissions.map((permission) => permission.name);
