import { PermissionName } from '@/entities/Permission';
import { RoleName } from '@/entities/Role';
import { AuthTokens, User, userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { LoginSchema } from '../../types/login.schema';
import { loginByUsername } from './loginByUsername';
import { setFeatureFlags } from '@/shared/lib/helpers/features/lib/featureFlag';

jest.mock('@/shared/constant/featureFlag')

const tokens: AuthTokens = {
  accessToken: 'asdasd',
  refreshToken: 'sdfsdfsdf'
};
const user: User = {
  login: 'admin',
  id: '23',
  firstName: 'first',
  lastName: 'last',
  permissions: [
    {
      description: 'desc',
      id: '123',
      name: PermissionName.ADMIN
    }
  ],
  role: {
    description: 'desc',
    name: RoleName.STUDENT
  }
};

const userForm: DeepPartial<LoginSchema> = { login: 'admin', password: '12345' };

describe('Get login state', () => {
  /*   let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  })

  test('success login', async () => {
    const userValue = {login: 'admin', id: '1'}
    mockedAxios.post.mockReturnValue(Promise.resolve({data: userValue}))

    const action = loginByUsername({login: 'admin', password: 'admin'});
    const result = await action(dispatch, getState, undefined)

    expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('403 from server', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({status: 403}))

    const action = loginByUsername({login: 'admin', password: 'admin'});
    const result = await action(dispatch, getState, undefined)

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  }); */

  test('success', async () => {
    const thunk = new TestAsyncThunk(loginByUsername, {
      loginForm: userForm
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data: { user: user, tokens: tokens } }));

    const result = await thunk.callThunk();

    expect(thunk.api.post).toHaveBeenCalled();
    expect(setFeatureFlags).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(tokens));
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUserData(user));
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

  /*   test('server axios error', async () => {
    const thunk = new TestAsyncThunk(loginByUsername, {
      loginForm: userForm
    });

    const error = new AxiosError("Unauthorized","401",{} as any,{},
    {
      data: { message: 'Axios Error from server' },
      status:401,
      statusText:'Unauthorized',
      headers:{},
      config:{} as any
    })

    thunk.api.post.mockRejectedValueOnce(error)

    const result = await thunk.callThunk()

    expect(thunk.api.post).toBeCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Axios Error from server');
  }); */

  test('server not axios error', async () => {
    const thunk = new TestAsyncThunk(loginByUsername, {
      loginForm: userForm
    });
    const err = new Error('Not Axios Error from server');
    thunk.api.post.mockRejectedValueOnce(Promise.resolve(err));

    const result = await thunk.callThunk();

    expect(thunk.api.post).toBeCalled();
    expect(setFeatureFlags).not.toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Unexpected login error');
  });
});
