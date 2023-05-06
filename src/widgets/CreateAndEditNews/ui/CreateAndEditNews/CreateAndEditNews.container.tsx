import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import cls from './CreateAndEditNews.module.scss';
import { CreateAndEditNews, CreateAndEditNewsProps } from './CreateAndEditNews';
import { createAndEditNewsReducer } from '../../model/slice/createAndEditNews.slice';

interface CreateAndEditNewsContainerProps extends CreateAndEditNewsProps {
  className?: string;
}

const reducers: ReducersList = {
  createAndEditNews: createAndEditNewsReducer,
};

export const CreateAndEditNewsContainer:FC<CreateAndEditNewsContainerProps> = memo((props) => {
  const { className, ...otherProps } = props;

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.CreateAndEditNews, {}, [className])}>
        <CreateAndEditNews {...otherProps} />
      </div>
    </DynamicModuleLoader>
  );
});
