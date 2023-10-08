import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';

import { getInited } from '../../selectors/blocksPAge';
import { blocksPageActions } from '../../slice/blocksPage.slice';
import { fetchList } from '../fetchList/fetchList';

export const initPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  'block/initPage',
  async (data, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    const inited = getInited(getState());
    if (!inited) {
      const orderFromUrl = data.get('order') as SortOrder;
      const limitFromUrl = data.get('limit') as number | null;
      const pageFromUrl = data.get('page') as number | null;
      const floorFromUrl = data.get('floor') as string | 'none' | null;
      const numberFromUrl = data.get('number') as string | null;

      if (orderFromUrl) {
        dispatch(blocksPageActions.setOrder(orderFromUrl));
      }
      if (limitFromUrl) {
        dispatch(blocksPageActions.setLimit(limitFromUrl));
      }
      if (pageFromUrl) {
        dispatch(blocksPageActions.setPage(pageFromUrl));
      }
      if (numberFromUrl) {
        dispatch(blocksPageActions.setNumber(numberFromUrl));
      }
      if (floorFromUrl && floorFromUrl !== 'none') {
        dispatch(blocksPageActions.setFloor(floorFromUrl));
      }

      dispatch(fetchList({ page: 1 }));
    }
  }
);
