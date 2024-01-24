import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SanitaryVisit, createBlockSanitaryVisit } from '@/entities/Block';

import { getSelectedBlockId, getSelectedVisitDate } from '../../selectors/selectors';

export const createSanitaryVisit = createAsyncThunk<SanitaryVisit, void, ThunkConfig<string>>(
  'AddSanitaryVisitForm/createSanitaryVisit',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;

    try {
      const selectedDate = getSelectedVisitDate(getState());
      const blockId = getSelectedBlockId(getState());

      if (!blockId) {
        return rejectWithValue('Block id is required');
      }

      if (!selectedDate) {
        return rejectWithValue('Date id is required');
      }

      const response = await dispatch(
        createBlockSanitaryVisit({ blockId: blockId, date: selectedDate })
      ).unwrap();

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data.message || error.response?.statusText || error.message
        );
      }
      return rejectWithValue('Unexpected login error');
    }
  }
);
