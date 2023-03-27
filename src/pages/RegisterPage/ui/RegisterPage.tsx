import { RegisterForm } from 'features/RegisterNewUser';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './RegisterPage.module.scss';

interface RegisterPageProps {
   className?: string;
}

export const RegisterPage: FC<RegisterPageProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigator = useNavigate();

  const onSuccessRegister = useCallback(() => {
    navigator(AppRoutes.MAIN);
  }, [navigator]);

  return (
    <div className={classNames(cls.registerPage, {}, [className])}>
      <div className={cls.inner}>
        <RegisterForm onSuccess={onSuccessRegister} />
      </div>
    </div>
  );
};
