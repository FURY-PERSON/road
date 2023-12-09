import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { NewsSort, NewsType } from '@/entities/News';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Input } from '@/shared/ui/redesigned/Input';
import { NewsTypeTabs } from '@/features/NewsTypeTabs';
import { NewsSortSelector } from '@/features/NewsSortSelector';
import SearchIcon from '@/shared/assets/icons/search.svg';

import cls from './NewsFilters.module.scss';

interface NewsFiltersProps {
  className?: string;
  sort: NewsSort;
  order: SortOrder;
  type: NewsType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: NewsSort) => void;
  onChangeType: (type: NewsType) => void;
}

export const NewsFilters = memo((props: NewsFiltersProps) => {
  const {
    className,
    onChangeType,
    onChangeSearch,
    search,
    onChangeSort,
    sort,
    onChangeOrder,
    order,
    type
  } = props;
  const { t } = useTranslation();

  return (
    <Card className={classNames(cls.NewsFilters, {}, [className])} padding="24">
      <VStack gap={32} align="start">
        <Input
          addonLeft={<SearchIcon className={cls.searchIcon} />}
          onChange={onChangeSearch}
          value={search}
          placeholder={t('search') || undefined}
        />
        <NewsTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs} />
        <NewsSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
