import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { AuthTokens, User, userActions } from '@/entities/User';

interface LoginResponse {
  user: User,
  tokens: AuthTokens
}

export const loginByUsername = createAsyncThunk<User, void, ThunkConfig<string>>(
  'authByUsername/loginByUsername',
  async (_, thunkAPI) => {
    const {
      extra, dispatch, rejectWithValue, getState, 
    } = thunkAPI;
    try {
      const formState = getState().loginForm;
      
      const response = await extra.api.post<LoginResponse>('auth/login', {
        login: formState?.login,
        password: formState?.password,
      });
      
      const { user, tokens } = response.data;

      if (!user) {
        return rejectWithValue('User not found');
      }

      dispatch(userActions.setAuthData(tokens));
      dispatch(userActions.setUserData(user));
      return user;
    } catch (error) {
      if (error instanceof AxiosError<{message: string}>) {
        return thunkAPI.rejectWithValue(error.response?.data.message || error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('Unexpected login error');
    }
  },
);
