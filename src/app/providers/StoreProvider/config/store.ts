/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { api } from 'shared/api/api';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './stateTypes';

// initialState - for tests
export function createReduxStore(
  initialState?: StateSchema, 
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);
  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS__DEV__,
    preloadedState: initialState,
    middleware: (defaultMiddleware) => defaultMiddleware({
      thunk: {
        extraArgument: {
          api,
        },
      },
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
