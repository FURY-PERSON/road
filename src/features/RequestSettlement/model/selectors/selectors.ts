import { StateSchema } from '@/app/providers/StoreProvider';

export const getStudentId = (state: StateSchema) => state.user.userData?.id;

export const getTargetDormId = (state: StateSchema) => state.requestSettlementForm?.targetDormId;

export const getBenefits = (state: StateSchema) => state.requestSettlementForm?.benefits;
