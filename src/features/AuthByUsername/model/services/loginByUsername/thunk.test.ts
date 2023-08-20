import { myFunc } from './thunk';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

describe('67087596', () => {
  it('should pass', async () => {
    console.log(1);
    const nameAndEmail = {
      name: 'John Smith',
      email: '123@123.com'
    };
    console.log(2);
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: { id: '1' } });
    console.log(3);
    const store = configureStore({
      reducer: function (state = '', action) {
        switch (action.type) {
          case 'returns ID/fulfilled':
            return action.payload;
          default:
            return state;
        }
      }
    });
    console.log(4);
    await store.dispatch(myFunc(nameAndEmail));
    console.log(5);
    expect(postSpy).toBeCalledWith('/backendroute', nameAndEmail);
    const state = store.getState();
    expect(state).toEqual('1');
  });
});
