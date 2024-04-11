import camelcaseKeys from 'camelcase-keys';

import { settlementRtkApi } from '@/shared/api/rtkApi';

import { SettlementProcess } from '../model/types/settlementProcess';
import { SettlementProcessState } from '../model/constants/settlementProcess';
import { StudentSettlement } from '../model/types/studentSettlement';
import { transformStudentSettlementsToSettlementResult } from '../model/helpers/transformStudentSettlementsToStudentSettlementByDorm';

interface GetSettlementProcessById {
  id: string;
}

interface UpdateSettlementProccessStateArgs {
  processId: string;
  state: SettlementProcessState;
}

interface ApplySettlementProccessState {
  studentSettlement: StudentSettlement[];
}

const settlementProcessApi = settlementRtkApi.injectEndpoints({
  endpoints: (build) => ({
    getSettlementProcesses: build.query<SettlementProcess[], void>({
      providesTags: ['settlementProcess'],
      query: () => 'settlement/processes',
      transformResponse: (body: any) => body.map((obj) => camelcaseKeys(obj))
    }),
    getSettlementProcessById: build.query<SettlementProcess, GetSettlementProcessById>({
      providesTags: ['settlementProcess'],
      query: () => 'settlement/processes',
      transformResponse: (body: any, _, args) =>
        body.map((obj) => camelcaseKeys(obj)).filter((item) => item.id === args.id)[0]
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
      UpdateSettlementProccessStateArgs
    >({
      invalidatesTags: ['settlementProcess', 'studentSettlement'],
      query: (args) => ({
        url: `settlement/processes/${args.processId}`,
        method: 'PATCH',
        body: {
          state: args.state
        }
      })
    }),
    applySettlementProccess: build.mutation<void, ApplySettlementProccessState>({
      invalidatesTags: ['settlementProcess', 'studentSettlement'],
      query: (args) => ({
        url: '',
        method: 'PATCH',
        body: {
          settlement: transformStudentSettlementsToSettlementResult(args.studentSettlement)
        }
      })
    })
  })
});

export const useGetSettlementProcesses = settlementProcessApi.useGetSettlementProcessesQuery;

export const useGetSettlementProcessById = settlementProcessApi.useGetSettlementProcessByIdQuery;

export const useGetActiveSettlementProcess =
  settlementProcessApi.useGetActiveSettlementProcessQuery;

export const useUpdateSettlementProcessState =
  settlementProcessApi.useUpdateSettlementProccessStateMutation;

export const useCreateSettlementProcess = settlementProcessApi.useCreateSettlementProcessMutation;

export const useApplySettlementProccess = settlementProcessApi.useApplySettlementProccessMutation;
