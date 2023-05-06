import { StateSchema } from 'app/providers/StoreProvider';

export const getUserRoleName = (state: StateSchema) => state.user.userData?.role.name;
