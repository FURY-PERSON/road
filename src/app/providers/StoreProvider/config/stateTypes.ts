import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { CounterSchema } from '@/entities/Counter';
import { NewsDetailsSchema } from '@/entities/News';
import { UserSchema } from '@/entities/User';
import { AddCommentFormSchema } from '@/features/AddNewComment';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';
import { NewsDetailsCommentsSchema } from '@/features/NewsDetailsCommentList';
import { NewsRecommendationListSchema } from '@/features/NewsRecommendationList';
import { RegisterSchema } from '@/features/RegisterNewUser/model/types/register.schema';
import { NewsPageSchema } from '@/pages/NewsPage/model/types/newsPageSchema';
import { UsersPageSchema } from '@/pages/UsersPage/model/types/usersPageSchema';
import { rtkApi, settlementRtkApi } from '@/shared/api/rtkApi';
import { CreateAndEditNewsSchema } from '@/widgets/CreateAndEditNews/model/types/createAndEditNewsSchema';
import { SaveScrollSchema } from '@/widgets/SaveScroll';
import { BlocksPageSchema } from '@/pages/BlocksPage/model/types/blocksPageSchema';
import { AddSanitaryVisitSchema } from '@/features/AddSanitaryVisitForm/model/types/addSanitaryVisit.schema';
import { AddNewTenantToRoomSchema } from '@/features/AddNewTenantToRoomForm/model/types/addNewTenantToRoom.schema';
import { RequestSettlementSchema } from '@/features/RequestSettlement/model/types/requestSettlement.schema';
import { StudentSettlementSchema } from '@/entities/StudentSettlement/model/types/studentSettlement.schema';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  saveScroll: SaveScrollSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  [settlementRtkApi.reducerPath]: ReturnType<typeof settlementRtkApi.reducer>;

  // async reducers
  loginForm?: LoginSchema;
  registerForm?: RegisterSchema;
  profile?: ProfileSchema;
  newsDetails?: NewsDetailsSchema;
  newsDetailsComments?: NewsDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema;
  newsPage?: NewsPageSchema;
  newsRecommendationList?: NewsRecommendationListSchema;
  createAndEditNews?: CreateAndEditNewsSchema;
  usersPage?: UsersPageSchema;
  blocksPage?: BlocksPageSchema;
  addSanitaryVisit?: AddSanitaryVisitSchema;
  addNewTenantToRoom?: AddNewTenantToRoomSchema;
  requestSettlementForm?: RequestSettlementSchema;
  studentSettlementList?: StudentSettlementSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager?: ReducerManager;
}

export interface ThunkExtra {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtra;
  state: StateSchema;
}
