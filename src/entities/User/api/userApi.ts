import { rtkApi } from '@/shared/api/rtkApi';

import { User } from '../model/types/user';

interface GetUserByLoginArgs {
  login: string;
}

interface GetUserByIdArgs {
  id: string;
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      providesTags: ['user'],
      query: () => '/users'
    }),
    getUserByLogin: build.query<User, GetUserByLoginArgs>({
      providesTags: ['user'],
      query: ({ login }) => ({
        url: `/users/${login}`
      })
    }),
    getUserById: build.query<User, GetUserByIdArgs>({
      providesTags: ['user'],
      query: () => '/users',
      transformResponse: (body: User[], _, args) => body.filter((item) => item.id === args.id)[0]
    })
  }),
  overrideExisting: false
});

export const useGetAllUsers = userApi.useGetUsersQuery;

export const useGetUserByLogin = userApi.useGetUserByLoginQuery;

export const useGetUserById = userApi.useGetUserByIdQuery;

export const refetchUser = userApi.util.invalidateTags(['user']);
