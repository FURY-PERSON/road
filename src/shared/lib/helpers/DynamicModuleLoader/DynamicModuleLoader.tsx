import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/stateTypes';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
  [key in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
  children: any;
  reducers: ReducersList;
  removeAfterUnmount?: boolean
}

type ReducerListEntry = [StateSchemaKey, Reducer];

export const DynamicModuleLoader:FC<DynamicModuleLoaderProps> = (props) => {
  const {
    children, reducers, removeAfterUnmount, 
  } = props;
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducers).forEach(([reducerName, reducer]: ReducerListEntry) => {
      store.reducerManager.add(reducerName, reducer);
      if (__IS__DEV__) {
        dispatch({ type: `@INIT ${reducerName} reducer` });
      }
    });

    return () => {
      if (!removeAfterUnmount) return;

      Object.entries(reducers).forEach(([reducerName]: ReducerListEntry) => {
        store.reducerManager.remove(reducerName);
        if (__IS__DEV__) {
          dispatch({ type: `@DESTCROY ${reducerName} reducer` });
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    children
  );
};
