import { StateSchema } from '@/app/providers/StoreProvider';
import { ValidationError } from '../../types/error';
import { getRegisterValidationError } from './getRegisterValidationError';

describe('getRegisterValidationError', () => {
  test('should return register validation errors', () => {
    const state: DeepPartial<StateSchema> = {
      registerForm: {
        validationError: [ValidationError.NO_DATA, ValidationError.SERVER_ERROR]
      }
    };

    expect(getRegisterValidationError(state as StateSchema)).toEqual([
      ValidationError.NO_DATA,
      ValidationError.SERVER_ERROR
    ]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getRegisterValidationError(state as StateSchema)).toBe(undefined);
  });
});
