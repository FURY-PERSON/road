import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from '@/app/providers/StoreProvider';
import { StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider/config/stateTypes';
import { FC, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
  [key in StateSchemaKey]?: Reducer<NonNullable<StateSchema[key]>>
}

interface DynamicModuleLoaderProps {
  children: any;
  reducers: ReducersList;
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader:FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children, reducers, removeAfterUnmount = true, 
  } = props;
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useLayoutEffect(() => {
    const mountedReducers = store.reducerManager?.getMountedReducers();

    Object.entries(reducers).forEach(([reducerName, reducer]) => {
      const mounted = mountedReducers?.[reducerName];

      if (!mounted) {
        store.reducerManager?.add(reducerName as StateSchemaKey, reducer);
        if (__IS__DEV__) {
          dispatch({ type: `@APP_INIT ${reducerName} reducer` });
        }
      }
    });

    return () => {
      if (!removeAfterUnmount) return;

      Object.entries(reducers).forEach(([reducerName]) => {
        store.reducerManager?.remove(reducerName as StateSchemaKey);
        if (__IS__DEV__) {
          dispatch({ type: `@APP_DESTROY ${reducerName} reducer` });
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    children
  );
};
