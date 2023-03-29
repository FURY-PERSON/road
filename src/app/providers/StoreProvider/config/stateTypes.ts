import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject, 
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { ProfileSchema } from 'features/EditableProfileCard';
import { RegisterSchema } from 'features/RegisterNewUser/model/types/register.schema';

export interface StateSchema {
  counter: CounterSchema,
  user: UserSchema,

  // async reducers
  loginForm?: LoginSchema,
  registerForm?: RegisterSchema,
  profile?: ProfileSchema,
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager?: ReducerManager
}

export interface ThunkExtra {
  api: AxiosInstance,
}

export interface ThunkConfig<T> {
  rejectValue: T, 
  extra: ThunkExtra,
  state: StateSchema
}
