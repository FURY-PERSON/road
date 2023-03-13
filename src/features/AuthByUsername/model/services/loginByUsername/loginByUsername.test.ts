import { Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import axios from "axios";
import { userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk";
import { loginByUsername } from "./loginByUsername";

jest.mock('axios')

const mockedAxios = jest.mocked(axios);

describe('Get login state', () => {
/*   let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  })

  test('success login', async () => {
    const userValue = {username: 'admin', id: '1'}
    mockedAxios.post.mockReturnValue(Promise.resolve({data: userValue}))

    const action = loginByUsername({username: 'admin', password: 'admin'});
    const result = await action(dispatch, getState, undefined)

    expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('403 from server', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({status: 403}))

    const action = loginByUsername({username: 'admin', password: 'admin'});
    const result = await action(dispatch, getState, undefined)

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  }); */

  test('403 from server', async () => {
    const userValue = {username: 'admin', id: '1'}
    mockedAxios.post.mockReturnValue(Promise.resolve({data: userValue}))

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({username: 'admin', password: '1'})

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData({username: 'admin', id: '1'}))
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
  });

});