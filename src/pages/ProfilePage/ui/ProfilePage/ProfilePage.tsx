import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';

import { EditableProfileCard, profileReducer } from '@/features/EditableProfileCard';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';

import { ProfilePageParam } from '../../model/types';
import { UserBlock } from '../UserBlock/UserBlock';

import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
  className?: string;
}

const moduleReducer: ReducersList = {
  profile: profileReducer
};

export const ProfilePage: FC<ProfilePageProps> = memo((props) => {
  const { className } = props;

  const { login } = useParams<ProfilePageParam>();

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={moduleReducer}>
      <Page className={classNames(cls.ProfilePage, {}, [className])} testId="ProfilePage">
        <VStack gap={32}>
          <EditableProfileCard login={login} />
          <UserBlock login={login} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
});
