import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Room, addUserToRoom, refetchRoomInfo } from '@/entities/Room';

import { getSelectedUserLogin } from '../../selectors/selectors';

export const addNewTenantToRoom = createAsyncThunk<Room, { roomId: string }, ThunkConfig<string>>(
  'addNewTenantToRoomFormFrom/addNewTenantToRoom',
  async (data, thunkAPI) => {
    const { roomId } = data;
    const { dispatch, rejectWithValue, getState } = thunkAPI;

    try {
      const userLogin = getSelectedUserLogin(getState());

      if (!roomId) {
        return rejectWithValue('Room id is required');
      }

      if (!userLogin) {
        return rejectWithValue('User login is required');
      }

      const response = await dispatch(
        addUserToRoom({ roomId: roomId, userLogin: userLogin })
      ).unwrap();

      dispatch(refetchRoomInfo);

      return response;
    } catch (error: any) {
      return rejectWithValue(String(error?.data?.message) || 'Can not add user to room');
    }
  }
);
