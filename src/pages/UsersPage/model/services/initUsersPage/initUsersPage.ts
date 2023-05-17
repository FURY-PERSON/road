import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types/sort';
import { getInited } from '../../selectors/usersPage';
import { usersPageActions } from '../../slice/usersPage.slice';
import { fetchUsersList } from '../fetchUsersList/fetchUsersList';
import { UsersRolesFilter, UsersSortFilter } from '../../types/usersPage';

export const initUsersPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'users/initUsersPage',
  async (data, thunkAPI) => {
    const {
      getState, dispatch,
    } = thunkAPI;

    const inited = getInited(getState());
    if (!inited) {
      const orderFromUrl = data.get('order') as SortOrder;
      const limitFromUrl = data.get('limit') as number | null;
      const pageFromUrl = data.get('page') as number | null;
      const searchFromUrl = data.get('login');
      const sortFromUrl = data.get('sort') as UsersSortFilter | null;
      const roleFromUrl = data.get('role') as UsersRolesFilter | null;

      if (orderFromUrl) {
        dispatch(
          usersPageActions.setOrder(orderFromUrl),
        );
      } 
      if (limitFromUrl) {
        dispatch(
          usersPageActions.setLimit(limitFromUrl),
        );
      } 
      if (pageFromUrl) {
        dispatch(
          usersPageActions.setPage(pageFromUrl),
        );
      } 
      if (searchFromUrl) {
        dispatch(
          usersPageActions.setSearch(searchFromUrl),
        );
      } 
      if (roleFromUrl) {
        dispatch(
          usersPageActions.setRole(roleFromUrl),
        );
      } 
      if (sortFromUrl) {
        dispatch(
          usersPageActions.setSort(sortFromUrl),
        );
      } 

      dispatch(fetchUsersList({ page: 1 }));
    }
  },
);
