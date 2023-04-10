import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getNewsPageApiHasMore } from '../../selectors/getNewsPageApiHasMore/getNewsPageApiHasMore';
import { getNewsPageApiPage } from '../../selectors/getNewsPageApiPage/getNewsPageApiPage';
import { getNewsPageLoading } from '../../selectors/getNewsPageLoading/getNewsPageLoading';
import { newsPageActions } from '../../slice/newsPage.slice';
import { fetchNewsList } from '../fetchNewsList/fetchNewsList';

export const fetchNextNewsPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'news/fetchNextNewsPage',
  async (_, thunkAPI) => {
    const {
      getState, dispatch,
    } = thunkAPI;

    const hasMore = getNewsPageApiHasMore(getState());
    const page = getNewsPageApiPage(getState());
    const isLoading = getNewsPageLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(fetchNewsList({ page: page + 1 }));
      dispatch(newsPageActions.setPage(page + 1));
    }
  },
);
