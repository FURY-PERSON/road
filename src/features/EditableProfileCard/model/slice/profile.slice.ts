import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleName } from 'entities/Role';
import { fetchProfile } from '../services/fetchProfileData/fetchProfileData';
import { updateProfile } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCard';
import { UserToStoreDto } from '../dto/UserToStoreDto';

const initialState: ProfileSchema = {
  isLoading: false,
  readonly: true,
  form: {

  },
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
      state.validationErrors = undefined;
      state.error = undefined;

      if (state.data) {
        state.form = { ...new UserToStoreDto(state.data) };
      }
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.form.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.form.lastName = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      state.form.phone = action.payload;
    },
    setRole(state, action: PayloadAction<RoleName>) {
      state.form.roleName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.form.email = action.payload;
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
        state.form = { ...new UserToStoreDto(action.payload) };
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
        state.form = { ...new UserToStoreDto(action.payload) };
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
