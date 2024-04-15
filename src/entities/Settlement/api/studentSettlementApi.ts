import decamelizeKeys from 'decamelize-keys';
import camelcaseKeys from 'camelcase-keys';

import { settlementRtkApi } from '@/shared/api/rtkApi';

import { StudentSettlement } from '../model/types/studentSettlement';
import { StudentInfo } from '../model/types/student';

interface GetStudentInfoByIdArgs {
  studentId: string;
}

interface GetStudentSettlementsByProcessArgs {
  processId: string;
}

interface GetStudentSettlementByStudentIdArgs {
  studentId: string;
}

interface StudentSettlementUpdate {
  studentId: string;
  dormId?: string;
  roomId?: string;
}

const studentSettlementApi = settlementRtkApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentInfoById: build.query<StudentInfo, GetStudentInfoByIdArgs>({
      providesTags: ['studentSettlement', 'settlementProcess'],
      query: (args) => `students/${args.studentId}`,
      transformResponse: (body: any) => camelcaseKeys(body)
    }),
    getStudentSettlements: build.query<StudentSettlement[], void>({
      providesTags: ['studentSettlement'],
      query: () => 'settlement/students',
      transformResponse: (body: any) => body.map((obj) => camelcaseKeys(obj))
    }),
    getStudentSettlementByStudentId: build.query<
      StudentSettlement,
      GetStudentSettlementByStudentIdArgs
    >({
      providesTags: ['studentSettlement'],
      query: (args) => `settlement/students/${args.studentId}`
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

export const useGetStudentInfoById = studentSettlementApi.useGetStudentInfoByIdQuery;

export const useGetStudentSettlements = studentSettlementApi.useGetStudentSettlementsQuery;

export const useGetStudentSettlementByStudentId =
  studentSettlementApi.useGetStudentSettlementByStudentIdQuery;

export const useGetStudentSettlementsByProcess =
  studentSettlementApi.useGetStudentSettlementsByProcessQuery;

export const useRejectStudentSettlement = studentSettlementApi.useRejectStudentSettlementMutation;

export const useUpdateStudentSettlement = studentSettlementApi.useUpdateStudentSettlementMutation;
