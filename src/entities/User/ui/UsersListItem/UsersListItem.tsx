import { memo, FC, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { routes } from '@/shared/constant/router';

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
    <AppLink target={target} to={routes.profile(user.login)}>
      <Card className={classNames(cls.UsersListItem, {}, [className])}>
        <div className={cls.inner}>
          <div className={cls.section}>
            <Text title={t('login')} className={cls.label} />
            <Text size={TextSize.M} title={user.login} className={cls.value} />
          </div>

          <div className={cls.section}>
            <Text title={t('name')} className={cls.label} />
            <Text size={TextSize.M} title={user.firstName} className={cls.value} />
            <Text size={TextSize.M} title={user.lastName} className={cls.value} />
          </div>

          <div className={cls.section}>
            <Text title={t('role')} className={cls.label} />
            <Text size={TextSize.M} title={user.role?.name} className={cls.value} />
          </div>
        </div>
      </Card>
    </AppLink>
  );
});
