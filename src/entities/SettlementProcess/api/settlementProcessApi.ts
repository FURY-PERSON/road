import { rtkApi } from '@/shared/api/rtkApi';

import { SettlementProcess, SettlementProcessState } from '../models/types/settlementProcess';

const settlementProcessApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getActive: build.query<SettlementProcess, void>({
      providesTags: ['settlementProcess'],
      query: () => 'settlement/processes/active'
    }),
    startProcess: build.mutation<void, void>({
      invalidatesTags: ['settlementProcess'],
      query: () => ({
        url: 'settlement/processes',
        method: 'POST'
      })
    }),
    setState: build.mutation<
      SettlementProcess,
      { processId: string; state: SettlementProcessState }
    >({
      invalidatesTags: ['settlementProcess'],
      query: (args) => ({
        url: `settlement/processes/${args.processId}`,
        method: 'PATCH',
        body: {
          state: args.state
        }
      })
    })
  })
});

export const useGetActiveSettlementProcess = settlementProcessApi.useGetActiveQuery;

export const useSetSettlementProcessStateMutation = settlementProcessApi.useSetStateMutation;

export const useStartSettlementProcessMutation = settlementProcessApi.useStartProcessMutation;
