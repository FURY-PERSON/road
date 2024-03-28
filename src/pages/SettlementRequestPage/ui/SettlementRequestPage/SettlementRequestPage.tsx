import { memo } from 'react';

import { SettlementRequestForm } from '@/features/RequestSettlement';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

export const SettlementRequestPage = memo((props) => {
  return (
    <VStack>
      <SettlementRequestForm />
    </VStack>
  );
});
