import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { SortOrder } from '@/shared/types/sort';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Block } from '@/entities/Block';

import { fetchList } from '../services/fetchList/fetchList';
import { BlocksPageSchema } from '../types/blocksPageSchema';

const defaultLimit = 12;

const blocksAdapter = createEntityAdapter<Block>({
  selectId: (block) => block.id
});

export const getBlocks = blocksAdapter.getSelectors<StateSchema>(
  (state) => state.blocksPage || blocksAdapter.getInitialState()
);

export const blocksPageSlice = createSlice({
  name: 'blocksPage',
  initialState: blocksAdapter.getInitialState<BlocksPageSchema>({
    entities: {},
    ids: [],
    hasMore: false,
    limit: defaultLimit,
    page: 1,

    order: 'ASC',
    number: '',
    floor: 'none',

    _inited: false
  }),
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload;
    },
    setNumber(state, action: PayloadAction<string>) {
      state.number = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setFloor(state, action: PayloadAction<string | undefined>) {
      state.floor = action.payload;
    },
    reset() {
      return blocksAdapter.getInitialState<BlocksPageSchema>({
        entities: {},
        ids: [],
        hasMore: false,
        limit: defaultLimit,
        page: 1,

        order: 'ASC',
        number: '',
        floor: 'none',

        _inited: false
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          blocksAdapter.removeAll(state);
        }
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.error = '';
        state.isLoading = false;
        state.hasMore = action.payload.totalPage > state.page;
        state._inited = true;

        if (action.meta.arg.replace) {
          blocksAdapter.setAll(state, action.payload.blocks);
        } else {
          blocksAdapter.addMany(state, action.payload.blocks);
        }
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: blocksPageActions } = blocksPageSlice;
export const { reducer: blocksPageReducer } = blocksPageSlice;
