import { Role } from "entities/Role";
import { AuthTokens, User } from "entities/User";
import { registerNewUser } from "../services/registerNewUser/registerNewUser";
import { ValidationError } from "../types/error";
import { RegisterForm, RegisterSchema } from "../types/register.schema";
import { initialForm, registerActions, registerReducer } from "./register.slice";

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


describe('profile.slice', () => {
  test('should set login', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setLogin('admin123'))).toEqual({
      form: {
        login: 'admin123'
      }
    })
  });

  test('should set password', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setPassword('password'))).toEqual({
      form: {
        password: 'password'
      }
    })
  });

  test('should set confirmPassword', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setConfirmPassword('confirmPassword'))).toEqual({
      form: {
        confirmPassword: 'confirmPassword'
      }
    })
  });

  test('should set firstName', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setFirstName('firstName'))).toEqual({
      form: {
        firstName: 'firstName'
      }
    })
  });

  test('should set secondName', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setSecondName('lastName'))).toEqual({
      form: {
        lastName: 'lastName'
      }
    })
  });

  test('should set phone', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setPhone('+375'))).toEqual({
      form: {
        phone: '+375'
      }
    })
  });

  test('should set role', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setRole(Role.ADMIN))).toEqual({
      form: {
        role: Role.ADMIN
      }
    })
  });

  test('should set email', () => {
    const state: DeepPartial<RegisterSchema> = {
      form: {}
    };

    expect(registerReducer(state as RegisterSchema, registerActions.setEmail('email@gmail.com'))).toEqual({
      form: {
        email: 'email@gmail.com'
      }
    })
  });



  test('should register new user pending', () => {
    const state: DeepPartial<RegisterSchema> = {
      isLoading: false,
      validationError: [ValidationError.SERVER_ERROR]
    };

    expect(registerReducer(state as RegisterSchema, registerNewUser.pending)).toEqual({
      isLoading: true,
      validationErrors: undefined
    })
  });

  test('should register new user fulfilled ', () => {
    const state: DeepPartial<RegisterSchema> = {
      form
    };

    expect(registerReducer(state as RegisterSchema, registerNewUser.fulfilled(user, ''))).toEqual({
      form: initialForm,
      validationError: undefined,
      isLoading: false,
      error: undefined,
    })
  });

  test('should register new user rejected ', () => {
    const state: DeepPartial<RegisterSchema> = {
      form
    };

    expect(registerReducer(state as RegisterSchema, registerNewUser.rejected)).toEqual({
      form,
      isLoading: false,
      error: undefined,
    })
  });
});