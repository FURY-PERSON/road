import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Benefit } from '@/entities/Benefit';

import { RequestSettlementSchema } from '../types/requestSettlement.schema';

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
    setTargetDormId(state, action: PayloadAction<string | null>) {
      state.targetDormId = action.payload;
    }
  }
});
