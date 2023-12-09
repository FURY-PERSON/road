import { memo, FC } from 'react';

import { Card } from '@/shared/ui/redesigned/Card';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { SortOrder } from '@/shared/types/sort';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

import { floorList, orderOptions } from '../../model/constants/selectItems';

interface BlockFloorSelectProps {
  className?: string;
  floor?: string;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onFloorChange?: (floor: string) => void;
}

export const BlockFloorSelect: FC<BlockFloorSelectProps> = memo((props) => {
  const { className, floor, onFloorChange, onChangeOrder, order } = props;

  return (
    <Card border="default" padding="8" className={className}>
      <VStack gap={24}>
        <ListBox<string> items={floorList} value={String(floor)} onChange={onFloorChange} />

        <ListBox<SortOrder> items={orderOptions} value={order} onChange={onChangeOrder} />
      </VStack>
    </Card>
  );
});
