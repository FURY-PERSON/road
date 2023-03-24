import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { Profile } from 'entities/Profile';

interface fetchProfileProps {
  login?: string
}

export const fetchProfile = createAsyncThunk<Profile, fetchProfileProps, ThunkConfig<string>>(
  'profile/fetchProfile',
  async (data, thunkAPI) => {
    const {
      extra, rejectWithValue, 
    } = thunkAPI;
    try {
      if (!data.login) {
        return rejectWithValue('Profile login do not provided');
      }

      const response = await extra.api.get<Profile>('/users', { params: { login: data?.login } });
      const profile = Array.isArray(response.data) ? response.data[0] : response.data; // TODO DELETE WHEN USE REAL BE

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
