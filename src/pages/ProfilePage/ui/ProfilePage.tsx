import { getProfile, ProfileCard, profileReducer } from 'entities/Profile';
import { getUserLogin } from 'entities/User';
import {
  memo, FC, useEffect, 
} from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfilePageParam } from '../model/types';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
  className?: string;
}

const moduleReducer:ReducersList = {
  profile: profileReducer,
};

export const ProfilePage:FC<ProfilePageProps> = memo((props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const { login } = useParams<ProfilePageParam>();

  useEffect(() => {
    dispatch(getProfile({ login }));
  }, [dispatch, login]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={moduleReducer}>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  );
});
