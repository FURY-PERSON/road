import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { News } from '../../types/news';

interface FetchNewsByIdProps {
  id: string
}

export const fetchNewsById = createAsyncThunk<News, FetchNewsByIdProps, ThunkConfig<string>>(
  'news/fetchNewsById',
  async (props, thunkAPI) => {
    const { id } = props;

    const {
      extra, rejectWithValue, 
    } = thunkAPI;
    try {
      if (!id) {
        return rejectWithValue('news id do not provide');
      }
      
      const response = await extra.api.get<News>(`news/${id}`, {

      });
      
      const news = response.data;

      if (!news) {
        return rejectWithValue(`News ${id} not found`);
      }

      return news;
    } catch (error) {
      if (error instanceof AxiosError<{message: string}>) {
        return thunkAPI.rejectWithValue(error.response?.data.message || error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('Unexpected news fetching error');
    }
  },
);
