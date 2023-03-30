import { RoleName } from "entities/Role/types/role";
import { ValidationError } from "../../types/error";
import { RegisterForm } from "../../types/register.schema";
import { validateForm } from "./validateForm";

const form:RegisterForm = {
  confirmPassword: '12345',
  password: '12345',
  email: 'email@gmail.com',
  firstName: 'first',
  lastName: 'last',
  login: 'admin',
  phone: '+37533455644',
  role: RoleName.ADMIN
}

describe('register validateForm', () => {
  test('success', async () => {
    expect(validateForm(form)).toEqual([])
  });

  test('with firstName error', async () => {
    expect(validateForm({...form, firstName: undefined})).toEqual([
      ValidationError.USER_DATA
    ])
  });

  test('with lastName error', async () => {
    expect(validateForm({...form, lastName: undefined})).toEqual([
      ValidationError.USER_DATA
    ])
  });

  test('with lastName and firstName error', async () => {
    expect(validateForm({...form, firstName: undefined, lastName: undefined})).toEqual([
      ValidationError.USER_DATA
    ])
  });

  test('with login error', async () => {
    expect(validateForm({...form, login: undefined})).toEqual([
      ValidationError.USER_DATA
    ])
  });

  test('with email error', async () => {
    expect(validateForm({...form, email: undefined})).toEqual([
      ValidationError.USER_DATA
    ])
  });

  test('with password error', async () => {
    expect(validateForm({...form, password: undefined})).toEqual([
      ValidationError.USER_DATA,
      ValidationError.PASSWORD_MATCH
    ])
  });

  test('with confirm password error', async () => {
    expect(validateForm({...form, confirmPassword: undefined})).toEqual([
      ValidationError.USER_DATA,
      ValidationError.PASSWORD_MATCH
    ])
  });

  test('with role error', async () => {
    expect(validateForm({...form, role: undefined})).toEqual([
      ValidationError.USER_DATA
    ])
  });

  test('with password do not match error', async () => {
    expect(validateForm({...form, confirmPassword: '123', password: '1111'})).toEqual([
      ValidationError.PASSWORD_MATCH,
    ])
  });

  test('with multiply errors', async () => {
    expect(validateForm({...form, confirmPassword: '123', password: '1111', login: undefined})).toEqual([
      ValidationError.USER_DATA, ValidationError.PASSWORD_MATCH
    ])
  });

  test('with empty register error', async () => {
    expect(validateForm()).toEqual([
      ValidationError.NO_DATA
    ])
  });

});