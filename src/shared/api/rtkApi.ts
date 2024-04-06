import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from '@/shared/constant/localstorage';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Expose-Headers': '*'
    },
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  tagTypes: ['notifications', 'newsFeedback', 'user', 'block', 'blockSanitaryVisits', 'room'],
  endpoints: (builder) => ({})
});

export const settlementRtkApi = createApi({
  reducerPath: 'settlementRtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __SETTLEMENT_API__,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Expose-Headers': '*'
    },
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  tagTypes: ['settlementProcess', 'studentSettlement'],
  endpoints: (builder) => ({})
});
