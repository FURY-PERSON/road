import { StateSchema } from '@/app/providers/StoreProvider';

export const getStudentId = (state: StateSchema) => state.user.userData?.id;

export const getDorms = (state: StateSchema) => state.requestSettlementForm?.dorms;

export const getTargetDorm = (state: StateSchema) => state.requestSettlementForm?.targetDorm;

export const getBenefits = (state: StateSchema) => state.requestSettlementForm?.benefits;
