import { StateSchema } from "app/providers/StoreProvider";
import { Role } from "entities/Role";
import { initialForm } from "../../slice/register.slice";
import { RegisterForm } from "../../types/register.schema";
import { getRegisterForm } from "./getRegisterForm";

describe('getRegisterForm', () => {
  test('should return register from state', () => {
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
    const state: DeepPartial<StateSchema> = {
      registerForm: {
        form: form
      }
    };

    expect(getRegisterForm(state as StateSchema)).toEqual(form);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {

    };

    expect(getRegisterForm(state as StateSchema)).toEqual(initialForm);
  });
});