import { rtkApi } from '@/shared/api/rtkApi';

import { Block } from '../model/types/block';
import { SanitaryVisit } from '../model/types/sanitaryVisit';

const blockApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
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

    updateBlockSanitaryVisitMark: build.mutation<SanitaryVisit, { markId: string; mark?: number }>({
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

export const useGetBlockInfo = blockApi.useGetBlockInfoQuery;
export const refetchBlockInfo = blockApi.util.invalidateTags(['block']);

export const useGetBlockSanitaryVisits = blockApi.useGetBlockSanitaryVisitsQuery;
export const refetchBlockSAnitaryVisits = blockApi.util.invalidateTags(['blockSanitaryVisits']);

export const useBlockSanitaryVisitMarkMutation = blockApi.useUpdateBlockSanitaryVisitMarkMutation;
