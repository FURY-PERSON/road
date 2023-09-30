import { memo, FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { SvgLoader } from '@/shared/ui/deprecated/SvgLoader';
import { Text as TextDeprecated, TextVariant } from '@/shared/ui/deprecated/Text/Text';
import { RoleName } from '@/entities/Role';
import { Select } from '@/shared/ui/deprecated/Select/Select';
import { TextInput } from '@/shared/ui/deprecated/TextInput/TextInput';
import { RoleGuard } from '@/features/RoleGuard';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { Card } from '@/shared/ui/redesigned/Card';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { FeatureFlagsSwitcher } from '@/features/FeatureFlagsSwitcher';

import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileLoading } from '../../model/selectors/getProfileLoading/getProfileLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidationErrors } from '../../model/selectors/getProfileValidationErrors/getProfileValidationErrors';
import { fetchProfile } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions } from '../../model/slice/profile.slice';
import { ProfileCardHeader } from '../Header/ProfileCardHeader';
import { errorMap, roleOptionsDeprecated } from '../../model/constants/editableProfileCard';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

import cls from './EditableProfileCard.module.scss';

interface EditableProfileCardProps {
  className?: string;
  login?: string;
}

export const EditableProfileCard: FC<EditableProfileCardProps> = memo((props) => {
  const { className, login } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');

  const formData = useSelector(getProfileForm);
  const user = useSelector(getProfileData);
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
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.EditableProfileCard, {}, [className])}>
          <ProfileCardHeader />

          {validationErrors?.length
            ? validationErrors.map((error) => (
                <TextDeprecated
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
                  options={roleOptionsDeprecated}
                  label={t('role')}
                  onChange={onChangeRole}
                  value={formData?.roleName}
                />

                {user ? <FeatureFlagsSwitcher userLogin={user.login} /> : null}
              </>
            </RoleGuard>

            {error ? <TextDeprecated variant={TextVariant.ERROR} text={error} /> : null}
          </div>
        </div>
      }
      on={
        <Card padding="24" max className={className}>
          <ProfileCardHeader />

          {validationErrors?.length
            ? validationErrors.map((error) => (
                <Text
                  data-testid="EditableProfileCard.error"
                  key={error}
                  variant="error"
                  title={errorMap[error]}
                />
              ))
            : null}

          <VStack gap={32}>
            <HStack gap={32} max>
              <VStack gap={16} max align="start">
                <Input
                  data-testid="EditableProfileCard.loginInput"
                  label={t('login')}
                  value={formData?.login}
                  readonly
                />
                <Input
                  data-testid="EditableProfileCard.firstNameInput"
                  label={t('first name')}
                  value={formData?.firstName}
                  readonly={readOnly}
                  onChange={onChangeFirstName}
                />
                <Input
                  data-testid="EditableProfileCard.lastNameInput"
                  label={t('last name')}
                  value={formData?.lastName}
                  readonly={readOnly}
                  onChange={onChangeLastName}
                />

                <RoleGuard roleNames={[RoleName.ADMIN]}>
                  {user ? (
                    <FeatureFlagsSwitcher userLogin={user.login} className={cls.toggleFeature} />
                  ) : null}
                </RoleGuard>
              </VStack>

              <VStack gap={16} max align="start">
                <RoleGuard roleNames={[RoleName.ADMIN]}>
                  <>
                    <Input
                      data-testid="EditableProfileCard.phoneInput"
                      label={t('phone')}
                      readonly={readOnly}
                      value={formData?.phone}
                      onChange={onChangePhone}
                    />
                    <Input
                      data-testid="EditableProfileCard.emailInput"
                      label={t('email')}
                      readonly={readOnly}
                      value={formData?.email}
                      onChange={onChangeEmail}
                    />

                    <ListBox<RoleName>
                      items={roleOptionsDeprecated}
                      value={formData?.roleName}
                      onChange={onChangeRole}
                      direction="top right"
                      readonly={readOnly}
                      label={t('role')}
                    />
                  </>
                </RoleGuard>
              </VStack>
            </HStack>
          </VStack>

          {error ? <Text variant="error" text={error} /> : null}
        </Card>
      }
    />
  );
});
