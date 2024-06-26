import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RoleName } from '@/entities/Role';
import { UserStudyingForm } from '@/entities/User';

import { registerNewUser } from '../services/registerNewUser/registerNewUser';
import { RegisterForm, RegisterSchema } from '../types/register.schema';

export const initialForm: RegisterForm = {
  login: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  password: '',
  confirmPassword: '',
  mark: 1
};

export const initialState: RegisterSchema = {
  form: initialForm,

  isLoading: false,
  error: undefined,
  validationError: undefined
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.form.login = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.form.password = action.payload;
    },
    setConfirmPassword(state, action: PayloadAction<string>) {
      state.form.confirmPassword = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.form.firstName = action.payload;
    },
    setSecondName(state, action: PayloadAction<string>) {
      state.form.lastName = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      state.form.phone = action.payload;
    },
    setRole(state, action: PayloadAction<RoleName>) {
      state.form.role = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.form.email = action.payload;
    },
    setMark(state, action: PayloadAction<number>) {
      state.form.mark = action.payload;
    },
    setStudyingForm(state, action: PayloadAction<UserStudyingForm>) {
      state.form.studyingForm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.error = undefined;
        state.validationError = undefined;
        state.isLoading = true;
      })
      .addCase(registerNewUser.fulfilled, (state) => {
        state.error = undefined;
        state.validationError = undefined;
        state.form = initialForm;
        state.isLoading = false;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.validationError = action.payload;
        } else {
          state.error = action.payload;
        }
        state.isLoading = false;
      });
  }
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
