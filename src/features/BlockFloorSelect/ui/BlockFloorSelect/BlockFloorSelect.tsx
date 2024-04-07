import { memo, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/redesigned/Card';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { SortOrder } from '@/shared/types/sort';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';

interface BlockFloorSelectProps {
  className?: string;
  floor?: string;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onFloorChange?: (floor: string) => void;
}

export const BlockFloorSelect: FC<BlockFloorSelectProps> = memo((props) => {
  const { className, floor, onFloorChange, onChangeOrder, order } = props;

  const { t } = useTranslation();

  const floorList: Array<ListBoxItem<string>> = useMemo(
    () => [
      { content: t('floor not selected'), value: 'none' },
      { content: 1, value: '1' },
      { content: 2, value: '2' },
      { content: 3, value: '3' },
      { content: 4, value: '4' },
      { content: 5, value: '5' },
      { content: 6, value: '6' },
      { content: 7, value: '7' },
      { content: 8, value: '8' },
      { content: 9, value: '9' },
      { content: 10, value: '10' },
      { content: 11, value: '11' }
    ],
    [t]
  );

  const orderOptions: Array<ListBoxItem<SortOrder>> = useMemo(
    () => [
      { value: 'ASC', content: t('ascending') },
      { value: 'DESC', content: t('descending') }
    ],
    [t]
  );

  return (
    <Card border="default" padding="8" className={className}>
      <VStack gap={24}>
        <ListBox<string> items={floorList} value={String(floor)} onChange={onFloorChange} />

        <ListBox<SortOrder> items={orderOptions} value={order} onChange={onChangeOrder} />
      </VStack>
    </Card>
  );
});
