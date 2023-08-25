import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserAuthData } from './getUserAuthData';

describe('getUserAuthData', () => {
  test('should return user auth data', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        authData: {
          accessToken: 'sdf',
          refreshToken: 'sdf'
        }
      }
    };

    expect(getUserAuthData(state as StateSchema)).toEqual({
      accessToken: 'sdf',
      refreshToken: 'sdf'
    });
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {}
    };

    expect(getUserAuthData(state as StateSchema)).toEqual(undefined);
  });
});
