import { PermissionName } from '@/entities/Permission';
import { RoleName } from '@/entities/Role';
import { AuthTokens, User, userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { ValidationError } from '../../types/error';
import { RegisterForm } from '../../types/register.schema';
import { registerNewUser } from './registerNewUser';
import { setFeatureFlags } from '@/shared/lib/helpers/features/lib/featureFlag';

jest.mock('@/shared/lib/helpers/features/lib/featureFlag')

const form: RegisterForm = {
  confirmPassword: '12345',
  email: 'email@gmail.com',
  firstName: 'first',
  lastName: 'last',
  login: 'admin',
  password: '12345',
  phone: '+37533455644',
  role: RoleName.ADMIN
};
const user: User = {
  login: 'admin',
  id: '23',
  firstName: 'first',
  lastName: 'last',
  block: {
    "id": "09c10e70-d095-4f1f-91b8-1d8c39b4a23d",
    "number": "415",
    "floor": 4,
    "dorm": {
      "id": "f92c9a02-b3f5-463e-9e58-7df4e0988601",
      "name": "DORM 12",
      "address": "DORM 12",
      "phone": "+375445288343",
      "email": "Dorm@gmail.com",
      "imageName": "6fd0a59a-9f6b-47ac-bf6d-6ca76a14ed64.jpg",
      "imageUrl": "http://localhost:3005/6fd0a59a-9f6b-47ac-bf6d-6ca76a14ed64.jpg"
    },
    "rooms": [],
    "tenants": [
    ]
  },
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

const tokens: AuthTokens = {
  accessToken: 'sdfsdfsdfsdfs TEST sdgsdgdsfg',
  refreshToken: 'sdfsvwwtfg TEST sdfgsdf s'
};

describe('registerNewUser', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form
      }
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data: { user, tokens } }));

    const result = await thunk.callThunk();

    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(tokens));
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUserData(user));
    expect(setFeatureFlags).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(user);
  });

  test('empty user from server', async () => {
    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form
      }
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data: { tokens } }));

    const result = await thunk.callThunk();

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('User not found');
    expect(setFeatureFlags).not.toHaveBeenCalled();
  });

  test('empty tokens from server', async () => {
    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form
      }
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data: { user } }));

    const result = await thunk.callThunk();

    expect(thunk.api.post).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('Tokens do not provided');
    expect(setFeatureFlags).not.toHaveBeenCalled();
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
    thunk.api.post.mockReturnValue(Promise.resolve({ data: { user, tokens } }));

    const result = await thunk.callThunk();

    expect(thunk.api.post).toHaveBeenCalledTimes(0);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidationError.USER_DATA]);
    expect(setFeatureFlags).not.toHaveBeenCalled();
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(registerNewUser, {
      registerForm: {
        form: form
      }
    });
    thunk.api.post.mockReturnValue(Promise.reject());

    const result = await thunk.callThunk();

    expect(thunk.api.post).toBeCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(setFeatureFlags).not.toHaveBeenCalled();
  });
});
