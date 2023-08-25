import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileState } from './getProfileState';
import { ProfileValidationError } from '../../types/editableProfileCard';

describe('getProfileState', () => {
  test('should return profile state', () => {
    const profile = {
      form: {
        firstName: 'first name form',
        lastName: 'last name form',
        login: 'login form'
      },
      data: {
        firstName: 'first name',
        lastName: 'last name',
        login: 'login'
      },
      error: 'error',
      isLoading: true,
      readonly: false,
      validationErrors: [ProfileValidationError.NO_DATA, ProfileValidationError.SERVER_ERROR]
    };
    const state: DeepPartial<StateSchema> = {
      profile: profile
    };

    expect(getProfileState(state as StateSchema)).toEqual(profile);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileState(state as StateSchema)).toEqual(undefined);
  });
});
