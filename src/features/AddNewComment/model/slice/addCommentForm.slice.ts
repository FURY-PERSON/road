import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sendNewsComment } from '../services/sendNewsComment/sendNewsComment';
import { AddCommentFormSchema } from '../types/addCommentFormSchema';

const initialState: AddCommentFormSchema = {};

export const addCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setCommentText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendNewsComment.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(sendNewsComment.fulfilled, (state, action) => {
        state.error = '';
        state.text = '';
        state.isLoading = false;
      })
      .addCase(sendNewsComment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

// Action creators are generated for each case reducer function
export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
