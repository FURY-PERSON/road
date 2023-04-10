import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { News } from 'entities/News';
import { getNewsPageApiLimit } from '../../selectors/getNewsPageApiLimit/getNewsPageApiLimit';

interface FetchNewsListProps {
  page: number
}

interface FetchNewsListResponse {
  news: News[]
  totalPage: number,
  totalAmount: number
}

export const fetchNewsList = createAsyncThunk<FetchNewsListResponse, FetchNewsListProps, ThunkConfig<string>>(
  'news/fetchNewsList',
  async (data, thunkAPI) => {
    const {
      extra, rejectWithValue, getState, 
    } = thunkAPI;

    const { page } = data;
 
    const limit = getNewsPageApiLimit(getState());

    try {
      const response = await extra.api.get<News[]>('news', {
        params: {
          limit,
          page,
        },
      });
      const news = response.data; 
      const totalPage = response.headers['x-total-page'];
      const totalAmount = response.headers['x-total-item'];

      if (!news) {
        return rejectWithValue('Comments not found');
      }

      return { news, totalPage, totalAmount };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('unhandled fetch news page error');
    }
  },
);
