import { StateSchema } from '@/app/providers/StoreProvider';
import { getRegisterLoading } from './getRegisterLoading';

describe('getRegisterLoading', () => {
  test('should return register loading - true', () => {
    const state: DeepPartial<StateSchema> = {
      registerForm: {
        isLoading: true
      }
    };

    expect(getRegisterLoading(state as StateSchema)).toBe(true);
  });

  test('should return register loading - false', () => {
    const state: DeepPartial<StateSchema> = {
      registerForm: {
        isLoading: false
      }
    };

    expect(getRegisterLoading(state as StateSchema)).toBe(false);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getRegisterLoading(state as StateSchema)).toBe(undefined);
  });
});
