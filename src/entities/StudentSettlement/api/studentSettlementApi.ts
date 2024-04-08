import decamelizeKeys from 'decamelize-keys';
import camelcaseKeys from 'camelcase-keys';

import { settlementRtkApi } from '@/shared/api/rtkApi';

import { StudentSettlement } from '../model/types/studentSettelement';

interface GetStudentSettlementsByProcessArgs {
  processId: string;
}

interface StudentSettlementUpdate {
  studentId: string;
  dormId?: string;
  roomId?: string;
}

const studentSettlementApi = settlementRtkApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentSettlements: build.query<StudentSettlement[], void>({
      providesTags: ['studentSettlement'],
      query: () => 'settlement/students',
      transformResponse: (body: any) => body.map((obj) => camelcaseKeys(obj))
    }),
    getStudentSettlementsByProcess: build.query<
      StudentSettlement[],
      GetStudentSettlementsByProcessArgs
    >({
      providesTags: ['studentSettlement'],
      query: (args) => `settlement/processes/${args.processId}/students`,
      transformResponse: (body: any) => body.map((obj) => camelcaseKeys(obj))
    }),
    updateStudentSettlement: build.mutation<void, StudentSettlementUpdate>({
      invalidatesTags: ['studentSettlement'],
      query: (args) => ({
        url: `settlement/students/${args.studentId}`,
        method: 'PATCH',
        body: decamelizeKeys(args)
      })
    }),
    rejectStudentSettlement: build.mutation<void, string>({
      invalidatesTags: ['studentSettlement'],
      query: (studentId) => ({
        url: `settlement/students/rejected/${studentId}`,
        method: 'POST'
      })
    })
  })
});

export const useGetStudentSettlements = studentSettlementApi.useGetStudentSettlementsQuery;

export const useGetStudentSettlementsByProcess =
  studentSettlementApi.useGetStudentSettlementsByProcessQuery;

export const { useRejectStudentSettlementMutation, useUpdateStudentSettlementMutation } =
  studentSettlementApi;
