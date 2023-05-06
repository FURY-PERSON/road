import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { Dorm } from 'entities/Dorm';
import { News } from 'entities/News';

export const initCreateAndEditNews = createAsyncThunk<{news?: News, dorms: Dorm[]}, string | undefined, ThunkConfig<string>>(
  'news/initCreateAndEditNews',
  async (newsId, thunkAPI) => {
    const {
      extra, rejectWithValue, 
    } = thunkAPI;
    try {
      let news;
      if (newsId) {
        const response = await extra.api.get<News>(`news/${newsId}`);
        news = response.data; 
      }
      
      if (newsId && !news) {
        return rejectWithValue('news not found');
      }

      const dorms = (await extra.api.get<Dorm[]>('dorm')).data;

      if (!dorms) {
        return rejectWithValue('dorms not found');
      }

      return { news, dorms };
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  },
);
