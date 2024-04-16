import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserData, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button/Button';
import { NotificationButton } from '@/features/NotificationButton';
import { routes } from '@/shared/constant/router';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';

import cls from './Navbar.module.scss';
import clsR from './Navbar.redesigned.module.scss';

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
      <ToggleFeatures
        feature="newDesign"
        off={
          <header className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.inner}>
              <div />

              <div className={cls.right}>
                <ButtonDeprecated onClick={onLoginClick}>{t('login')}</ButtonDeprecated>
              </div>
            </div>
          </header>
        }
        on={
          <header className={classNames(clsR.Navbar, {}, [className])}>
            <Button onClick={onLoginClick}>{t('login')}</Button>
          </header>
        }
      />
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

              <ButtonDeprecated onClick={onLogout}>{t('logout')}</ButtonDeprecated>
            </div>
          </div>
        </header>
      }
      on={
        <header className={classNames(clsR.Navbar, {}, [className])}>
          <HStack gap={16} className={clsR.actions}>
            <NotificationButton />
            <Button onClick={onLogout}>{t('logout')}</Button>
          </HStack>
        </header>
      }
    />
  );
}
