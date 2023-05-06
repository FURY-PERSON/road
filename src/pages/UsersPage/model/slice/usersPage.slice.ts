import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { SortOrder } from 'shared/types/sort';
import { StateSchema } from 'app/providers/StoreProvider';
import { User } from 'entities/User';
import { fetchUsersList } from '../services/fetchUsersList/fetchUsersList';
import { UsersPageSchema } from '../types/usersPageSchema';

const defaultLimit = 12;

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export const getUsers = usersAdapter.getSelectors<StateSchema>(
  (state) => state.usersPage || usersAdapter.getInitialState(),
);

export const usersPageSlice = createSlice({
  name: 'usersPage',
  initialState: usersAdapter.getInitialState<UsersPageSchema>({
    entities: {},
    ids: [],
    hasMore: false,
    limit: defaultLimit,
    page: 1,
  
    order: 'ASC',
    search: '',
    /*   sort: NewsSort.TITLE,
    type: NewsType.ALL, */
  
    _inited: false,
  }),
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          usersAdapter.removeAll(state);
        }
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        state.hasMore = action.payload.totalPage > state.page;
        state._inited = true;
        
        if (action.meta.arg.replace) {
          usersAdapter.setAll(state, action.payload.users);
        } else {
          usersAdapter.addMany(state, action.payload.users);
        }
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: usersPageActions } = usersPageSlice;
export const { reducer: usersPageReducer } = usersPageSlice;
