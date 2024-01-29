import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addNewTenantToRoom } from '../services/addNewTenantToRoom/addNewTenantToRoom';
import { AddNewTenantToRoomSchema } from '../types/addNewTenantToRoom.schema';

const initialState: AddNewTenantToRoomSchema = {};

export const addNewTenantToRoomSlice = createSlice({
  name: 'addNewTenantToRoom',
  initialState,
  reducers: {
    setUserLogin(state, action: PayloadAction<string>) {
      state.userLogin = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewTenantToRoom.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(addNewTenantToRoom.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
      })
      .addCase(addNewTenantToRoom.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: addNewTenantToRoomActions } = addNewTenantToRoomSlice;
export const { reducer: addNewTenantToRoomReducer } = addNewTenantToRoomSlice;
