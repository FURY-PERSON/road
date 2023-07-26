import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

interface fetchProfileProps {
  login?: string
}

export const fetchProfile = createAsyncThunk<User, fetchProfileProps, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (data, thunkAPI) => {
    const {
      extra, rejectWithValue, 
    } = thunkAPI;
    try {
      if (!data?.login) {
        return rejectWithValue('Profile login do not provided');
      }

      const response = await extra.api.get<User>(`/users/${data?.login}`);
      const profile = response.data; 

      if (!profile) {
        return rejectWithValue('Profile not found');
      }

      return profile;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  },
);
