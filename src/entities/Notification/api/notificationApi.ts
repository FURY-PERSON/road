import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], null>({
      providesTags: ['notifications'],
      query: (limit) => ({
        url: 'notifications',
      }),
    }),
  }),
  overrideExisting: false,
});

export const useGetNotifications = notificationApi.useGetNotificationsQuery;
export const refetchNotifications = notificationApi.util.invalidateTags(['notifications']);
