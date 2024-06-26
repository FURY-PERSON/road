import { memo, FC, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { TextInput } from '@/shared/ui/deprecated/TextInput/TextInput';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { SortOrder } from '@/shared/types/sort';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from '@/shared/ui/deprecated/Tabs/Tabs';
import { UsersRoles, UsersSort } from '@/entities/User';

import { usersPageActions } from '../../model/slice/usersPage.slice';
import { fetchUsersList } from '../../model/services/fetchUsersList/fetchUsersList';
import { getOrder, getRole, getSearch, getSort } from '../../model/selectors/usersPage';

import cls from './UsersPageFilter.module.scss';

interface UsersPageFilterProps {
  className?: string;
}

export const UsersPageFilter: FC<UsersPageFilterProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const order = useSelector(getOrder);
  const search = useSelector(getSearch);
  const role = useSelector(getRole);
  const sort = useSelector(getSort);
  const { t } = useTranslation();

  const orderOption: Array<SelectOption<SortOrder>> = useMemo(
    () => [
      { value: 'ASC', content: t('ascending') },
      { value: 'DESC', content: t('descending') }
    ],
    [t]
  );

  const sortOption: Array<SelectOption<UsersSort>> = useMemo(
    () => [
      { value: UsersSort.FIRST_NAME, content: t('last name') },
      { value: UsersSort.LAST_NAME, content: t('first name') },
      { value: UsersSort.LOGIN, content: t('login') }
    ],
    [t]
  );

  const userRolesTabs: Array<TabItem<UsersRoles>> = useMemo(
    () => [
      { value: UsersRoles.ALL, content: t('all') },
      { value: UsersRoles.ADMIN, content: t('admin') },
      { value: UsersRoles.STUDENT, content: t('student') },
      { value: UsersRoles.WORKER, content: t('worker') }
    ],
    [t]
  );

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

  const onChangeRole = useCallback(
    (value: UsersRoles) => {
      dispatch(usersPageActions.setRole(value));
      dispatch(usersPageActions.setPage(1));
      refetchUsers();
    },
    [dispatch, refetchUsers]
  );

  const onChangeSort = useCallback(
    (value: UsersSort) => {
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
          <Select<UsersSort>
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

      <Tabs<UsersRoles>
        className={cls.type}
        tabs={userRolesTabs}
        value={role}
        onTabClick={onChangeRole}
      />
    </div>
  );
});
