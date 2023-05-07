import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { User } from 'entities/User';
import { addQueryParams } from 'shared/lib/helpers/url/addQueryParam';
import {
  getApiLimit, getApiPage, getOrder, getRole, getSearch, getSort, 
} from '../../selectors/usersPage';
import { UsersRolesFilter } from '../../types/usersPage';

interface FetchUsersListProps {
  page?: number,
  replace?: boolean // use in slice
}

interface FetchUsersListResponse {
  users: User[]
  totalPage: number,
  totalAmount: number
}

export const fetchUsersList = createAsyncThunk<FetchUsersListResponse, FetchUsersListProps, ThunkConfig<string>>(
  'users/fetchUsersList',
  async (data, thunkAPI) => {
    const {
      extra, rejectWithValue, getState, 
    } = thunkAPI;

    const { page: pageProps } = data;
    const order = getOrder(getState());
    const search = getSearch(getState());
    const pageState = getApiPage(getState());
    const role = getRole(getState());
    const sort = getSort(getState());
 
    const limit = getApiLimit(getState());

    const pageNum = pageProps || pageState;

    try {
      addQueryParams({
        order, search, limit: String(limit), page: String(pageNum),
      });

      const response = await extra.api.get<User[]>('users', {
        params: {
          limit,
          page: pageNum,
          orderBy: order,
          login: search,
          role: role !== UsersRolesFilter.ALL ? role : undefined,
          sort
        },
      });
      const users = response.data; 
      const totalPage = response.headers['x-total-page'];
      const totalAmount = response.headers['x-total-item'];

      if (!users) {
        return rejectWithValue('Comments not found');
      }

      return { users, totalPage, totalAmount };
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('unhandled fetch users page error');
    }
  },
);
