import { rtkApi } from '@/shared/api/rtkApi';

import { Dorm } from '../model/types/dorm';

const dormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getDorms: build.query<Dorm[], void>({
      providesTags: ['dorm'],
      query: () => '/dorm'
    })
  })
});

export const useGetDorms = dormApi.useGetDormsQuery;
