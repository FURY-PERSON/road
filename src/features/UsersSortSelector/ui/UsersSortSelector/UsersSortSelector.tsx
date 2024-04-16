import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';

import { UsersSort } from '@/entities/User';
import { SortOrder } from '@/shared/types/sort';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { SelectOption } from '@/shared/ui/deprecated/Select/Select';

import cls from './UsersSortSelector.module.scss';

interface UsersSortSelectorProps {
  className?: string;
  sort: UsersSort;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: UsersSort) => void;
}

export const UsersSortSelector = memo((props: UsersSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props;
  const { t } = useTranslation();

  const orderOptions: Array<SelectOption<SortOrder>> = useMemo(
    () => [
      { value: 'ASC', content: t('ascending') },
      { value: 'DESC', content: t('descending') }
    ],
    [t]
  );

  const sortOptions: Array<SelectOption<UsersSort>> = useMemo(
    () => [
      { value: UsersSort.FIRST_NAME, content: t('last name') },
      { value: UsersSort.LAST_NAME, content: t('first name') },
      { value: UsersSort.LOGIN, content: t('login') }
    ],
    [t]
  );

  return (
    <div className={classNames(cls.UsersSortSelector, {}, [className])}>
      <VStack gap={8}>
        <Text text={t('sort by')} />
        <ListBox<UsersSort>
          className={cls.selectors}
          items={sortOptions}
          value={sort}
          onChange={onChangeSort}
        />
        <ListBox<SortOrder>
          className={cls.selectors}
          items={orderOptions}
          value={order}
          onChange={onChangeOrder}
        />
      </VStack>
    </div>
  );
});
