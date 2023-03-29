import { Role } from "entities/Role";
import { AuthTokens, User, userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk";
import { ValidationError } from "../../types/error";
import { RegisterForm } from "../../types/register.schema";
import { registerNewUser } from "./registerNewUser";

const form:RegisterForm = {
  confirmPassword: '12345',
  email: 'email@gmail.com',
  firstName: 'first',
  lastName: 'last',
  login: 'admin',
  password: '12345',
  phone: '+37533455644',
  role: Role.ADMIN
}
const user: User = {
  login: 'admin',
  id: '23'
}

const tokens: AuthTokens = {
  accessToken: 'sdfsdfsdfsdfs TEST sdgsdgdsfg',
  refreshToken: 'sdfsvwwtfg TEST sdfgsdf s'
}

describe('registerNewUser', () => {
  test('success', async () => {

    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form
      }
    });
    thunk.api.post.mockReturnValue(Promise.resolve({data: {user, tokens}}))

    const result = await thunk.callThunk()

    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(tokens));
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUserData(user));

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(user);
  });

  test('empty user from server', async () => {
    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form
      }
    });
    thunk.api.post.mockReturnValue(Promise.resolve({data: {tokens}}))

    const result = await thunk.callThunk()

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('User not found');
  });

  test('empty tokens from server', async () => {
    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form
      }
    });
    thunk.api.post.mockReturnValue(Promise.resolve({data: {user}}))

    const result = await thunk.callThunk()

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Tokens do not provided');
  });

  test('validation error', async () => {
    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form: {
          ...form,
          login: undefined
        }
      }
    });
    thunk.api.post.mockReturnValue(Promise.resolve({data: {user, tokens}}))

    const result = await thunk.callThunk()

    expect(thunk.api.post).toHaveBeenCalledTimes(0);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ValidationError.USER_DATA
    ]);
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form: form
      }
    });
    thunk.api.post.mockReturnValue(Promise.reject())


    const result = await thunk.callThunk()

    expect(thunk.api.post).toBeCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });

});