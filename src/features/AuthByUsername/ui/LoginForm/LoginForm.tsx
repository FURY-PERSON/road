import {
  memo, FC, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { loginActions } from '@/features/AuthByUsername/model/slice/login.slice';
import { loginByUsername } from '@/features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { getLoginState } from '@/features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import { Text, TextVariant } from '@/shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import cls from './LoginForm.module.scss';
import { loginReducer } from '../../model/slice/login.slice';

interface LoginFormProps {
  className?: string;
  onSuccess: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

export const LoginForm:FC<LoginFormProps> = memo((props) => {
  const { className, onSuccess } = props;
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();

  const {
    login, password, isLoading, error, 
  } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername());
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, onSuccess]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('auth form')} />
        <TextInput onChange={onChangeUsername} value={login} className={cls.input} />
        <TextInput type="password" onChange={onChangePassword} value={password} className={cls.input} />

        {error  
          ? <Text title={error} variant={TextVariant.ERROR} className={cls.error} />
          : null }

        <Button onClick={onLoginClick} disabled={isLoading} className={cls.button} variant={ButtonVariant.OUTLINE}>{t('apply')}</Button>

        <AppLink className={cls.register} to={RoutePath[AppRoutes.REGISTER]}>
          {`${t('do not have an account')}? ${t('register new')}`}
        </AppLink>

      </div>
    </DynamicModuleLoader>
  );
});
