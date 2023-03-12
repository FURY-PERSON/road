import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions } from 'features/AuthByUsername/model/slice/login.slice';
import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import cls from './LoginForm.module.scss';
import type {} from 'redux-thunk/extend-redux';
import { Text, TextVariant } from 'shared/ui/Text/Text';

interface LoginFormProps {
  className?: string;
}

export const LoginForm:FC<LoginFormProps> = memo((props) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    username, password, isLoading, error, 
  } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ password, username }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('auth form')} />

      <TextInput onChange={onChangeUsername} value={username} className={cls.input} />
      <TextInput onChange={onChangePassword} value={password} className={cls.input} />

      {error  
        ? <Text title={error} variant={TextVariant.ERROR} className={cls.error} />
        : null }

      <Button onClick={onLoginClick} disabled={isLoading} className={cls.button} variant={ButtonVariant.OUTLINE}>{t('apply')}</Button>
    </div>
  );
});
