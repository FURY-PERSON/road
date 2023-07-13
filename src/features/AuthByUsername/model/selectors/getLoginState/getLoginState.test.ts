import { StateSchema } from "@/app/providers/StoreProvider";
import { getLoginState } from "./getLoginState";

describe('Get login state', () => {
  test('should return login state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: 'error',
        isLoading: true,
        password: '1234',
        login: 'login'
      }
    };

    expect(getLoginState(state as StateSchema)).toEqual({
      error: 'error',
      isLoading: true,
      password: '1234',
      login: 'login'
    });
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {}
    };

    expect(getLoginState(state as StateSchema)).toEqual({});
  });
});