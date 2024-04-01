import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Benefit } from '@/entities/Benefit';

import { RequestSettlementSchema } from '../types/requestSettlement.schema';
import { initRequestSettlement } from '../services/initRequestSettlement/initRequestSettlement';

const initialState: RequestSettlementSchema = {
  benefits: []
};

export const requestSettlementSlice = createSlice({
  name: 'requestSettlementSlice',
  initialState,
  reducers: {
    setBenefits(state, action: PayloadAction<Benefit[]>) {
      state.benefits = action.payload;
    },
    setTargetDorm(state, action: PayloadAction<string>) {
      const dorm = state.dorms?.find((dorm) => dorm.id === action.payload);

      if (dorm) {
        state.targetDorm = dorm;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initRequestSettlement.fulfilled, (state, action) => {
      state.dorms = action.payload.dorms;
    });
  }
});

export const { actions: requestSettlementActions } = requestSettlementSlice;
export const { reducer: requestSettlementReducer } = requestSettlementSlice;
