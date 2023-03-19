import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/stateTypes';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: StateSchema;
  asyncReducers?: ReducersList;
}

export const StoreProvider:FC<StoreProviderProps> = (props) => {
  const {
    children, initialState, asyncReducers, 
  } = props;

  const store = createReduxStore(initialState, asyncReducers);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
