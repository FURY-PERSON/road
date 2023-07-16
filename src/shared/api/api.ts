/* import { appStore } from 'app/providers/StoreProvider/ui/StoreProvider'; */
import axios from 'axios';
import { AuthTokens, User, userActions } from '@/entities/User';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from '@/shared/constant/localstorage';

interface RefreshResponse {
  user: User,
  tokens: AuthTokens
}

export const api = axios.create({
  baseURL: __API__,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: undefined,
    'Access-Control-Expose-Headers': '*',
  },
});

api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

  // eslint-disable-next-line no-param-reassign
  // @ts-expect-error axios type error
  // eslint-disable-next-line no-param-reassign
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
  };

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);

      if (refreshToken && accessToken) {
        const response = await axios.post<RefreshResponse>('api/auth/refresh', {
          accessToken, refreshToken,
        });

        if (response) {
/*           appStore.dispatch(userActions.setAuthData(response.data.tokens));
          appStore.dispatch(userActions.setUserData(response.data.user)); */
          return api.request(originalRequest);
        }
      } else {
        window.location.hash = '#/login';
      }
    }
    throw error;
  },
);
