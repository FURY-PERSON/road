import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { setBenefits } from '@/entities/Benefit';
import { createSettlementRequest } from '@/entities/SettlementRequest';

import { getBenefits, getStudentId, getTargetDormId } from '../../selectors/selectors';

export const requestSettlement = createAsyncThunk<void, void, ThunkConfig<string>>(
  'AddSanitaryVisitForm/createSanitaryVisit',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;

    try {
      const studentId = getStudentId(getState());
      const benefits = getBenefits(getState());
      const targetDormId = getTargetDormId(getState());

      if (!studentId) {
        return rejectWithValue('Student id is required');
      }

      if (!benefits) {
        return rejectWithValue('Benefits not specified');
      }

      await dispatch(setBenefits({ studentId, benefits })).unwrap();
      await dispatch(createSettlementRequest({ targetDormId: targetDormId })).unwrap();
    } catch (error: any) {
      return rejectWithValue(String(error?.data?.message) || 'Can not create settlement request');
    }
  }
);
