import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { SettlementProcessInfo } from '@/features/SettlementProcessInfo';
import { StudentSettlementByProcess } from '@/features/StudentSettlementByProcess';

import { SettlementProcessPageParam } from '../../model/types/types';

export const SettlementProcessPage = memo(() => {
  const { id } = useParams<SettlementProcessPageParam>();

  if (!id) return null;

  return (
    <VStack gap={16}>
      <SettlementProcessInfo id={id} />
      <StudentSettlementByProcess settlementProcessId={id} />
    </VStack>
  );
});
