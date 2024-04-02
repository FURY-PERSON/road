import { FC, memo } from 'react';

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';

import { studentSettlementReducer } from '../../model/slice/studentSettlement.slice';

import { StudentSettlementList, StudentSettlementListProps } from './StudentSettlementList';

const reducers: ReducersList = {
  studentSettlementList: studentSettlementReducer
};

export const StudentSettlementListContainer: FC<StudentSettlementListProps> = memo((props) => {
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <StudentSettlementList {...props} />
    </DynamicModuleLoader>
  );
});
