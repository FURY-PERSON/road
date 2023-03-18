import { profileReducer } from 'entities/Profile';
import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
  className?: string;
}

const moduleReducer:ReducersList = {
  profile: profileReducer,
};

export const ProfilePage:FC<ProfilePageProps> = memo((props) => {
  const { className } = props;

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={moduleReducer}>
      <div className={classNames(cls.ProfilePage, {}, [className])}></div>
    </DynamicModuleLoader>
  );
});
