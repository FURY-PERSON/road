import { useGetSettlementProcesses } from '@/entities/Settlement';

export const useSettlementProcesses = () => {
  const { data: settlementProcesses, isLoading, isFetching, error } = useGetSettlementProcesses();

  const loading = isLoading || isFetching;

  return {
    settlementProcesses,
    loading,
    error
  };
};
