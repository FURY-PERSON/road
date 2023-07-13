import { RegisterForm } from '@/features/RegisterNewUser';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import cls from './RegisterPage.module.scss';

interface RegisterPageProps {
  className?: string;
}

export const RegisterPage: FC<RegisterPageProps> = (props) => {
  const { className } = props;
  const navigator = useNavigate();

  const onSuccessRegister = useCallback(() => {
    navigator(AppRoutes.MAIN);
  }, [navigator]);

  return (
    <Page className={classNames(cls.registerPage, {}, [className])}>
      <div className={cls.inner}>
        <RegisterForm onSuccess={onSuccessRegister} />
      </div>
    </Page>
  );
};
