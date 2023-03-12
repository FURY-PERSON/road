import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/constant/localstorage';

interface LoginByUsernameProps {
  username: string,
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>(
  'users/loginByUsername',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post<User>('http://localhost:8000/login', data);
      const user = response.data;

      if (!user) {
        return thunkAPI.rejectWithValue('User not found');
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
      thunkAPI.dispatch(userActions.setAuthData(user));
      
      return response.data;
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.response.statusText || typedError.message);
    }
  },
);
