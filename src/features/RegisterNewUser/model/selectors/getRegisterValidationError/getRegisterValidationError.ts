import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterValidationError = (state: StateSchema) => state.registerForm?.validationError;
