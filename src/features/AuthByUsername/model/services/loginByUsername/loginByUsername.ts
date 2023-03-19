import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/constant/localstorage';

interface LoginByUsernameProps {
  login?: string,
  password?: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'users/loginByUsername',
  async (data, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    try {
      const response = await extra.api.post<User>('/login', data);
      const user = response.data;

      if (!user) {
        return rejectWithValue('User not found');
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
      dispatch(userActions.setAuthData(user));
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
    }
  },
);
