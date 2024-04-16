import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@/shared/assets/icons/search.svg';
import { UsersRoles, UsersSort } from '@/entities/User';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Input } from '@/shared/ui/redesigned/Input';
import { UsersTypeTabs } from '@/features/UserRoleTabs';
import { UsersSortSelector } from '@/features/UsersSortSelector';

import cls from './UsersFilters.module.scss';

interface UsersFiltersProps {
  className?: string;
  sort: UsersSort;
  order: SortOrder;
  role: UsersRoles;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (userSort: UsersSort) => void;
  onChangeRole: (type: UsersRoles) => void;
}

export const UsersFilters = memo((props: UsersFiltersProps) => {
  const {
    className,
    onChangeRole,
    onChangeSearch,
    search,
    onChangeSort,
    sort,
    onChangeOrder,
    order,
    role
  } = props;
  const { t } = useTranslation();

  return (
    <Card className={classNames(cls.UsersFilters, {}, [className])} padding="24">
      <VStack gap={32}>
        <Input
          addonLeft={<SearchIcon className={cls.searchIcon} />}
          onChange={onChangeSearch}
          value={search}
          placeholder={t('search') || undefined}
        />
        <UsersTypeTabs value={role} onChangeRole={onChangeRole} className={cls.tabs} />

        <UsersSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
