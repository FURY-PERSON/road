import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { News } from '@/entities/News';
import { addQueryParams } from '@/shared/lib/helpers/url/addQueryParam';
import { getNewsPageApiLimit } from '../../selectors/getNewsPageApiLimit/getNewsPageApiLimit';
import { getNewsPageSort } from '../../selectors/getNewsPageSort/getNewsPageSort';
import { getNewsPageOrder } from '../../selectors/getNewsPageOrder/getNewsPageOrder';
import { getNewsPageSearch } from '../../selectors/getNewsPageSearch/getNewsPageSearch';
import { getNewsPageApiPage } from '../../selectors/getNewsPageApiPage/getNewsPageApiPage';
import { getNewsPageType } from '../../selectors/getNewsPageType/getNewsPageType';

interface FetchNewsListProps {
  page?: number,
  replace?: boolean // use in slice
}

interface FetchNewsListResponse {
  news: News[]
  totalPage: number,
  totalAmount: number
}

export const fetchNewsList = createAsyncThunk<FetchNewsListResponse, FetchNewsListProps, ThunkConfig<string>>(
  'news/fetchNewsList',
  async (data, thunkAPI) => {
    const {
      extra, rejectWithValue, getState, 
    } = thunkAPI;

    const { page: pageProps } = data;
    const sort = getNewsPageSort(getState());
    const order = getNewsPageOrder(getState());
    const search = getNewsPageSearch(getState());
    const pageState = getNewsPageApiPage(getState());
    const type = getNewsPageType(getState());
 
    const limit = getNewsPageApiLimit(getState());

    const pageNum = pageProps || pageState;

    try {
      addQueryParams({
        order, sort, search, limit: String(limit), page: String(pageNum), type,
      });

      const response = await extra.api.get<News[]>('news', {
        params: {
          limit,
          page: pageNum,
          orderBy: order,
          sort: sort,
          title: search,
          type,
        },
      });
      const news = response.data; 
      const totalPage = response.headers['x-total-page'];
      const totalAmount = response.headers['x-total-item'];

      if (!news) {
        return rejectWithValue('Comments not found');
      }

      return { news, totalPage, totalAmount };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('unhandled fetch news page error');
    }
  },
);
