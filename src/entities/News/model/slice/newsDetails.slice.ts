import { createSlice } from '@reduxjs/toolkit';

import { fetchNewsById } from '../services/fetchNewsById/fetchNewsById';
import { NewsDetailsSchema } from '../types/newsDetailsSchema';

const initialState: NewsDetailsSchema = {
  isLoading: false,
  data: undefined,
  error: undefined
};

export const newsDetailsSlice = createSlice({
  name: 'newsDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsById.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

// Action creators are generated for each case reducer function
export const { actions: newsDetailsActions } = newsDetailsSlice;
export const { reducer: newsDetailsReducer } = newsDetailsSlice;
