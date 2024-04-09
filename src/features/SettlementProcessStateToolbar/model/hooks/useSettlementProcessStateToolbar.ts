import { useCallback } from 'react';

import {
  SettlementProcessState,
  useGetActiveSettlementProcess,
  useUpdateSettlementProcessState
} from '@/entities/SettlementProcess';

export const useSettlementProcessStateToolbar = (processId: string) => {
  const {
    data: activeProcess,
    isLoading: activeProcessLoading,
    error: activeProcessError
  } = useGetActiveSettlementProcess();

  const [setProcessState] = useUpdateSettlementProcessState();

  const changeProcessState = useCallback(
    (newState: SettlementProcessState) => () => {
      if (!activeProcess?.id) return;
      return setProcessState({ processId: activeProcess?.id, state: newState });
    },
    [activeProcess?.id, setProcessState]
  );

  const showToolbar = processId === activeProcess?.id;

  return { activeProcess, changeProcessState, showToolbar };
};
