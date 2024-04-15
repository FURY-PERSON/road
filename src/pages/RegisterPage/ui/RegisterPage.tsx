import { FC, useCallback } from 'react';

import { RegisterForm } from '@/features/RegisterNewUser';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Page } from '@/widgets/Page/Page';
import { ToggleFeatures } from '@/shared/lib/helpers/features';

import cls from './RegisterPage.module.scss';
import clsR from './RegisterPage.redesigned.module.scss';

interface RegisterPageProps {
  className?: string;
}

export const RegisterPage: FC<RegisterPageProps> = (props) => {
  const { className } = props;

  const onSuccessRegister = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <Page className={classNames(cls.registerPage, {}, [className])}>
          <div className={cls.inner}>
            <RegisterForm onSuccess={onSuccessRegister} />
          </div>
        </Page>
      }
      on={
        <Page className={classNames(clsR.registerPage, {}, [className])}>
          <div className={clsR.inner}>
            <RegisterForm onSuccess={onSuccessRegister} />
          </div>
        </Page>
      }
    />
  );
};
