import { memo } from 'react';

import { RequestSettlementForm } from '@/features/RequestSettlement';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

import cls from './SettlementRequestPage.module.scss';

export const SettlementRequestPage = memo(() => {
  return (
    <VStack align="center" justify="center" className={cls.SettlementRequestPage}>
      <RequestSettlementForm />
    </VStack>
  );
});
