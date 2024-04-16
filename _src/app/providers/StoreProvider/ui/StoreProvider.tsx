import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { ReducersList } from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';

import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/stateTypes';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: StateSchema;
  asyncReducers?: ReducersList;
}

// eslint-disable-next-line import/no-mutable-exports
export let appStore;

export const StoreProvider: FC<StoreProviderProps> = (props) => {
  const { children, initialState, asyncReducers } = props;

  const store = createReduxStore(initialState, asyncReducers);
  appStore = store;

  return <Provider store={store}>{children}</Provider>;
};
