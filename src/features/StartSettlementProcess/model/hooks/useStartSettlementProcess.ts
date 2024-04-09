import { useCallback } from 'react';

import {
  useCreateSettlementProcess,
  useGetActiveSettlementProcess
} from '@/entities/SettlementProcess';

export const useStartSettlementProcess = () => {
  const { data: activeProcess, isLoading, isFetching, error } = useGetActiveSettlementProcess();
  const [startProcessAction] = useCreateSettlementProcess();

  const startProcess = useCallback(() => {
    startProcessAction();
  }, [startProcessAction]);

  const loading = isLoading || isFetching;

  return {
    activeProcess,
    startProcess,
    loading,
    error
  };
};
