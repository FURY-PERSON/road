import { rtkApi } from '@/shared/api/rtkApi';

import { Block } from '../model/types/block';
import { SanitaryVisit } from '../model/types/sanitaryVisit';

const blockApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getBlocks: build.query<Block[], void>({
      providesTags: ['block'],
      query: () => '/block'
    }),

    getBlockInfo: build.query<Block, { blockId: string }>({
      providesTags: ['block'],
      query: (args) => ({
        url: `block/${args.blockId}`
      })
    }),

    getBlockSanitaryVisits: build.query<SanitaryVisit[], { blockId: string }>({
      providesTags: ['blockSanitaryVisits'],
      query: (args) => ({
        url: `block/sanitaryVisit/${args.blockId}`
      })
    }),

    createBlockSanitaryVisit: build.mutation<SanitaryVisit, { blockId: string; date: string }>({
      invalidatesTags: ['blockSanitaryVisits'],
      query: (args) => ({
        url: 'block/sanitaryVisit',
        method: 'POST',
        body: {
          blockId: args.blockId,
          date: args.date
        }
      })
    }),

    updateBlockSanitaryVisitMark: build.mutation<
      SanitaryVisit,
      { markId: string; mark: number | null }
    >({
      invalidatesTags: ['blockSanitaryVisits'],
      query: (args) => ({
        url: `block/sanitaryMark/${args.markId}`,
        method: 'PUT',
        body: {
          mark: args.mark
        }
      })
    })
  }),
  overrideExisting: false
});

export const getBlocks = blockApi.endpoints.getBlocks.initiate;

export const useGetBlockInfo = blockApi.useGetBlockInfoQuery;
export const refetchBlockInfo = blockApi.util.invalidateTags(['block']);

export const useGetBlockSanitaryVisits = blockApi.useGetBlockSanitaryVisitsQuery;
export const refetchBlockSAnitaryVisits = blockApi.util.invalidateTags(['blockSanitaryVisits']);

export const useBlockSanitaryVisitMutation = blockApi.useCreateBlockSanitaryVisitMutation;
export const createBlockSanitaryVisit = blockApi.endpoints.createBlockSanitaryVisit.initiate;

export const useBlockSanitaryVisitMarkMutation = blockApi.useUpdateBlockSanitaryVisitMarkMutation;
