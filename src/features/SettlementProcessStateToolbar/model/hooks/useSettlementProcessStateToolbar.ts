import { useCallback } from 'react';

import {
  SettlementProcessState,
  useApplySettlementProccess,
  useGetActiveSettlementProcess,
  useUpdateSettlementProcessState,
  useGetStudentSettlementsByProcess
} from '@/entities/Settlement';

export const useSettlementProcessStateToolbar = (processId: string) => {
  const {
    data: activeProcess,
    isLoading: activeProcessLoading,
    error: activeProcessError
  } = useGetActiveSettlementProcess();

  const {
    data: studentSettlement,
    isLoading: studentSettlementLoading,
    error: studentSettlementError
  } = useGetStudentSettlementsByProcess({ processId });

  const [setProcessState] = useUpdateSettlementProcessState();
  const [applySettlementProccess] = useApplySettlementProccess();

  const changeProcessState = useCallback(
    (newState: SettlementProcessState) => {
      if (!activeProcess?.id) return;
      return setProcessState({ processId: activeProcess?.id, state: newState });
    },
    [activeProcess?.id, setProcessState]
  );

  const loading = activeProcessLoading || studentSettlementLoading;
  const error = activeProcessError || studentSettlementError;
  const showToolbar = processId === activeProcess?.id;

  return {
    activeProcess,
    studentSettlement,
    changeProcessState,
    showToolbar,
    loading,
    error,
    applySettlementProccess
  };
};
