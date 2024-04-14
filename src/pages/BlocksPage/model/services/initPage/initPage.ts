import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';

import { getInited } from '../../selectors/blocksPage';
import { blocksPageActions } from '../../slice/blocksPage.slice';
import { fetchList } from '../fetchList/fetchList';

interface InitPageProps {
  searchParams: URLSearchParams;
  dormId?: string;
}

export const initPage = createAsyncThunk<void, InitPageProps, ThunkConfig<string>>(
  'block/initPage',
  async (data, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    const { dormId, searchParams } = data;

    if (!dormId) return;

    const inited = getInited(getState());
    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder;
      const limitFromUrl = searchParams.get('limit') as number | null;
      const pageFromUrl = searchParams.get('page') as number | null;
      const floorFromUrl = searchParams.get('floor') as string | 'none' | null;
      const numberFromUrl = searchParams.get('number') as string | null;

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

      dispatch(fetchList({ dormId, page: 1 }));
    }
  }
);
