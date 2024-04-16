import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { News } from '@/entities/News';

export const fetchNewsRecommendationList = createAsyncThunk<News[], void, ThunkConfig<string>>(
  'news/fetchNewsRecommendationList',
  async (data, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.api.get<News[]>('news', {
        params: {
          limit: 6
        }
      });
      const news = response.data;

      if (!news) {
        return rejectWithValue('News not found');
      }

      return news;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('unhandled fetch news recommendation list error');
    }
  }
);
