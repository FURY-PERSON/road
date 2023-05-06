import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types/sort';
import { NewsSort, NewsType } from 'entities/News';
import { fetchNewsList } from '../fetchNewsList/fetchNewsList';
import { getNewsPageInited } from '../../selectors/getNewsPageInited/getNewsPageInited';
import { newsPageActions } from '../../slice/newsPage.slice';

export const initNewsPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'news/initNewsPage',
  async (data, thunkAPI) => {
    const {
      getState, dispatch,
    } = thunkAPI;

    const inited = getNewsPageInited(getState());
    if (!inited) {
      const orderFromUrl = data.get('order') as SortOrder;
      const limitFromUrl = data.get('limit') as number | null;
      const pageFromUrl = data.get('page') as number | null;
      const sortFromUrl = data.get('sort') as NewsSort | null;
      const searchFromUrl = data.get('search');
      const typeFromUrl = data.get('type') as NewsType;

      if (orderFromUrl) {
        dispatch(
          newsPageActions.setOrder(orderFromUrl),
        );
      } 
      if (limitFromUrl) {
        dispatch(
          newsPageActions.setLimit(limitFromUrl),
        );
      } 
      if (pageFromUrl) {
        dispatch(
          newsPageActions.setPage(pageFromUrl),
        );
      } 
      if (sortFromUrl) {
        dispatch(
          newsPageActions.setSort(sortFromUrl),
        );
      } 
      if (searchFromUrl) {
        dispatch(
          newsPageActions.setSearch(searchFromUrl),
        );
      } 
      if (typeFromUrl) {
        dispatch(
          newsPageActions.setType(typeFromUrl),
        );
      } 

      dispatch(fetchNewsList({ page: 1 }));
    }
  },
);
