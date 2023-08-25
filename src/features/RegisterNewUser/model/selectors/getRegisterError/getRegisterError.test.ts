import { StateSchema } from '@/app/providers/StoreProvider';
import { getRegisterError } from './getRegisterError';

describe('getRegisterError', () => {
  test('should return register error', () => {
    const state: DeepPartial<StateSchema> = {
      registerForm: {
        error: 'error text'
      }
    };

    expect(getRegisterError(state as StateSchema)).toBe('error text');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getRegisterError(state as StateSchema)).toEqual(undefined);
  });
});
