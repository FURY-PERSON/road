import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { NewsSort } from '@/entities/News';
import { SortOrder } from '@/shared/types/sort';
import { Select } from '@/shared/ui/deprecated/Select/Select';
import { ToggleFeatures } from '@/shared/lib/helpers/ToggleFeatures/ToggleFeatures';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ListBox } from '@/shared/ui/redesigned/popups';

import { orderOptions, sortOrderOptions } from '../../model/constants/newsSortSelector';

import cls from './NewsSortSelector.module.scss';

interface NewsSortSelectorProps {
  className?: string;
  sort: NewsSort;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: NewsSort) => void;
}

export const NewsSortSelector = memo((props: NewsSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props;
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature="newDesign"
      on={
        <div className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
          <VStack gap={8}>
            <Text text={t('sort by')} />
            <ListBox<NewsSort> items={sortOrderOptions} value={sort} onChange={onChangeSort} />
            <ListBox<SortOrder> items={orderOptions} value={order} onChange={onChangeOrder} />
          </VStack>
        </div>
      }
      off={
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
          <Select<NewsSort>
            options={sortOrderOptions}
            label={t('order by')}
            value={sort}
            onChange={onChangeSort}
          />
          <Select<SortOrder>
            options={orderOptions}
            label={t('по')}
            value={order}
            onChange={onChangeOrder}
            className={cls.order}
          />
        </div>
      }
    />
  );
});
