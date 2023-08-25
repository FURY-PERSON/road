import { memo, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { SvgLoader } from '@/shared/ui/SvgLoader';
import { Text, TextVariant } from '@/shared/ui/Text/Text';
import { RoleName } from '@/entities/Role';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import i18n from '@/shared/config/i18n/i18n';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { RoleGuard } from '@/features/RoleGuard';

import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileLoading } from '../../model/selectors/getProfileLoading/getProfileLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidationErrors } from '../../model/selectors/getProfileValidationErrors/getProfileValidationErrors';
import { fetchProfile } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions } from '../../model/slice/profile.slice';
import { ProfileValidationError } from '../../model/types/editableProfileCard';
import { ProfileCardHeader } from '../Header/ProfileCardHeader';

import cls from './EditableProfileCard.module.scss';

interface EditableProfileCardProps {
  className?: string;
  login?: string;
}

const errorMap: Record<ProfileValidationError, string> = {
  [ProfileValidationError.NO_DATA]: 'no data',
  [ProfileValidationError.SERVER_ERROR]: 'server error',
  [ProfileValidationError.USER_DATA]: 'incorrect user data'
};

const roleOptions: SelectOption<RoleName>[] = [
  { value: RoleName.ADMIN, content: i18n.t('admin') },
  { value: RoleName.WORKER, content: i18n.t('worker') },
  { value: RoleName.STUDENT, content: i18n.t('student') }
];

export const EditableProfileCard: FC<EditableProfileCardProps> = memo((props) => {
  const { className, login } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');

  const formData = useSelector(getProfileForm);
  const loading = useSelector(getProfileLoading);
  const error = useSelector(getProfileError);
  const validationErrors = useSelector(getProfileValidationErrors);
  const readOnly = useSelector(getProfileReadonly);

  useInitialEffect(() => {
    dispatch(fetchProfile({ login: login }));
  });

  const onChangeFirstName = useCallback(
    (value: string) => {
      dispatch(profileActions.setFirstName(value));
    },
    [dispatch]
  );

  const onChangeLastName = useCallback(
    (value: string) => {
      dispatch(profileActions.setLastName(value));
    },
    [dispatch]
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(profileActions.setEmail(value));
    },
    [dispatch]
  );

  const onChangePhone = useCallback(
    (value: string) => {
      dispatch(profileActions.setPhone(value));
    },
    [dispatch]
  );

  const onChangeRole = useCallback(
    (value: RoleName) => {
      dispatch(profileActions.setRole(value));
    },
    [dispatch]
  );

  if (loading) {
    return (
      <div className={cls.loader}>
        <SvgLoader />
      </div>
    );
  }

  return (
    <div className={classNames(cls.EditableProfileCard, {}, [className])}>
      <ProfileCardHeader />

      {validationErrors?.length
        ? validationErrors.map((error) => (
            <Text
              data-testid="EditableProfileCard.error"
              key={error}
              variant={TextVariant.ERROR}
              title={errorMap[error]}
            />
          ))
        : null}

      <div>
        <TextInput
          data-testid="EditableProfileCard.loginInput"
          label={t('login')}
          readOnly
          value={formData?.login}
        />
        <TextInput
          data-testid="EditableProfileCard.firstNameInput"
          label={t('first name')}
          readOnly={readOnly}
          value={formData?.firstName}
          onChange={onChangeFirstName}
        />
        <TextInput
          data-testid="EditableProfileCard.lastNameInput"
          label={t('last name')}
          readOnly={readOnly}
          value={formData?.lastName}
          onChange={onChangeLastName}
        />

        <RoleGuard roleNames={[RoleName.ADMIN]}>
          <>
            <TextInput
              data-testid="EditableProfileCard.phoneInput"
              label={t('phone')}
              readOnly={readOnly}
              value={formData?.phone}
              onChange={onChangePhone}
            />
            <TextInput
              data-testid="EditableProfileCard.emailInput"
              label={t('email')}
              readOnly={readOnly}
              value={formData?.email}
              onChange={onChangeEmail}
            />

            <Select<RoleName>
              readonly={readOnly}
              options={roleOptions}
              label={t('role')}
              onChange={onChangeRole}
              value={formData?.roleName}
            />
          </>
        </RoleGuard>

        {error ? <Text variant={TextVariant.ERROR} text={error} /> : null}
      </div>
    </div>
  );
});
