import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { News } from 'entities/News';

export const initCreateAndEditNews = createAsyncThunk<News, string, ThunkConfig<string>>(
  'news/initCreateAndEditNews',
  async (newsId, thunkAPI) => {
    const {
      extra, rejectWithValue, 
    } = thunkAPI;
    try {
      const response = await extra.api.get<News>(`news/${newsId}`);
      const news = response.data; 

      if (!news) {
        return rejectWithValue('news not found');
      }

      return news;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  },
);
