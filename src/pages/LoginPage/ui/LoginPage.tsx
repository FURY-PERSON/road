import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/features/AuthByUsername';
import { AppRoutes, RoutePath } from '@/shared/constant/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
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
    <Page className={classNames(cls.loginPage, {}, [className])}>
      <div className={cls.inner}>
        <LoginForm onSuccess={onSuccessLogin} />
      </div>
    </Page>
  );
};
