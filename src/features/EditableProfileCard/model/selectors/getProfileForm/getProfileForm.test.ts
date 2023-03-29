import { StateSchema } from "app/providers/StoreProvider";
import { getProfileForm } from "./getProfileForm";

describe('getProfileForm', () => {
  test('should return profile from', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: {
          firstName: 'first name',
          lastName: 'last name',
          login: 'login'
        }
      }
    };

    expect(getProfileForm(state as StateSchema)).toEqual({
      firstName: 'first name',
      lastName: 'last name',
      login: 'login'
    });
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {

    };

    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});