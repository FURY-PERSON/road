import { createSlice } from '@reduxjs/toolkit';
import { fetchNewsRecommendationList } from '../services/fetchNewsRecommendationList/fetchNewsRecommendationList';
import { NewsRecommendationListSchema } from '../types/newsRecomendationListSchema';

const initialState: NewsRecommendationListSchema = {

};

const newsRecommendationListSlice = createSlice({
  name: 'newsRecommendationListSlice',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsRecommendationList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchNewsRecommendationList.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchNewsRecommendationList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: newsRecommendationListActions } = newsRecommendationListSlice;
export const { reducer: newsRecommendationListReducer } = newsRecommendationListSlice;
