import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterLoading = (state: StateSchema) => state.registerForm?.isLoading;
