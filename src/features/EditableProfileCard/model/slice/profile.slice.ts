import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';
import { fetchProfile } from '../services/fetchProfileData/fetchProfileData';
import { updateProfile } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCard';

const initialState: ProfileSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
  readonly: true,
  form: undefined,
  validationErrors: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadOnly(state, action: PayloadAction<boolean>) {
      state.readonly = action.payload;
    },
    cancelEdit(state) {
      state.readonly = true;
      state.form = state.data;
      state.validationErrors = undefined;
      state.error = undefined;
    },
    updateProfile(state, action: PayloadAction<Profile>) {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.error = '';
        state.data = action.payload;
        state.form = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.validationErrors = undefined;
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.error = undefined;
        state.validationErrors = undefined;
        state.data = action.payload;
        state.form = action.payload;
        state.readonly = true;
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.validationErrors = action.payload;
        } else {
          state.error = action.payload;
        }

        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
