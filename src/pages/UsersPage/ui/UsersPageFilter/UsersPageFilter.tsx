import { memo, FC, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { Card } from 'shared/ui/Card/Card';
import { useTranslation } from 'react-i18next';
import i18n from 'shared/config/i18n/i18n';
import { SortOrder } from 'shared/types/sort';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import cls from './UsersPageFilter.module.scss';
import { usersPageActions } from '../../model/slice/usersPage.slice';
import { fetchUsersList } from '../../model/services/fetchUsersList/fetchUsersList';
import { getOrder, getSearch } from '../../model/selectors/usersPage';

interface UsersPageFilterProps {
  className?: string;
}

const orderOption: Array<SelectOption<SortOrder>> = [
  { value: 'ASC', content: i18n.t('ascending') },
  { value: 'DESC', content: i18n.t('descending') },
];

/* const UsersTypeTabs: Array<TabItem<UsersType>> = [
  { value: UsersType.ALL, content: i18n.t('all') },
  { value: UsersType.WARNING, content: i18n.t('warning') },
]; */

export const UsersPageFilter:FC<UsersPageFilterProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const order = useSelector(getOrder);
  const search = useSelector(getSearch);
  const { t } = useTranslation();

  const refetchUsers = useCallback(() => {
    dispatch(fetchUsersList({ replace: true }));
  }, [dispatch]);

  const debouncedRefetchUsers = useDebounce(refetchUsers, 500);

  const onChangeOrder = useCallback((value: SortOrder) => {
    dispatch(usersPageActions.setOrder(value));
    dispatch(usersPageActions.setPage(1));
    refetchUsers();
  }, [dispatch, refetchUsers]);

  const onChangeSearch = useCallback((value: string) => {
    dispatch(usersPageActions.setSearch(value));
    dispatch(usersPageActions.setPage(1));
    debouncedRefetchUsers();
  }, [dispatch, debouncedRefetchUsers]);

  return (
    <div className={classNames(cls.UsersPageFilter, {}, [className])}>
      <div className={cls.sortWrapper}>
        <div className={cls.sortSelects}>
          <Select<SortOrder> onChange={onChangeOrder} value={order} label={t('order by')} options={orderOption} />
        </div>

        {/*         <UsersViewSelector view={view} onViewClick={onChangeView} /> */}
      </div>

      <Card className={cls.search}>
        <TextInput value={search} onChange={onChangeSearch} placeholder="Search..." />
      </Card>

      {/*       <Tabs<UsersType> className={cls.type} tabs={UsersTypeTabs} value={type} onTabClick={onChangeType} /> */}
    </div>
  );
});
