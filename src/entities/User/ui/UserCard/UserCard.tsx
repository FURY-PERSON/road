import { memo, FC, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { routes } from '@/shared/constant/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { User } from '../../model/types/user';

import cls from './UserCard.module.scss';

interface UserCardProps {
  className?: string;
  user: User;
  target?: HTMLAttributeAnchorTarget;
}

export const UserCard: FC<UserCardProps> = memo((props) => {
  const { className, user, target = '_self' } = props;

  const { t } = useTranslation('users');

  return (
    <AppLink
      target={target}
      to={routes.profile(user.login)}
      className={classNames(cls.UsersListItem, {}, [className])}
    >
      <Card border="round" padding="0">
        <VStack gap={4} max>
          <HStack max justify="between">
            <Text title={user.login} size="M" />
            <Text text={user.email} size="M" />
          </HStack>

          <HStack gap={8}>
            <Text variant="accent" title={user.lastName} size="L" />
            <Text variant="accent" title={user.firstName} size="L" />
          </HStack>

          <HStack gap={8}>
            <Text text={`${t('role')}: `} size="M" />
            <Text text={user.role?.name} size="M" />
          </HStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
