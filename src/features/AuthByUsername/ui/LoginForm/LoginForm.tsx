import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { loginActions } from '@/features/AuthByUsername/model/slice/login.slice';
import { loginByUsername } from '@/features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button as ButtonDeprecated, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { TextInput } from '@/shared/ui/deprecated/TextInput/TextInput';
import { getLoginState } from '@/features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import { Text as TextDeprecated, TextVariant } from '@/shared/ui/deprecated/Text/Text';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { routes } from '@/shared/constant/router';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Card } from '@/shared/ui/redesigned/Card';

import { loginReducer } from '../../model/slice/login.slice';

import cls from './LoginForm.module.scss';
import clsR from './LoginForm.redesigned.module.scss';

interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
};

export const LoginForm: FC<LoginFormProps> = memo((props) => {
  const { className, onSuccess } = props;
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();

  const { login, password, isLoading, error } = useSelector(getLoginState);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername());
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, onSuccess]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        feature="newDesign"
        off={
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t('auth form')} />
            <TextInput onChange={onChangeUsername} value={login} className={cls.input} />
            <TextInput
              type="password"
              onChange={onChangePassword}
              value={password}
              className={cls.input}
            />

            {error ? (
              <TextDeprecated title={error} variant={TextVariant.ERROR} className={cls.error} />
            ) : null}

            <ButtonDeprecated
              onClick={onLoginClick}
              disabled={isLoading}
              className={cls.button}
              variant={ButtonVariant.OUTLINE}
            >
              {t('apply')}
            </ButtonDeprecated>

            <AppLinkDeprecated className={cls.register} to={routes.register()}>
              {`${t('do not have an account')}? ${t('register new')}`}
            </AppLinkDeprecated>
          </div>
        }
        on={
          <Card border="round" padding="24">
            <VStack gap={16} className={clsR.LoginForm}>
              <Input
                onChange={onChangeUsername}
                value={login}
                className={clsR.input}
                label={t('login')}
              />
              <Input
                label={t('password')}
                type="password"
                onChange={onChangePassword}
                value={password}
                className={clsR.input}
              />
              {error ? (
                <Text title={error} variant="error" size="M" className={clsR.error} />
              ) : null}

              <Button
                onClick={onLoginClick}
                disabled={isLoading}
                className={clsR.button}
                variant="outline"
              >
                {t('apply')}
              </Button>

              <AppLink className={clsR.register} to={routes.register()}>
                {`${t('do not have an account')}? ${t('register new')}`}
              </AppLink>
            </VStack>
          </Card>
        }
      />
    </DynamicModuleLoader>
  );
});
