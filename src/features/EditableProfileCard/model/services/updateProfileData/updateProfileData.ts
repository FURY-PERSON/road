import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { ProfileValidationError } from '../../types/editableProfileCard';
import { validateProfileForm } from '../validateProfileForm/validateProfileForm';

export const updateProfile = createAsyncThunk<User, void, ThunkConfig<ProfileValidationError[] | string>>(
  'profile/updateProfile',
  async (_, thunkAPI) => {
    const {
      extra, rejectWithValue, getState,
    } = thunkAPI;
    try {
      const formData = getProfileForm(getState());

      const errors = validateProfileForm(formData);

      if (errors.length) {
        return rejectWithValue(errors);
      }

      const response = await extra.api.put<User>(`/users/${formData?.login}`, formData);
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
