import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ACCESS_TOKEN_LOCALSTORAGE_KEY,
  REFRESH_TOKEN_LOCALSTORAGE_KEY
} from '@/shared/constant/localstorage';

import { refreshAuthData } from '../services/refreshAuthData/refreshAuthData';
import { AuthTokens, User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  _inited: false
};

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
          refreshToken: refreshToken || ''
        };
      }
    },
    logout(state) {
      state.authData = undefined;
      state.userData = undefined;
      localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAuthData.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(refreshAuthData.fulfilled, (state, action) => {
        state._inited = true;
        state.error = '';
        state.isLoading = false;
        state.userData = action.payload.user;
        state.authData = action.payload.tokens;
        localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, action.payload.tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, action.payload.tokens.refreshToken);
      })
      .addCase(refreshAuthData.rejected, (state, action) => {
        state._inited = true;
        state.error = action.payload;
        state.isLoading = false;
        state.authData = undefined;
        localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
      });
  }
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
