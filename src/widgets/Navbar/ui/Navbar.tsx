import { getUserData, userActions } from '@/entities/User';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Button } from '@/shared/ui/Button/Button';
import { NotificationButton } from '@/features/NotificationButton';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export function Navbar(props: NavbarProps) {
  const { className } = props;
  const { t } = useTranslation();
  const user = useSelector(getUserData);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onLoginClick = useCallback(() => {
    navigator(RoutePath[AppRoutes.LOGIN]);
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
    <header className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.inner}>
        <AppLink to={RoutePath.main}>{t('to main')}</AppLink>

        <div className={cls.right}>
          <NotificationButton />
          
          <Button onClick={onLogout}>{t('logout')}</Button>
        </div>
      </div>
    </header>
  );
}
