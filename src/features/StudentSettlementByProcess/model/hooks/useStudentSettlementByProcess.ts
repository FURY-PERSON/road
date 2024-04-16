import { useGetSettlementProcessById } from '@/entities/Settlement';

export const useStudentSettlementByProcess = (settlementProcessId: string) => {
  const {
    data: settlementProcess,
    isLoading: settlementProcessLoading,
    isFetching: settlementProcessFetching,
    error: settlementProcessError
  } = useGetSettlementProcessById({ id: settlementProcessId });

  const loading = settlementProcessLoading || settlementProcessFetching;

  const error = settlementProcessError;

  return {
    settlementProcess,
    loading,
    error
  };
};
