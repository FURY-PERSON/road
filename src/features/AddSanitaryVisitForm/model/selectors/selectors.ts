import { StateSchema } from '@/app/providers/StoreProvider';

export const getSelectedBlockId = (state: StateSchema) => state.addSanitaryVisit?.blockId;

export const getSelectedVisitDate = (state: StateSchema) => state.addSanitaryVisit?.visitDate;

export const getLoading = (state: StateSchema) => state.addSanitaryVisit?.isLoading;

export const getError = (state: StateSchema) => state.addSanitaryVisit?.error;

export const getBlockIdEditable = (state: StateSchema) => state.addSanitaryVisit?.blockIdEditable;
