import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UserScientificWork } from '@/widgets/UserScientificWork';
import { EditableProfileCard, profileReducer } from '@/features/EditableProfileCard';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { UserRebuke } from '@/widgets/UserRebuke';
import { Text } from '@/shared/ui/redesigned/Text/Text';

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
  const { t } = useTranslation();

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={moduleReducer}>
      <Page className={classNames(cls.ProfilePage, {}, [className])} testId="ProfilePage">
        <Text title={`${t('to profile')}: ${login}`} variant="accent" className={cls.title} />
        <VStack gap={32}>
          <EditableProfileCard login={login} />
          <UserBlock login={login} />
          <HStack gap={8} max>
            <UserScientificWork login={login} />
            <UserRebuke login={login} />
          </HStack>
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
});
