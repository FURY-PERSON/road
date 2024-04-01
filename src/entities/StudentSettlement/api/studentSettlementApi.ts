import decamelizeKeys from 'decamelize-keys';

import { rtkApi } from '@/shared/api/rtkApi';

import { StudentSettlement } from '../model/types/studentSettelement';

interface StudentSettlementUpdate {
  studentId: string;
  dormId?: string;
  roomId?: string;
}

const studentSettlementApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentSettlements: build.query<StudentSettlement[], void>({
      providesTags: ['studentSettlement'],
      query: () => 'settlement/students'
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

export const { useRejectStudentSettlementMutation, useUpdateStudentSettlementMutation } =
  studentSettlementApi;
