import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from 'shared/constant/localstorage';
import { AuthTokens, User, UserSchema } from '../types/user';

const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<AuthTokens>) {
      localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, action.payload.accessToken);
      localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, action.payload.refreshToken);
      state.authData = action.payload;
    },
    setUserData(state, action: PayloadAction<User>) {
      state.userData = action.payload;
    },
    initAuthData(state) {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
      
      if (accessToken || refreshToken) {
        state.authData = {
          accessToken: accessToken || '',
          refreshToken: refreshToken || '',
        };
      }
    },
    logout(state) {
      state.authData = undefined;
      state.userData = undefined;
      localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
