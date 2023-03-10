import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { StateSchema } from './stateSchema';

// initialState - for tests
export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS__DEV__,
    preloadedState: initialState,
  });
}
