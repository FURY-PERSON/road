import { RoleName } from '@/entities/Role';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';
import { Select } from '@/shared/ui/Select/Select';
import { Text, TextVariant } from '@/shared/ui/Text/Text';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { registerNewUser } from '../../model/services/registerNewUser/registerNewUser';
import { registerActions, registerReducer } from '../../model/slice/register.slice';
import { getRegisterForm } from '../../model/selectors/getRegisterForm/getRegisterForm';
import { rolesList } from '../../model/const/item';
import cls from './RegisterForm.module.scss';
import { getRegisterLoading } from '../../model/selectors/getRegisterLoading/getRegisterLoading';
import { getRegisterValidationError } from '../../model/selectors/getRegisterValidationError/getRegisterValidationError';
import { getRegisterError } from '../../model/selectors/getRegisterError/getRegisterError';
import { ValidationError } from '../../model/types/error';

interface RegisterFormProps {
   className?: string;
   onSuccess?: () => void
}

const initialReducers: ReducersList = {
  registerForm: registerReducer,
};

const errorMap: Record<ValidationError, string> = {
  [ValidationError.NO_DATA]: 'no data',
  [ValidationError.SERVER_ERROR]: 'server error',
  [ValidationError.USER_DATA]: 'incorrect user data',
  [ValidationError.PASSWORD_MATCH]: 'passwords do not match',
};

export const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { className, onSuccess } = props;
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();

  const {
    firstName, confirmPassword, email, lastName, login, password, phone, role, 
  } = useSelector(getRegisterForm);

  const isLoading = useSelector(getRegisterLoading);
  const validationError = useSelector(getRegisterValidationError);
  const error = useSelector(getRegisterError);

  const onChangeLogin = useCallback((value: string) => {
    dispatch(registerActions.setLogin(value));
  }, [dispatch]);

  const onChangeFirstName = useCallback((value: string) => {
    dispatch(registerActions.setFirstName(value));
  }, [dispatch]);

  const onChangeLastName = useCallback((value: string) => {
    dispatch(registerActions.setSecondName(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(registerActions.setPassword(value));
  }, [dispatch]);

  const onChangeConfirmPassword = useCallback((value: string) => {
    dispatch(registerActions.setConfirmPassword(value));
  }, [dispatch]);

  const onChangeEmail = useCallback((value: string) => {
    dispatch(registerActions.setEmail(value));
  }, [dispatch]);

  const onChangePhone = useCallback((value: string) => {
    dispatch(registerActions.setPhone(value));
  }, [dispatch]);

  const onChangeRole = useCallback((role: string) => {
    dispatch(registerActions.setRole(role as RoleName));
  }, [dispatch]);

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(registerNewUser());
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess?.();
    }
  }, [dispatch, onSuccess]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.registerForm, {}, [className])}>
        <Text title={t('register')} />
        <TextInput label={t('first name')} placeholder={t('enter first name')} onChange={onChangeFirstName} value={firstName} className={cls.input} />
        <TextInput label={t('last name')} placeholder={t('enter last name')} onChange={onChangeLastName} value={lastName} className={cls.input} />
        <TextInput label={t('login')} placeholder={t('enter login')} onChange={onChangeLogin} value={login} className={cls.input} />
        <TextInput label={t('password')} placeholder={t('enter password')} onChange={onChangePassword} value={password} className={cls.input} />
        <TextInput label={t('confirm password')} placeholder={t('confirm password')} onChange={onChangeConfirmPassword} value={confirmPassword} className={cls.input} />
        <TextInput label={t('email')} placeholder={t('enter email')} onChange={onChangeEmail} value={email} className={cls.input} />
        <TextInput label={t('phone')} placeholder={t('enter phone number')} onChange={onChangePhone} value={phone} className={cls.input} />

        <Select onChange={onChangeRole} value={role} options={rolesList} label={t('select your role')} />

        {validationError?.length
          ? validationError.map((error) => (
            <Text key={error} variant={TextVariant.ERROR} title={errorMap[error]} />
          ))
          : null}

        {error  
          ? <Text title={error} variant={TextVariant.ERROR} className={cls.error} />
          : null }

        <Button onClick={onLoginClick} disabled={isLoading} className={cls.button} variant={ButtonVariant.OUTLINE}>{t('apply')}</Button>

        <AppLink className={cls.login} to={RoutePath[AppRoutes.LOGIN]}>
          {`${t('already have account')}? ${t('login')}`}
        </AppLink>
      </div>
    </DynamicModuleLoader>
  );
};
