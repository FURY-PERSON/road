import {
  memo, FC, HTMLAttributeAnchorTarget, 
} from 'react';
import { useTranslation } from 'react-i18next';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './UsersListItem.module.scss';
import { User } from '../../model/types/user';

interface UsersListItemProps {
  className?: string;
  user: User,
  target?: HTMLAttributeAnchorTarget
}

export const UsersListItem:FC<UsersListItemProps> = memo((props) => {
  const {
    className, user, target = '_self',
  } = props;

  const { t } = useTranslation('users');

  return (
    <AppLink target={target} to={RoutePath[AppRoutes.USER_DETAILS] + user.login}>
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