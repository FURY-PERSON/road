import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginState = (state: StateSchema) => state.loginForm || {
  isLoading: undefined, password: undefined, login: undefined, error: undefined, 
};
