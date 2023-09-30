import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserData, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { Button } from '@/shared/ui/deprecated/Button/Button';
import { NotificationButton } from '@/features/NotificationButton';
import { routes } from '@/shared/constant/router';
import { HStack } from '@/shared/ui/deprecated/Stack/HStack/HStack';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export function Navbar(props: NavbarProps) {
  const { className } = props;
  const { t } = useTranslation();
  const user = useSelector(getUserData);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onLoginClick = useCallback(() => {
    navigator(routes.login());
  }, [navigator]);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!user) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.inner}>
          <div />

          <div className={cls.right}>
            <Button onClick={onLoginClick}>{t('login')}</Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <header className={classNames(cls.Navbar, {}, [className])}>
          <div className={cls.inner}>
            <AppLink to={routes.main()}>{t('to main')}</AppLink>

            <div className={cls.right}>
              <NotificationButton />

              <Button onClick={onLogout}>{t('logout')}</Button>
            </div>
          </div>
        </header>
      }
      on={
        <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
          <HStack gap={16} className={cls.actions}>
            <NotificationButton />
          </HStack>
        </header>
      }
    />
  );
}
