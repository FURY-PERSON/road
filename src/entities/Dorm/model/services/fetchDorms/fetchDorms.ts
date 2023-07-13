import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { Dorm } from '../../types/dorm';

export const fetchDorms = createAsyncThunk<Dorm[], void, ThunkConfig<string>>(
  'dorm/fetchDorms',
  async (_, thunkAPI) => {
    const {
      extra, rejectWithValue, getState, 
    } = thunkAPI;

    try {
      const response = await extra.api.get<Dorm[]>('dorm');

      if (!response.data) {
        return rejectWithValue('Dorms not found');
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('unhandled fetch dorms error');
    }
  },
);
