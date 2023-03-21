import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { Profile } from 'entities/Profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfile = createAsyncThunk<Profile, void, ThunkConfig<string>>(
  'profile/updateProfile',
  async (_, thunkAPI) => {
    const {
      extra, rejectWithValue, getState,
    } = thunkAPI;
    try {
      const formData = getProfileForm(getState());

      const response = await extra.api.put<Profile>('/users', formData, { params: { login: formData?.login } });
      const profile = response.data[0];

      if (!profile) {
        return rejectWithValue('Profile do not updated');
      }

      return profile;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  },
);
