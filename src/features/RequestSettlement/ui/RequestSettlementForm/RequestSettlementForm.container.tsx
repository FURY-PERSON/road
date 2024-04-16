import { FC, memo } from 'react';

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';

import { requestSettlementReducer } from '../../model/slice/requestSettlement.slice';

import { RequestSettlementForm, RequestSettlementFormProps } from './RequestSettlementForm';

const reducers: ReducersList = {
  requestSettlementForm: requestSettlementReducer
};

export const RequestSettlementFormContainer: FC<RequestSettlementFormProps> = memo((props) => {
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <RequestSettlementForm {...props} />
    </DynamicModuleLoader>
  );
});
