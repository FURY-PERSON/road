import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { UsersFilters } from '@/widgets/UsersFilters';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { UsersRoles, UsersSort } from '@/entities/User';

import { getOrder, getRole, getSearch, getSort } from '../../model/selectors/usersPage';
import { fetchUsersList } from '../../model/services/fetchUsersList/fetchUsersList';
import { usersPageActions } from '../../model/slice/usersPage.slice';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const order = useSelector(getOrder);
  const search = useSelector(getSearch);
  const role = useSelector(getRole);
  const sort = useSelector(getSort);

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
    <UsersFilters
      onChangeSearch={onChangeSearch}
      order={order}
      role={role}
      onChangeOrder={onChangeOrder}
      search={search}
      sort={sort}
      onChangeSort={onChangeSort}
      onChangeRole={onChangeRole}
      className={className}
    />
  );
});
