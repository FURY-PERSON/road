import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getApiHasMore, getApiPage, getLoading } from '../../selectors/usersPage';
import { fetchUsersList } from '../fetchUsersList/fetchUsersList';
import { usersPageActions } from '../../slice/usersPage.slice';

export const fetchNextUsersPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'users/fetchNextUsersPage',
  async (_, thunkAPI) => {
    const {
      getState, dispatch,
    } = thunkAPI;

    const hasMore = getApiHasMore(getState());
    const page = getApiPage(getState());
    const isLoading = getLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(fetchUsersList({ page: +page + 1 }));
      dispatch(usersPageActions.setPage(+page + 1));
    }
  },
);
