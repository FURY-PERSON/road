import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Dorm } from '@/entities/Dorm';

export const initStudentSettlement = createAsyncThunk<{ dorms: Dorm[] }, void, ThunkConfig<string>>(
  'news/initStudentSettlement',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      const dorms = (await extra.api.get<Dorm[]>('dorm')).data;

      if (!dorms) {
        return rejectWithValue('dorms not found');
      }

      return { dorms };
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  }
);
