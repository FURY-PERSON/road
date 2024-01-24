import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddSanitaryVisitSchema } from '../types/addSanitaryVisit.schema';
import { createSanitaryVisit } from '../services/createSanitaryVisit/createSanitaryVisit';

const initialState: AddSanitaryVisitSchema = {
  blockIdEditable: true
};

export const addSanitaryVisitSlice = createSlice({
  name: 'addSanitaryVisit',
  initialState,
  reducers: {
    init(state, action: PayloadAction<{ blockId?: string }>) {
      state.blockId = action.payload.blockId;
      state.blockIdEditable = !action.payload.blockId;
    },
    setVisitDate(state, action: PayloadAction<string>) {
      state.visitDate = action.payload;
    },
    setBlockId(state, action: PayloadAction<string>) {
      state.blockId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSanitaryVisit.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(createSanitaryVisit.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
      })
      .addCase(createSanitaryVisit.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: addSanitaryVisitActions } = addSanitaryVisitSlice;
export const { reducer: addSanitaryVisitReducer } = addSanitaryVisitSlice;
