import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm:FC<LoginFormProps> = memo((props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <TextInput className={cls.input} />
      <TextInput className={cls.input} />

      <Button className={cls.button}>{t('apply')}</Button>
    </div>
  );
});
