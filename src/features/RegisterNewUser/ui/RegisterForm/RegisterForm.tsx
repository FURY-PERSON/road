import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RoleName } from '@/entities/Role';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { Text as TextDeprecated, TextVariant } from '@/shared/ui/deprecated/Text/Text';
import { TextInput } from '@/shared/ui/deprecated/TextInput/TextInput';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { routes } from '@/shared/constant/router';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ToggleFeatures } from '@/shared/lib/helpers/features';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { UserStudyingForm } from '@/entities/User';
import { ListBoxItem } from '@/shared/ui/redesigned/popups/components/ListBox/ListBox';

import { registerNewUser } from '../../model/services/registerNewUser/registerNewUser';
import { registerActions, registerReducer } from '../../model/slice/register.slice';
import { getRegisterForm } from '../../model/selectors/getRegisterForm/getRegisterForm';
import { getRegisterLoading } from '../../model/selectors/getRegisterLoading/getRegisterLoading';
import { getRegisterValidationError } from '../../model/selectors/getRegisterValidationError/getRegisterValidationError';
import { getRegisterError } from '../../model/selectors/getRegisterError/getRegisterError';
import { errorMap } from '../../model/const/error';

import cls from './RegisterForm.module.scss';
import clsR from './RegisterForm.redesigned.module.scss';

interface RegisterFormProps {
  className?: string;
  onSuccess?: () => void;
}

const initialReducers: ReducersList = {
  registerForm: registerReducer
};

