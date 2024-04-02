import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Dorm } from '@/entities/Dorm';
import { getBlocks } from '@/entities/Block';

import { RoomWithDormId } from '../../types/studentSettlement.schema';

export const initStudentSettlement = createAsyncThunk<
  { dorms: Dorm[]; rooms: RoomWithDormId[] },
  void,
  ThunkConfig<string>
>('news/initStudentSettlement', async (_, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI;
  try {
    const dorms = (await extra.api.get<Dorm[]>('dorm')).data;
    const blocks = await dispatch(getBlocks()).unwrap();

    if (!dorms) {
      return rejectWithValue('dorms not found');
    }
    if (!blocks) {
      return rejectWithValue('blocks not found');
    }

    const rooms = blocks.flatMap((block) =>
      block.rooms.map((room) => ({
        ...camelcaseKeys(room as Record<string, any>),
        dormId: block.dorm.id
      }))
    ) as RoomWithDormId[];

    return { dorms, rooms };
  } catch (error) {
    const typedError = error as AxiosError;
    return thunkAPI.rejectWithValue(typedError.response?.statusText || typedError.message);
  }
});
