import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { Comment } from 'entities/Comment';

export const fetchCommentsByNewsId = createAsyncThunk<Comment[], string, ThunkConfig<string>>(
  'news/fetchCommentsByNewsId',
  async (newsId, thunkAPI) => {
    const {
      extra, rejectWithValue, 
    } = thunkAPI;
    try {
      const response = await extra.api.get<Comment[]>(`comment/news/${newsId}`);
      const comments = response.data; 

      if (!comments) {
        return rejectWithValue('Comments not found');
      }

      return comments;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  },
);
