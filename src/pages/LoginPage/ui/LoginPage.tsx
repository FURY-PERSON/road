import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '@/features/AuthByUsername';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { routes } from '@/shared/constant/router';
import { ToggleFeatures } from '@/shared/lib/helpers/features';

import cls from './LoginPage.module.scss';
import clsR from './LoginPage.redesigned.module.scss';

interface LoginPageProps {
  className?: string;
}

export const LoginPage: FC<LoginPageProps> = (props) => {
  const { className } = props;
  const navigator = useNavigate();

  const onSuccessLogin = useCallback(() => {
    navigator(routes.main());

    window.location.reload();
  }, [navigator]);

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <Page className={classNames(cls.loginPage, {}, [className])} testId="LoginPage">
          <div className={cls.inner}>
            <LoginForm onSuccess={onSuccessLogin} />
          </div>
        </Page>
      }
      on={
        <Page className={classNames(clsR.loginPage, {}, [className])} testId="LoginPage">
          <div className={clsR.inner}>
            <LoginForm onSuccess={onSuccessLogin} />
          </div>
        </Page>
      }
    />
  );
};
