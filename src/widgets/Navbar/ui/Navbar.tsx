import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Button } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export function Navbar(props: NavbarProps) {
  const { className } = props;
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (authData) {
      setOpen(false);
    }
  }, [authData]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onLoginClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.inner}>
          <div />

          <Button onClick={onLoginClick}>{t('login')}</Button>
        </div>
        <LoginModal open={open} onClose={onClose} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.inner}>
        <AppLink to={RoutePath.main}>{t('to main')}</AppLink>

        <Button onClick={onLogout}>{t('logout')}</Button>
      </div>
    </div>
  );
}
