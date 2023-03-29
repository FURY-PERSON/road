import { LoginForm } from 'features/AuthByUsername';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './LoginPage.module.scss';

interface LoginPageProps {
   className?: string;
}

export const LoginPage: FC<LoginPageProps> = (props) => {
  const { className } = props;
  const navigator = useNavigate();

  const onSuccessLogin = useCallback(() => {
    navigator(RoutePath[AppRoutes.MAIN]);
  }, [navigator]);

  return (
    <div className={classNames(cls.loginPage, {}, [className])}>
      <div className={cls.inner}>
        <LoginForm onSuccess={onSuccessLogin} />
      </div>
    </div>
  );
};
