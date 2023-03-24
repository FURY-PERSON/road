import { ProfileValidationError } from "../../types/editableProfileCard";
import { validateProfileForm } from "./validateProfileForm";

describe('validateProfileForm', () => {
  test('success', async () => {
    const profileValue = {login: 'admin', firstName: 'firstName', lastName: 'lastName'}

    expect(validateProfileForm(profileValue)).toEqual([])
  });

  test('with firstName error', async () => {
    const profileValue = {login: 'admin', firstName: '', lastName: 'lastName'}

    expect(validateProfileForm(profileValue)).toEqual([
      ProfileValidationError.USER_DATA
    ])
  });

  test('with lastName error', async () => {
    const profileValue = {login: 'admin', firstName: 'firstName', lastName: ''}

    expect(validateProfileForm(profileValue)).toEqual([
      ProfileValidationError.USER_DATA
    ])
  });

  test('with lastName and firstName error', async () => {
    const profileValue = {login: 'admin', firstName: '', lastName: ''}

    expect(validateProfileForm(profileValue)).toEqual([
      ProfileValidationError.USER_DATA
    ])
  });

  test('with empty profile error', async () => {
    expect(validateProfileForm()).toEqual([
      ProfileValidationError.NO_DATA
    ])
  });

});