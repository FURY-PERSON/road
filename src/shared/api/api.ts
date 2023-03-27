import axios from 'axios';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from 'shared/constant/localstorage';

export const api = axios.create({
  baseURL: __API__,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: undefined,
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
    'Content-Type': 'application/json',
  };

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      const refreshToken = '';

      if (refreshToken) {
        /*         const response = await AuthController.test({});
        if (response) {
          return api.request(originalRequest);
        } */
      }
    }
    throw error;
  },
);
