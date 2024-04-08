import { useGetSettlementProcessById } from '@/entities/SettlementProcess';

export const useSettlementProcessInfo = (id: string) => {
  const {
    data: settlementProcess,
    isLoading,
    isFetching,
    error
  } = useGetSettlementProcessById({ id });

  const loading = isLoading || isFetching;

  return {
    settlementProcess,
    loading,
    error
  };
};
