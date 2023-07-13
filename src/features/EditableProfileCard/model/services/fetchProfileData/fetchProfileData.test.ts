import { TestAsyncThunk } from "@/shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchProfile } from "./fetchProfileData";


describe('fetchProfile data', () => {
  test('success', async () => {
    const profileValue = {login: 'admin', firstName: 'firstName', lastName: 'lastName'}
    const thunk = new TestAsyncThunk(fetchProfile);
    thunk.api.get.mockReturnValue(Promise.resolve({data: profileValue}))

    const result = await thunk.callThunk({login: 'admin'})

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(profileValue);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfile);
    thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))

    const result = await thunk.callThunk({login: 'admin'})

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });

});