import { StateSchema } from '@/app/providers/StoreProvider';
import { RoleName } from '@/entities/Role';
import { initialForm } from '../../slice/register.slice';
import { RegisterForm, RegisterSchema } from '../../types/register.schema';
import { getRegisterState } from './getRegisterState';

describe('getRegisterForm', () => {
  test('should return register from state', () => {
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

    const registerFromState: RegisterSchema = {
      form: form,
      error: undefined,
      isLoading: true,
      validationError: undefined
    };
    const state: DeepPartial<StateSchema> = {
      registerForm: registerFromState
    };

    expect(getRegisterState(state as StateSchema)).toEqual(registerFromState);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getRegisterState(state as StateSchema)).toBe(undefined);
  });
});
