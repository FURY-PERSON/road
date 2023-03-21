import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { Profile } from 'entities/Profile';

interface getProfileProps {
  login?: string
}

export const getProfile = createAsyncThunk<Profile, getProfileProps, ThunkConfig<string>>(
  'profile/getProfile',
  async (data, thunkAPI) => {
    const {
      extra, rejectWithValue, 
    } = thunkAPI;
    try {
      if (!data.login) {
        return rejectWithValue('Profile login do not provided');
      }

      const response = await extra.api.get<Profile>('/users', { params: { login: data?.login } });
      const profile = response.data[0];

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
