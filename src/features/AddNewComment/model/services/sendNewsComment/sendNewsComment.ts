import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

interface SendCommentProps {
  id: string;
}

export const sendNewsComment = createAsyncThunk<Comment, SendCommentProps, ThunkConfig<string>>(
  'addNewComment/sendNewsComment',
  async ({ id }, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;
    try {
      const formState = getState().addCommentForm;

      if (!id) {
        return rejectWithValue('Not enough data provided');
      }

      const response = await extra.api.post<Comment>('comment/news', {
        mainText: formState?.text,
        relatedEntityId: id
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(
          error.response?.data.message || error.response?.statusText || error.message
        );
      }
      return thunkAPI.rejectWithValue('Unexpected login error');
    }
  }
);
