import { useGetStudentSettlementsByProcess } from '@/entities/StudentSettlement';

export const useStudentSettlementByProcess = (settlementProcessId: string) => {
  const {
    data: studentSettlements,
    isLoading,
    isFetching,
    error
  } = useGetStudentSettlementsByProcess({
    processId: settlementProcessId
  });

  const loading = isLoading || isFetching;

  return {
    studentSettlements,
    loading,
    error
  };
};
