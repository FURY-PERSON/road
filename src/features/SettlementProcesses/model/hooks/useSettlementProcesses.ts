import { useGetSettlementProcesses } from '@/entities/SettlementProcess';

export const useSettlementProcesses = () => {
  const { data: settlementProcesses, isLoading, isFetching, error } = useGetSettlementProcesses();

  const loading = isLoading || isFetching;

  return {
    settlementProcesses,
    loading,
    error
  };
};
