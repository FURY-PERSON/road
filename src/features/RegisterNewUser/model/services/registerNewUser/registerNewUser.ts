import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthTokens, User, userActions } from '@/entities/User';
import { ValidationError } from '../../types/error';
import { validateForm } from '../validateForm/validateForm';

interface RegisterResponse {
  user: User,
  tokens: AuthTokens
}

export const registerNewUser = createAsyncThunk<User, void, ThunkConfig<ValidationError[] | string>>(
  'registerNewUser/registerNewUser',
  async (_, thunkAPI) => {
    const {
      extra, dispatch, rejectWithValue, getState, 
    } = thunkAPI;
    try {
      const form = getState().registerForm?.form;
      const errors = validateForm(form);

      if (errors.length) {
        return rejectWithValue(errors);
      }

      const response = await extra.api.post<RegisterResponse>('/auth/register', {
        firstName: form?.firstName,
        lastName: form?.lastName,
        phone: form?.phone,
        login: form?.login,
        password: form?.password,
        email: form?.email,
        roleName: form?.role,
      });
      const { user, tokens } = response.data;

      if (!user) {
        return rejectWithValue('User not found');
      }
      if (!tokens) {
        return rejectWithValue('Tokens do not provided');
      }

      dispatch(userActions.setAuthData(tokens));
      dispatch(userActions.setUserData(user));
      return user;
    } catch (error) {
      if (error instanceof AxiosError<{message: string}>) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }

      return thunkAPI.rejectWithValue('Unexpected register error');
    }
  },
);
