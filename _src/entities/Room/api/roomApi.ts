import { rtkApi } from '@/shared/api/rtkApi';

import { Room } from '../model/types/room';

const roomApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getRoomInfo: build.query<Room, { roomId: string }>({
      providesTags: ['room'],
      query: (args) => ({
        url: `room/${args.roomId}`
      })
    }),

    addTenantToRoom: build.mutation<Room, { roomId: string; userLogin: string }>({
      query: (args) => ({
        url: `room/user/${args.roomId}`,
        method: 'PUT',
        body: {
          userLogin: args.userLogin
        }
      })
    }),

    deleteTenantFromRoom: build.mutation<Room, { roomId: string; userLogin: string }>({
      query: (args) => ({
        url: `room/user/${args.roomId}`,
        method: 'DELETE',
        body: {
          userLogin: args.userLogin
        }
      })
    })
  }),
  overrideExisting: false
});

export const useGetRoomInfo = roomApi.useGetRoomInfoQuery;
export const refetchRoomInfo = roomApi.util.invalidateTags(['room', 'block']);

export const addUserToRoom = roomApi.endpoints.addTenantToRoom.initiate;

export const deleteUserFromRoom = roomApi.endpoints.deleteTenantFromRoom.initiate;
