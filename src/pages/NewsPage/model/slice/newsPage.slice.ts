import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { News, NewsListVariant } from 'entities/News';
import { NEWS_VIEW_LOCALSTORAGE_KEY } from 'shared/constant/localstorage';
import { fetchNewsList } from '../services/fetchNewsList/fetchNewsList';
import { NewsPageSchema } from '../types/newsPageSchema';

const newsAdapter = createEntityAdapter<News>({
  selectId: (news) => news.id,
});

export const getNews = newsAdapter.getSelectors<StateSchema>(
  (state) => state.newsPage || newsAdapter.getInitialState(),
);

const defaultListView = localStorage.getItem(NEWS_VIEW_LOCALSTORAGE_KEY) as NewsListVariant || NewsListVariant.BLOCK;

export const newsPageSlice = createSlice({
  name: 'newsPage',
  initialState: newsAdapter.getInitialState<NewsPageSchema>({
    entities: {},
    ids: [],
    view: defaultListView,
  }),
  reducers: {
    setView(state, action: PayloadAction<NewsListVariant>) {
      state.view = action.payload;
      localStorage.setItem(NEWS_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchNewsList.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        newsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchNewsList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: newsPageActions } = newsPageSlice;
export const { reducer: newsPageReducer } = newsPageSlice;
