import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/stateTypes';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: StateSchema;
  asyncReducers?: ReducersMapObject<StateSchema>
}

export const StoreProvider:FC<StoreProviderProps> = (props) => {
  const { children, initialState, asyncReducers } = props;

  const store = createReduxStore(initialState, asyncReducers);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
