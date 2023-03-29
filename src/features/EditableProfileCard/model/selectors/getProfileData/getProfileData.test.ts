import { StateSchema } from "app/providers/StoreProvider";
import { getProfileData } from "./getProfileData";

describe('getProfileData', () => {
  test('should return profile data', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        data: {
          firstName: 'first name',
          lastName: 'last name',
          login: 'login'
        }
      }
    };

    expect(getProfileData(state as StateSchema)).toEqual({
      firstName: 'first name',
      lastName: 'last name',
      login: 'login'
    });
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {

    };

    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});