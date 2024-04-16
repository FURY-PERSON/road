import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserLogin = (state: StateSchema) => state.user.userData?.login;
