import { rtkApi } from '@/shared/api/rtkApi';

import { User } from '../model/types/user';

interface GetUserArgs {
  login: string;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      providesTags: ['user'],
      query: () => '/users'
    }),
    getUserById: build.query<User, GetUserArgs>({
      providesTags: ['user'],
      query: ({ login }) => ({
        url: `/users/${login}`
      })
    })
  }),
  overrideExisting: false
});

export const useGetAllUsers = userApi.useGetUsersQuery;

export const useGetUser = userApi.useGetUserByIdQuery;
export const refetchUser = userApi.util.invalidateTags(['user']);
