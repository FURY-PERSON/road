import { createSlice } from '@reduxjs/toolkit';
import { getProfile } from '../services/getProfileData/getProfileData';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
  readonly: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.error = '';
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
