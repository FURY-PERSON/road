import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { News } from 'entities/News';

export const fetchNewsList = createAsyncThunk<News[], void, ThunkConfig<string>>(
  'news/fetchNewsList',
  async (_, thunkAPI) => {
    const {
      extra, rejectWithValue, 
    } = thunkAPI;
    try {
      const response = await extra.api.get<News[]>('news');
      const news = response.data; 

      if (!news) {
        return rejectWithValue('Comments not found');
      }

      return news;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  },
);
