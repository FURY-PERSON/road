import { createSlice } from '@reduxjs/toolkit';

import { StudentSettlementSchema } from '../types/studentSettlement.schema';
import { initStudentSettlement } from '../services/initStudentSettlement/initStudentSettlement';

const initialState: StudentSettlementSchema = {};

export const studentSettlementSlice = createSlice({
  name: 'studentSettlementSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initStudentSettlement.fulfilled, (state, action) => {
      state.dorms = action.payload.dorms;
    });
  }
});

export const { actions: studentSettlementActions } = studentSettlementSlice;
export const { reducer: studentSettlementReducer } = studentSettlementSlice;
