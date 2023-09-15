import { memo, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { TextInput } from '@/shared/ui/deprecated/TextInput/TextInput';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import i18n from '@/shared/config/i18n/i18n';
import { SortOrder } from '@/shared/types/sort';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from '@/shared/ui/deprecated/Tabs/Tabs';

import { usersPageActions } from '../../model/slice/usersPage.slice';
import { fetchUsersList } from '../../model/services/fetchUsersList/fetchUsersList';
import { getOrder, getRole, getSearch, getSort } from '../../model/selectors/usersPage';
import { UsersRolesFilter, UsersSortFilter } from '../../model/types/usersPage';

import cls from './UsersPageFilter.module.scss';

interface UsersPageFilterProps {
  className?: string;
}

const orderOption: Array<SelectOption<SortOrder>> = [
  { value: 'ASC', content: i18n.t('ascending') },
  { value: 'DESC', content: i18n.t('descending') }
];

const sortOption: Array<SelectOption<UsersSortFilter>> = [
  { value: UsersSortFilter.FIRST_NAME, content: i18n.t('last name') },
  { value: UsersSortFilter.LAST_NAME, content: i18n.t('first name') },
  { value: UsersSortFilter.LOGIN, content: i18n.t('login') }
];

const userRolesTabs: Array<TabItem<UsersRolesFilter>> = [
  { value: UsersRolesFilter.ALL, content: i18n.t('all') },
  { value: UsersRolesFilter.ADMIN, content: i18n.t('admin') },
  { value: UsersRolesFilter.STUDENT, content: i18n.t('student') },
  { value: UsersRolesFilter.WORKER, content: i18n.t('worker') }
];

export const UsersPageFilter: FC<UsersPageFilterProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const order = useSelector(getOrder);
  const search = useSelector(getSearch);
  const role = useSelector(getRole);
  const sort = useSelector(getSort);
  const { t } = useTranslation();

  const refetchUsers = useCallback(() => {
    dispatch(fetchUsersList({ replace: true }));
  }, [dispatch]);

  const debouncedRefetchUsers = useDebounce(refetchUsers, 500);

  const onChangeOrder = useCallback(
    (value: SortOrder) => {
      dispatch(usersPageActions.setOrder(value));
      dispatch(usersPageActions.setPage(1));
      refetchUsers();
    },
    [dispatch, refetchUsers]
  );

  const onChangeSearch = useCallback(
    (value: string) => {
      dispatch(usersPageActions.setSearch(value));
      dispatch(usersPageActions.setPage(1));
      debouncedRefetchUsers();
    },
    [dispatch, debouncedRefetchUsers]
  );

  const onChangeType = useCallback(
    (value: UsersRolesFilter) => {
      dispatch(usersPageActions.setRole(value));
      dispatch(usersPageActions.setPage(1));
      refetchUsers();
    },
    [dispatch, refetchUsers]
  );

  const onChangeSort = useCallback(
    (value: UsersSortFilter) => {
      dispatch(usersPageActions.setSort(value));
      dispatch(usersPageActions.setPage(1));
      refetchUsers();
    },
    [dispatch, refetchUsers]
  );

  return (
    <div className={classNames(cls.UsersPageFilter, {}, [className])}>
      <div className={cls.sortWrapper}>
        <div className={cls.sortSelects}>
          <Select<SortOrder>
            onChange={onChangeOrder}
            value={order}
            label={t('order by')}
            options={orderOption}
          />
          <Select<UsersSortFilter>
            onChange={onChangeSort}
            value={sort}
            label={t('order by')}
            options={sortOption}
          />
        </div>
      </div>

      <Card className={cls.search}>
        <TextInput value={search} onChange={onChangeSearch} placeholder="Search..." />
      </Card>

      <Tabs<UsersRolesFilter>
        className={cls.type}
        tabs={userRolesTabs}
        value={role}
        onTabClick={onChangeType}
      />
    </div>
  );
});
