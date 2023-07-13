import { TestAsyncThunk } from "@/shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk";
import { ProfileValidationError } from "../../types/editableProfileCard";
import { updateProfile } from "./updateProfileData";

describe('updateProfile', () => {
  test('success', async () => {
    const profileFormValue = {login: 'admin', firstName: 'firstName', lastName: 'lastName'}
    const thunk = new TestAsyncThunk(updateProfile, {
      profile: {
        form: profileFormValue
      }
    });
    thunk.api.put.mockReturnValue(Promise.resolve({data: profileFormValue}))

    const result = await thunk.callThunk()

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(profileFormValue);
  });

  test('validation error', async () => {
    const profileFormValue = {login: 'admin', firstName: '', lastName: 'lastName'}
    const thunk = new TestAsyncThunk(updateProfile, {
      profile: {
        form: profileFormValue
      }
    });
    thunk.api.put.mockReturnValue(Promise.resolve({data: profileFormValue}))

    const result = await thunk.callThunk()

    expect(thunk.api.put).toHaveBeenCalledTimes(0);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ProfileValidationError.USER_DATA
    ]);
  });

  test('server error', async () => {
    const profileFormValue = {login: 'admin', firstName: 'firstName', lastName: 'lastName'}
    const thunk = new TestAsyncThunk(updateProfile, {
      profile: {
        form: profileFormValue
      }
    });
    thunk.api.put.mockReturnValue(Promise.resolve({status: 403}))

    const result = await thunk.callThunk()

    expect(thunk.api.put).toBeCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });

});