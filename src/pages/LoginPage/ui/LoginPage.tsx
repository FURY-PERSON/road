import { LoginForm } from 'features/AuthByUsername';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './LoginPage.module.scss';

interface LoginPageProps {
   className?: string;
}

export const LoginPage: FC<LoginPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigator = useNavigate();

  const onSuccessLogin = useCallback(() => {
    navigator(AppRoutes.MAIN);
  }, [navigator]);

  return (
    <div className={classNames(cls.loginPage, {}, [className])}>
      <div className={cls.inner}>
        <LoginForm onSuccess={onSuccessLogin} />
      </div>
    </div>
  );
};
