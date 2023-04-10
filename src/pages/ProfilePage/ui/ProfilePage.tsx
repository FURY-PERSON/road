import { EditableProfileCard, profileReducer } from 'features/EditableProfileCard';
import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'shared/ui/Page/Page';
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

  const { login } = useParams<ProfilePageParam>();

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={moduleReducer}>
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
        <EditableProfileCard login={login} />
      </Page>
    </DynamicModuleLoader>
  );
});
