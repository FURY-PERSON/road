import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { Notification } from '../types/notification';
import { refetchNotifications } from '../../api/notificationApi';

export const markNotificationAsRead = createAsyncThunk<Notification, Notification, ThunkConfig<string>>(
  'notifications/markNotificationAsRead',
  async (notification, thunkAPI) => {
    const {
      extra, rejectWithValue, getState, dispatch
    } = thunkAPI;

    try {
      const response = await extra.api.get<Notification>(`notifications/${notification.id}`);
      dispatch(refetchNotifications)

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(error.response?.data.message || error.response?.statusText || error.message);
      }
      return thunkAPI.rejectWithValue('Unexpected mark as read request error');
    }
  },
);
