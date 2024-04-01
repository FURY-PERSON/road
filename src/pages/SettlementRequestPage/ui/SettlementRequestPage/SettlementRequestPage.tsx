import { memo } from 'react';

import { RequestSettlementForm } from '@/features/RequestSettlement';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

export const SettlementRequestPage = memo(() => {
  return (
    <VStack>
      <RequestSettlementForm />
    </VStack>
  );
});
