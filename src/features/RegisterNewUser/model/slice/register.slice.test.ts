import { PermissionName } from '@/entities/Permission';
import { RoleName } from '@/entities/Role';
import { AuthTokens, User } from '@/entities/User';
import { registerNewUser } from '../services/registerNewUser/registerNewUser';
import { ValidationError } from '../types/error';
import { RegisterForm, RegisterSchema } from '../types/register.schema';
import { initialForm, registerActions, registerReducer } from './register.slice';

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

describe('profile.slice', () => {
  test('should set login', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setLogin('admin123'))).toEqual({
      form: {
        login: 'admin123'
      }
    });
  });

  test('should set password', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(
      registerReducer(state as RegisterSchema, registerActions.setPassword('password'))
    ).toEqual({
      form: {
        password: 'password'
      }
    });
  });

  test('should set confirmPassword', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(
      registerReducer(
        state as RegisterSchema,
        registerActions.setConfirmPassword('confirmPassword')
      )
    ).toEqual({
      form: {
        confirmPassword: 'confirmPassword'
      }
    });
  });

  test('should set firstName', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(
      registerReducer(state as RegisterSchema, registerActions.setFirstName('firstName'))
    ).toEqual({
      form: {
        firstName: 'firstName'
      }
    });
  });

  test('should set secondName', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(
      registerReducer(state as RegisterSchema, registerActions.setSecondName('lastName'))
    ).toEqual({
      form: {
        lastName: 'lastName'
      }
    });
  });

  test('should set phone', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setPhone('+375'))).toEqual({
      form: {
        phone: '+375'
      }
    });
  });

  test('should set role', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(
      registerReducer(state as RegisterSchema, registerActions.setRole(RoleName.ADMIN))
    ).toEqual({
      form: {
        role: RoleName.ADMIN
      }
    });
  });

  test('should set email', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(
      registerReducer(state as RegisterSchema, registerActions.setEmail('email@gmail.com'))
    ).toEqual({
      form: {
        email: 'email@gmail.com'
      }
    });
  });

  test('should register new user pending', () => {
    const state: DeepPartial<RegisterSchema> = {
      isLoading: false,
      validationError: [ValidationError.SERVER_ERROR]
    };

    expect(registerReducer(state as RegisterSchema, registerNewUser.pending)).toEqual({
      isLoading: true,
      validationErrors: undefined
    });
  });

  test('should register new user fulfilled ', () => {
    const state: DeepPartial<RegisterSchema> = {
      form
    };

    expect(registerReducer(state as RegisterSchema, registerNewUser.fulfilled(user, ''))).toEqual({
      form: initialForm,
      validationError: undefined,
      isLoading: false,
      error: undefined
    });
  });

  test('should register new user rejected ', () => {
    const state: DeepPartial<RegisterSchema> = {
      form
    };

    expect(registerReducer(state as RegisterSchema, registerNewUser.rejected)).toEqual({
      form,
      isLoading: false,
      error: undefined
    });
  });
});
