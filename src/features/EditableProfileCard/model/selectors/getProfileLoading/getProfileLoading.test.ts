import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileLoading } from './getProfileLoading';

describe('getProfileLoading', () => {
  test('should return profile loading - true', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true
      }
    };

    expect(getProfileLoading(state as StateSchema)).toEqual(true);
  });

  test('should return profile loading - false', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: false
      }
    };

    expect(getProfileLoading(state as StateSchema)).toEqual(false);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileLoading(state as StateSchema)).toEqual(false);
  });
});
