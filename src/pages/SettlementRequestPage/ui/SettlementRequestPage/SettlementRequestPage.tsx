import { memo } from 'react';

import { SetBenefitsCard } from '@/features/SetBenefitsForm';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

export const SettlementRequestPage = memo((props) => {
  return (
    <VStack>
      <SetBenefitsCard />
    </VStack>
  );
});
