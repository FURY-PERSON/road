import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { News, NewsListVariant, NewsSort } from 'entities/News';
import { NEWS_VIEW_LOCALSTORAGE_KEY } from 'shared/constant/localstorage';
import { SortOrder } from 'shared/types/sort';
import { NewsType } from 'entities/News/model/types/news';
import { fetchNewsList } from '../services/fetchNewsList/fetchNewsList';
import { NewsPageSchema } from '../types/newsPageSchema';

const newsAdapter = createEntityAdapter<News>({
  selectId: (news) => news.id,
});

export const getNews = newsAdapter.getSelectors<StateSchema>(
  (state) => state.newsPage || newsAdapter.getInitialState(),
);

const defaultListView = localStorage.getItem(NEWS_VIEW_LOCALSTORAGE_KEY) as NewsListVariant || NewsListVariant.BLOCK;
const defaultLimit = defaultListView === NewsListVariant.LIST ? 12 : 24;

export const newsPageSlice = createSlice({
  name: 'newsPage',
  initialState: newsAdapter.getInitialState<NewsPageSchema>({
    entities: {},
    ids: [],
    view: defaultListView,
    hasMore: false,
    limit: defaultLimit,
    page: 1,
    sort: NewsSort.TITLE,
    order: 'ASC',
    search: '',
    type: NewsType.ALL,

    _inited: false,
  }),
  reducers: {
    setView(state, action: PayloadAction<NewsListVariant>) {
      state.view = action.payload;
      localStorage.setItem(NEWS_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload;
    },
    setSort(state, action: PayloadAction<NewsSort>) {
      state.sort = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setType(state, action: PayloadAction<NewsType>) {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          newsAdapter.removeAll(state);
        }
      })
      .addCase(fetchNewsList.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        state.hasMore = action.payload.totalPage > state.page;
        state._inited = true;
        
        if (action.meta.arg.replace) {
          newsAdapter.setAll(state, action.payload.news);
        } else {
          newsAdapter.addMany(state, action.payload.news);
        }
      })
      .addCase(fetchNewsList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: newsPageActions } = newsPageSlice;
export const { reducer: newsPageReducer } = newsPageSlice;
