import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getApiHasMore, getApiPage, getLoading } from '../../selectors/blocksPage';
import { fetchList } from '../fetchList/fetchList';
import { blocksPageActions } from '../../slice/blocksPage.slice';

interface FetchNextPageProps {
  dormId?: string;
}

export const fetchNextPage = createAsyncThunk<void, FetchNextPageProps, ThunkConfig<string>>(
  'block/fetchNextPage',
  async (data, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    const hasMore = getApiHasMore(getState());
    const page = getApiPage(getState());
    const isLoading = getLoading(getState());

    if (!data.dormId || !hasMore || isLoading) return;

    dispatch(fetchList({ dormId: data.dormId, page: +page + 1 }));
    dispatch(blocksPageActions.setPage(+page + 1));
  }
);
