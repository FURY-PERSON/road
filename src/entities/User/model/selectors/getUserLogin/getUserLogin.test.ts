import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserLogin } from './getUserLogin';

describe('getUserLogin', () => {
  test('should return user login', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: {
          login: 'admin'
        }
      }
    };

    expect(getUserLogin(state as StateSchema)).toBe('admin');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {}
    };

    expect(getUserLogin(state as StateSchema)).toEqual(undefined);
  });
});
