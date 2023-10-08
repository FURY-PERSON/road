import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getApiHasMore, getApiPage, getLoading } from '../../selectors/blocksPAge';
import { fetchList } from '../fetchList/fetchList';
import { blocksPageActions } from '../../slice/blocksPage.slice';

export const fetchNextPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'block/fetchNextPage',
  async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    const hasMore = getApiHasMore(getState());
    const page = getApiPage(getState());
    const isLoading = getLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(fetchList({ page: +page + 1 }));
      dispatch(blocksPageActions.setPage(+page + 1));
    }
  }
);
