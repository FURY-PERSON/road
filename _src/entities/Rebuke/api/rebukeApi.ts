import { rtkApi } from '@/shared/api/rtkApi';

import { Rebuke } from '../model/types/rebuke';
import { RebukeType } from '../model/constants/rebuke';

interface GetUserRebukesArgs {
  login?: string;
}

interface GetRebukeByIdArgs {
  id: string;
}

interface AddRebukeArgs {
  login: string;
  note: string;
  type: RebukeType;
  startDate: string;
  endDate: string;
}

interface DeleteRebukeArgs {
  id: string;
}

interface UpdateRebukeArgs {
  id: string;
  note: string;
  type: RebukeType;
  startDate: string;
  endDate: string;
}

const rebukeApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserRebukes: build.query<Rebuke[], GetUserRebukesArgs>({
      providesTags: ['rebuke'],
      query: ({ login }) => `/rebuke/user/${login}`
    }),
    getRebukeById: build.query<Rebuke, GetRebukeByIdArgs>({
      providesTags: ['rebuke'],
      query: ({ id }) => ({
        url: `/rebuke/${id}`
      })
    }),

    addRebuke: build.mutation<void, AddRebukeArgs>({
      invalidatesTags: ['rebuke'],
      query: (args) => ({
        url: 'rebuke',
        method: 'POST',
        body: {
          userLogin: args.login,
          note: args.note,
          type: args.type,
          startDate: args.startDate,
          endDate: args.endDate
        }
      })
    }),

    deleteRebuke: build.mutation<void, DeleteRebukeArgs>({
      invalidatesTags: ['rebuke'],
      query: (args) => ({
        url: `rebuke/${args.id}`,
        method: 'DELETE',
        body: {}
      })
    }),

    updateRebuke: build.mutation<void, UpdateRebukeArgs>({
      invalidatesTags: ['rebuke'],
      query: (args) => ({
        url: `rebuke/${args.id}`,
        method: 'PUT',
        body: {
          note: args.note,
          type: args.type,
          startDate: args.startDate,
          endDate: args.endDate
        }
      })
    })
  }),
  overrideExisting: false
});

export const useGetUserRebukes = rebukeApi.useGetUserRebukesQuery;

export const useGetRebukeById = rebukeApi.useGetRebukeByIdQuery;

export const refetchRebuke = rebukeApi.util.invalidateTags(['rebuke']);

export const useAddRebuke = rebukeApi.useAddRebukeMutation;

export const useDeleteRebuke = rebukeApi.useDeleteRebukeMutation;

export const useUpdateRebuke = rebukeApi.useUpdateRebukeMutation;
