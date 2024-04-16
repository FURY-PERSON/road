/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { api } from '@/shared/api/api';
import { ReducersList } from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { saveScrollReducer } from '@/widgets/SaveScroll';
import { rtkApi, settlementRtkApi } from '@/shared/api/rtkApi';

import { createReducerManager } from './reducerManager';
import { StateSchema } from './stateTypes';

// initialState - for tests
export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersList) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...(asyncReducers as any), // TODO fix types
    counter: counterReducer,
    user: userReducer,
    saveScroll: saveScrollReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
    [settlementRtkApi.reducerPath]: settlementRtkApi.reducer
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS__DEV__,
    preloadedState: initialState,
    middleware: (defaultMiddleware) =>
      defaultMiddleware({
        thunk: {
          extraArgument: {
            api
          }
        }
      }).concat(rtkApi.middleware, settlementRtkApi.middleware)
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
