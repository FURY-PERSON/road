import { memo, FC } from 'react';

import { addCommentFormReducer } from '@/features/AddNewComment/model/slice/addCommentForm.slice';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/helpers/features';

import { AddNewCommentForm, AddNewCommentFormProps } from './AddNewCommentForm';
import cls from './AddNewCommentForm.module.scss';

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
};

export const AddNewCommentFormContainer: FC<AddNewCommentFormProps> = memo((props) => {
  const { className } = props;

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
          <div className={classNames(cls.AddNewCommentForm, {}, [className])}>
            <AddNewCommentForm {...props} />
          </div>
        </DynamicModuleLoader>
      }
      on={
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
          <AddNewCommentForm {...props} />
        </DynamicModuleLoader>
      }
    />
  );
});
