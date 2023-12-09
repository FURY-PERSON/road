import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { addQueryParams } from '@/shared/lib/helpers/url/addQueryParam';
import { Block } from '@/entities/Block';

import { getApiLimit, getApiPage, getOrder, getFloor, getNumber } from '../../selectors/blocksPAge';

interface FetchListProps {
  page?: number;
  replace?: boolean; // use in slice
}

interface FetchListResponse {
  blocks: Block[];
  totalPage: number;
  totalAmount: number;
}

export const fetchList = createAsyncThunk<FetchListResponse, FetchListProps, ThunkConfig<string>>(
  'block/fetchList',
  async (data, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const { page: pageProps } = data;
    const order = getOrder(getState());
    const number = getNumber(getState());
    const pageState = getApiPage(getState());
    const floor = getFloor(getState());

    const limit = getApiLimit(getState());

    const pageNum = pageProps || pageState;

    try {
      addQueryParams({
        order,
        number,
        limit: String(limit),
        page: String(pageNum),
        floor: String(floor)
      });

      const response = await extra.api.get<Block[]>('block', {
        params: {
          limit,
          page: pageNum,
          orderBy: order,
          floor: floor !== 'none' ? floor : undefined,
          number: number
        }
      });
      const blocks = response.data;
      const totalPage = response.headers['x-total-page'];
      const totalAmount = response.headers['x-total-item'];

      if (!blocks) {
        return rejectWithValue('blocks not found');
      }

      return { blocks, totalPage, totalAmount };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('unhandled fetch blocks page error');
    }
  }
);
