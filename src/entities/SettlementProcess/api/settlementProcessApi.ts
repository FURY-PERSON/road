import camelcaseKeys from 'camelcase-keys';

import { settlementRtkApi } from '@/shared/api/rtkApi';

import { SettlementProcess } from '../model/types/settlementProcess';
import { SettlementProcessState } from '../model/constants/settlementProcess';

const settlementProcessApi = settlementRtkApi.injectEndpoints({
  endpoints: (build) => ({
    getSettlementProcesses: build.query<SettlementProcess[], void>({
      providesTags: ['settlementProcess'],
      query: () => 'settlement/processes',
      transformResponse: (body: any) => body.map((obj) => camelcaseKeys(obj)).reverse()
    }),
    getActiveSettlementProcess: build.query<SettlementProcess, void>({
      providesTags: ['settlementProcess'],
      query: () => 'settlement/processes/active'
    }),
    createSettlementProcess: build.mutation<void, void>({
      invalidatesTags: ['settlementProcess', 'studentSettlement'],
      query: () => ({
        url: 'settlement/processes',
        method: 'POST'
      })
    }),
    updateSettlementProccessState: build.mutation<
      SettlementProcess,
      { processId: string; state: SettlementProcessState }
    >({
      invalidatesTags: ['settlementProcess', 'studentSettlement'],
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

export const useGetSettlementProcesses = settlementProcessApi.useGetSettlementProcessesQuery;

export const useGetActiveSettlementProcess =
  settlementProcessApi.useGetActiveSettlementProcessQuery;

export const useUpdateSettlementProcessState =
  settlementProcessApi.useUpdateSettlementProccessStateMutation;

export const useCreateSettlementProcess = settlementProcessApi.useCreateSettlementProcessMutation;
