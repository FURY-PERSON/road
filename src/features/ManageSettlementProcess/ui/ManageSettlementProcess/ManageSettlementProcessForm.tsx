import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useGetActiveSettlementProcess,
  useStartSettlementProcessMutation
} from '@/entities/SettlementProcess';
import { Button } from '@/shared/ui/redesigned/Button/Button';

export const ManageSettlementProcessForm = memo(() => {
  const { t } = useTranslation('process');

  const { data: activeProcess } = useGetActiveSettlementProcess();
  const [startProcess] = useStartSettlementProcessMutation();

  if (!activeProcess) {
    return (
      <Button variant="filled" onClick={() => startProcess()}>
        {t('create process')}
      </Button>
    );
  }
  return <>{JSON.stringify(activeProcess)}</>;
});
