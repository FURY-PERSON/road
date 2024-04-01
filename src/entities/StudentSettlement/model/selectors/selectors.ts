import { StateSchema } from '@/app/providers/StoreProvider';

export const getDorms = (state: StateSchema) => state.studentSettlementList?.dorms;
