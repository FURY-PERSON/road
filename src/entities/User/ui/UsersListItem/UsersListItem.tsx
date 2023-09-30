import { memo, FC, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { routes } from '@/shared/constant/router';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { User } from '../../model/types/user';

import cls from './UsersListItem.module.scss';

interface UsersListItemProps {
  className?: string;
  user: User;
  target?: HTMLAttributeAnchorTarget;
}

export const UsersListItem: FC<UsersListItemProps> = memo((props) => {
  const { className, user, target = '_self' } = props;

  const { t } = useTranslation('users');

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <AppLinkDeprecated target={target} to={routes.profile(user.login)}>
          <CardDeprecated className={classNames(cls.UsersListItem, {}, [className])}>
            <div className={cls.inner}>
              <div className={cls.section}>
                <TextDeprecated title={t('login')} className={cls.label} />
                <TextDeprecated size={TextSize.M} title={user.login} className={cls.value} />
              </div>

              <div className={cls.section}>
                <TextDeprecated title={t('name')} className={cls.label} />
                <TextDeprecated size={TextSize.M} title={user.firstName} className={cls.value} />
                <TextDeprecated size={TextSize.M} title={user.lastName} className={cls.value} />
              </div>

              <div className={cls.section}>
                <TextDeprecated title={t('role')} className={cls.label} />
                <TextDeprecated size={TextSize.M} title={user.role?.name} className={cls.value} />
              </div>
            </div>
          </CardDeprecated>
        </AppLinkDeprecated>
      }
      on={
        <AppLink target={target} to={routes.profile(user.login)} className={cls.UsersListItem}>
          <Card border="round" padding="16">
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
      }
    />
  );
});
