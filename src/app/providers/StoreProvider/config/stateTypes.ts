import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject, 
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { NewsDetailsSchema } from 'entities/News';
import { UserSchema } from 'entities/User';
import { AddCommentFormSchema } from 'features/AddNewComment';
import { LoginSchema } from 'features/AuthByUsername';
import { ProfileSchema } from 'features/EditableProfileCard';
import { NewsDetailsCommentsSchema } from 'features/NewsDetailsCommentList';
import { RegisterSchema } from 'features/RegisterNewUser/model/types/register.schema';
import { NewsPageSchema } from 'pages/NewsPage/model/types/newsPageSchema';
import { SaveScrollSchema } from 'widgets/SaveScroll';

export interface StateSchema {
  counter: CounterSchema,
  user: UserSchema,
  saveScroll: SaveScrollSchema,

  // async reducers
  loginForm?: LoginSchema,
  registerForm?: RegisterSchema,
  profile?: ProfileSchema,
  newsDetails?: NewsDetailsSchema,
  newsDetailsComments?: NewsDetailsCommentsSchema,
  addCommentForm?: AddCommentFormSchema
  newsPage?: NewsPageSchema
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers
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
