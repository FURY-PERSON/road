import { rtkApi } from '@/shared/api/rtkApi';

import { ScientificWork } from '../model/types/scientificWork';
import { ScientificWorkType } from '../model/constants/scientificWork';

interface GetUserScientificWorksArgs {
  login?: string;
}

interface GetScientificWorkByIdArgs {
  id: string;
}

interface AddScientificWorkArgs {
  login: string;
  title: string;
  type: ScientificWorkType;
  date: string;
}

interface DeleteScientificWorkArgs {
  id: string;
}

interface UpdateScientificWorkArgs {
  id: string;
  login: string;
  title: string;
  type: ScientificWorkType;
  date: string;
}

const scientificWorkApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserScientificWorks: build.query<ScientificWork[], GetUserScientificWorksArgs>({
      providesTags: ['scientificWork'],
      query: ({ login }) => `/scientific-works/user/${login}`
    }),
    getScientificWorkById: build.query<ScientificWork, GetScientificWorkByIdArgs>({
      providesTags: ['scientificWork'],
      query: ({ id }) => ({
        url: `/scientific-works/${id}`
      })
    }),

    addScientificWork: build.mutation<void, AddScientificWorkArgs>({
      invalidatesTags: ['scientificWork'],
      query: (args) => ({
        url: 'scientific-works',
        method: 'POST',
        body: {
          creatorLogin: args.login,
          title: args.title,
          type: args.type,
          date: args.date
        }
      })
    }),

    deleteScientificWork: build.mutation<void, DeleteScientificWorkArgs>({
      invalidatesTags: ['scientificWork'],
      query: (args) => ({
        url: `scientific-works/${args.id}`,
        method: 'DELETE',
        body: {}
      })
    }),

    updateScientificWork: build.mutation<void, UpdateScientificWorkArgs>({
      invalidatesTags: ['scientificWork'],
      query: (args) => ({
        url: `scientific-works/${args.id}`,
        method: 'PUT',
        body: {
          creatorLogin: args.login,
          title: args.title,
          type: args.type,
          date: args.date
        }
      })
    })
  }),
  overrideExisting: false
});

export const useGetUserScientificWorks = scientificWorkApi.useGetUserScientificWorksQuery;

export const useGetScientificWorkById = scientificWorkApi.useGetScientificWorkByIdQuery;

export const refetchScientificWork = scientificWorkApi.util.invalidateTags(['scientificWork']);

export const useAddScientificWork = scientificWorkApi.useAddScientificWorkMutation;

export const useDeleteScientificWork = scientificWorkApi.useDeleteScientificWorkMutation;

export const useUpdateScientificWork = scientificWorkApi.useUpdateScientificWorkMutation;
