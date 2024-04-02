import { memo } from 'react';

import { ManageSettlementProcessForm } from '@/features/ManageSettlementProcess/ui/ManageSettlementProcess/ManageSettlementProcessForm';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

export const SettlementManagePage = memo(() => {
  return (
    <VStack>
      <ManageSettlementProcessForm />
    </VStack>
  );
});
