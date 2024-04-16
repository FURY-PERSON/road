import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateSettlementProcess, useGetActiveSettlementProcess } from '@/entities/Settlement';
import { routes } from '@/shared/constant/router';

export const useStartSettlementProcess = () => {
  const navigate = useNavigate();

  const { data: activeProcess, isLoading, isFetching, error } = useGetActiveSettlementProcess();
  const [startProcessAction] = useCreateSettlementProcess();

  const startProcess = useCallback(async () => {
    const result = await startProcessAction().unwrap();

    navigate(routes.settlementProcess(result.id));
  }, [navigate, startProcessAction]);

  const loading = isLoading || isFetching;

  return {
    activeProcess,
    startProcess,
    loading,
    error
  };
};
