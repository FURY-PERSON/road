import { loginByUsername } from "../services/loginByUsername/loginByUsername";
import { LoginSchema } from "../types/login.schema";
import { loginActions, loginReducer } from "./login.slice";

describe('login.slice', () => {
  test('should set login', () => {
    const state: DeepPartial<LoginSchema> = {};

    expect(loginReducer(state as LoginSchema, loginActions.setUsername('test'))).toEqual({login: 'test'})
  });

  test('should set password', () => {
    const state: DeepPartial<LoginSchema> = {};

    expect(loginReducer(state as LoginSchema, loginActions.setPassword('pass'))).toEqual({password: 'pass'})
  });

  test('should set isLoading', () => {
    const state: DeepPartial<LoginSchema> = {};

    expect(loginReducer(state as LoginSchema, loginByUsername.pending)).toEqual({isLoading: true})
  });

  test('should set error', () => {
    const state: DeepPartial<LoginSchema> = {};

    expect(loginReducer(state as LoginSchema, loginByUsername.rejected)).toEqual({isLoading: false, error: undefined})
  });
});