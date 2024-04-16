import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@/shared/assets/icons/search.svg';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Input } from '@/shared/ui/redesigned/Input';
import { BlockFloorSelect } from '@/features/BlockFloorSelect';

import cls from './BlocksFilters.module.scss';

interface BlocksFiltersProps {
  className?: string;
  order: SortOrder;
  floor?: string | 'none';
  number?: string;
  onChangeNumber: (number: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeFloor: (value: string | 'none') => void;
}

export const BlocksFilters = memo((props: BlocksFiltersProps) => {
  const { className, onChangeNumber, number, onChangeFloor, onChangeOrder, order, floor } = props;
  const { t } = useTranslation();

  return (
    <Card className={classNames(cls.BlocksFilters, {}, [className])} padding="24">
      <VStack gap={32}>
        <Input
          addonLeft={<SearchIcon className={cls.searchIcon} />}
          onChange={onChangeNumber}
          value={number}
          placeholder={t('block number') || undefined}
        />

        <BlockFloorSelect
          floor={floor}
          onFloorChange={onChangeFloor}
          order={order}
          onChangeOrder={onChangeOrder}
        />
      </VStack>
    </Card>
  );
});
