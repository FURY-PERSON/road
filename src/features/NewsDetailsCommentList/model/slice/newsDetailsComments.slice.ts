import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { fetchCommentsByNewsId } from '../services/fetchNewsDetailsComments/fetchNewsDetailsComments';
import { NewsDetailsCommentsSchema } from '../types/newsDetailsCommentsSchema';

const newsDetailsCommentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getNewsDetailsComments = newsDetailsCommentsAdapter.getSelectors<StateSchema>(
  (state) => state.newsDetailsComments || newsDetailsCommentsAdapter.getInitialState(),
);

export const newsDetailsCommentsSlice = createSlice({
  name: 'newsDetailsComments',
  initialState: newsDetailsCommentsAdapter.getInitialState<NewsDetailsCommentsSchema>({
    entities: {},
    ids: [],
  }),
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByNewsId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCommentsByNewsId.fulfilled, (state, action) => {
        state.error = '';
        newsDetailsCommentsAdapter.setAll(state, action.payload);
        state.isLoading = false;
      })
      .addCase(fetchCommentsByNewsId.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: newsDetailsCommentsActions } = newsDetailsCommentsSlice;
export const { reducer: newsDetailsCommentsReducer } = newsDetailsCommentsSlice;
