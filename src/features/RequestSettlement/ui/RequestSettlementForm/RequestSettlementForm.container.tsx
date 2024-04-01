import { memo } from 'react';

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';

import { requestSettlementReducer } from '../../model/slice/requestSettlement.slice';

import { RequestSettlementForm } from './RequestSettlementForm';

const reducers: ReducersList = {
  requestSettlementForm: requestSettlementReducer
};

export const RequestSettlementFormContainer = memo(() => {
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <RequestSettlementForm />
    </DynamicModuleLoader>
  );
});
