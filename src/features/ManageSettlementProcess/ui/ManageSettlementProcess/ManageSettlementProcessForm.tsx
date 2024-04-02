import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetActiveSettlementProcess,
  useStartSettlementProcessMutation
} from '@/entities/SettlementProcess';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { StudentSettlementList } from '@/entities/StudentSettlement';

import { SettlementProcessStateToolbar } from './SettlementProcessStateToolbar';

export const ManageSettlementProcessForm = memo(() => {
  const { t } = useTranslation('process');

  const { data: activeProcess, isError } = useGetActiveSettlementProcess();
  const [startProcess] = useStartSettlementProcessMutation();

  if (!activeProcess || isError) {
    return (
      <Button variant="filled" onClick={() => startProcess()}>
        {t('create process')}
      </Button>
    );
  }
  return (
    <VStack gap={32}>
      <SettlementProcessStateToolbar process={activeProcess} />
      <StudentSettlementList settlementProcessState={activeProcess.state} />
    </VStack>
  );
});
