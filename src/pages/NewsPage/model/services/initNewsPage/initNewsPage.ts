import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchNewsList } from '../fetchNewsList/fetchNewsList';
import { getNewsPageInited } from '../../selectors/getNewsPageInited/getNewsPageInited';

export const initNewsPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'news/initNewsPage',
  async (_, thunkAPI) => {
    const {
      getState, dispatch,
    } = thunkAPI;

    const inited = getNewsPageInited(getState());
    if (!inited) {
      dispatch(fetchNewsList({ page: 1 }));
    }
  },
);
