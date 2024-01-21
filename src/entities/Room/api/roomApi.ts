import { rtkApi } from '@/shared/api/rtkApi';

import { Room } from '../model/types/room';

const roomApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getRoomInfo: build.query<Room, { roomId: string }>({
      providesTags: ['room'],
      query: (args) => ({
        url: `room/${args.roomId}`
      })
    })
  }),
  overrideExisting: false
});

export const useGetRoomInfo = roomApi.useGetRoomInfoQuery;
export const refetchRoomInfo = roomApi.util.invalidateTags(['room']);