export const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { className, onSuccess } = props;
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();

  const {
    firstName,
    confirmPassword,
    email,
    lastName,
    login,
    password,
    phone,
    role,
    mark,
    studyingForm
  } = useSelector(getRegisterForm);

  const isLoading = useSelector(getRegisterLoading);
  const validationError = useSelector(getRegisterValidationError);
  const error = useSelector(getRegisterError);

  const onChangeLogin = useCallback(
    (value: string) => {
      dispatch(registerActions.setLogin(value));
    },
    [dispatch]
  );

  const onChangeFirstName = useCallback(
    (value: string) => {
      dispatch(registerActions.setFirstName(value));
    },
    [dispatch]
  );

  const onChangeLastName = useCallback(
    (value: string) => {
      dispatch(registerActions.setSecondName(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(registerActions.setPassword(value));
    },
    [dispatch]
  );

  const onChangeConfirmPassword = useCallback(
    (value: string) => {
      dispatch(registerActions.setConfirmPassword(value));
    },
    [dispatch]
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(registerActions.setEmail(value));
    },
    [dispatch]
  );

  const onChangePhone = useCallback(
    (value: string) => {
      dispatch(registerActions.setPhone(value));
    },
    [dispatch]
  );

  const onChangeMark = useCallback(
    (value: string) => {
      dispatch(registerActions.setMark(Number(value)));
    },
    [dispatch]
  );

  const onChangeRole = useCallback(
    (role: string) => {
      dispatch(registerActions.setRole(role as RoleName));
    },
    [dispatch]
  );

  const onChangeStudyingForm = useCallback(
    (studyingForm: string) => {
      dispatch(registerActions.setStudyingForm(studyingForm as UserStudyingForm));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(registerNewUser());
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess?.();
    }
  }, [dispatch, onSuccess]);

  const rolesListDeprecated: Array<SelectOption<RoleName>> = useMemo(
    () => [
      { content: t('worker'), value: RoleName.WORKER },
      { content: t('student'), value: RoleName.STUDENT },
      { content: t('admin'), value: RoleName.ADMIN }
    ],
    [t]
  );

  const rolesList: Array<ListBoxItem<RoleName>> = useMemo(
    () => [
      { content: t('worker'), value: RoleName.WORKER },
      { content: t('student'), value: RoleName.STUDENT },
      { content: t('admin'), value: RoleName.ADMIN }
    ],
    [t]
  );

  const budgetListDeprecated: Array<SelectOption<UserStudyingForm>> = useMemo(
    () => [
      { content: t('budget'), value: UserStudyingForm.Budget },
      { content: t('paid'), value: UserStudyingForm.Paid }
    ],
    [t]
  );

  const budgetList: Array<ListBoxItem<UserStudyingForm>> = useMemo(
    () => [
      { content: t('budget'), value: UserStudyingForm.Budget },
      { content: t('paid'), value: UserStudyingForm.Paid }
    ],
    [t]
  );

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        feature="newDesign"
        off={
          <div className={classNames(cls.registerForm, {}, [className])}>
            <TextDeprecated title={t('register')} />
            <TextInput
              label={t('first name')}
              placeholder={t('enter first name')}
              onChange={onChangeFirstName}
              value={firstName}
              className={cls.input}
            />
            <TextInput
              label={t('last name')}
              placeholder={t('enter last name')}
              onChange={onChangeLastName}
              value={lastName}
              className={cls.input}
            />
            <TextInput
              label={t('login')}
              placeholder={t('enter login')}
              onChange={onChangeLogin}
              value={login}
              className={cls.input}
            />
            <TextInput
              label={t('password')}
              placeholder={t('enter password')}
              onChange={onChangePassword}
              value={password}
              className={cls.input}
            />
            <TextInput
              label={t('confirm password')}
              placeholder={t('confirm password')}
              onChange={onChangeConfirmPassword}
              value={confirmPassword}
              className={cls.input}
            />
            <TextInput
              label={t('email')}
              placeholder={t('enter email')}
              onChange={onChangeEmail}
              value={email}
              className={cls.input}
            />
            <TextInput
              label={t('phone')}
              placeholder={t('enter phone number')}
              onChange={onChangePhone}
              value={phone}
              className={cls.input}
            />

            <Select
              onChange={onChangeRole}
              value={role}
              options={rolesListDeprecated}
              label={t('select your role')}
            />

            {role === RoleName.STUDENT ? (
              <Select
                onChange={onChangeStudyingForm}
                value={studyingForm}
                options={budgetListDeprecated}
                label={t('select studying form')}
              />
            ) : null}

            {role === RoleName.STUDENT ? (
              <TextInput
                label={t('average mark')}
                placeholder={t('enter average mark')}
                onChange={onChangeMark}
                value={String(mark)}
                className={cls.input}
              />
            ) : null}

            {validationError?.length
              ? validationError.map((error) => (
                  <TextDeprecated key={error} variant={TextVariant.ERROR} title={errorMap[error]} />
                ))
              : null}

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

            <AppLinkDeprecated className={cls.login} to={routes.login()}>
              {`${t('already have account')}? ${t('login')}`}
            </AppLinkDeprecated>
          </div>
        }
        on={
          <Card border="round" padding="24">
            <VStack gap={16} className={clsR.registerForm}>
              <Text title={t('register')} />
              <Input
                label={t('first name')}
                placeholder={t('enter first name')}
                onChange={onChangeFirstName}
                value={firstName}
              />
              <Input
                label={t('last name')}
                placeholder={t('enter last name')}
                onChange={onChangeLastName}
                value={lastName}
              />
              <Input
                label={t('login')}
                placeholder={t('enter login')}
                onChange={onChangeLogin}
                value={login}
              />
              <Input
                label={t('password')}
                placeholder={t('enter password')}
                onChange={onChangePassword}
                value={password}
              />
              <Input
                label={t('confirm password')}
                placeholder={t('confirm password')}
                onChange={onChangeConfirmPassword}
                value={confirmPassword}
              />
              <Input
                label={t('email')}
                placeholder={t('enter email')}
                onChange={onChangeEmail}
                value={email}
              />
              <Input
                label={t('phone')}
                placeholder={t('enter phone number')}
                onChange={onChangePhone}
                value={phone}
              />

              <ListBox<RoleName>
                onChange={onChangeRole}
                value={role}
                items={rolesList}
                label={t('select your role')}
              />

              {role === RoleName.STUDENT ? (
                <ListBox<UserStudyingForm>
                  onChange={onChangeStudyingForm}
                  value={studyingForm}
                  items={budgetList}
                  label={t('select studying form')}
                />
              ) : null}

              {role === RoleName.STUDENT ? (
                <Input
                  label={t('average mark')}
                  placeholder={t('enter average mark')}
                  onChange={onChangeMark}
                  value={String(mark)}
                  className={cls.input}
                />
              ) : null}

              {validationError?.length
                ? validationError.map((error) => (
                    <Text key={error} variant="error" title={errorMap[error]} />
                  ))
                : null}

              {error ? <Text title={error} variant="error" size="M" /> : null}

              <Button
                onClick={onLoginClick}
                disabled={isLoading}
                className={clsR.button}
                variant="outline"
              >
                {t('apply')}
              </Button>

              <AppLink to={routes.login()}>{`${t('already have account')}? ${t('login')}`}</AppLink>
            </VStack>
          </Card>
        }
      />
    </DynamicModuleLoader>
  );
};
