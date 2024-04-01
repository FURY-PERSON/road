import { StateSchema } from '@/app/providers/StoreProvider';

export const getDorms = (state: StateSchema) => state.studentSettlementList?.dorms;

export const getRooms = (state: StateSchema) => state.studentSettlementList?.rooms;
