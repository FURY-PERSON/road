import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button/Button';
import { updateProfile } from '@/features/EditableProfileCard/model/services/updateProfileData/updateProfileData';
import { RoleGuard } from '@/features/RoleGuard';
import { RoleName } from '@/entities/Role';
import { ToggleFeatures } from '@/shared/lib/helpers/ToggleFeatures/ToggleFeatures';
import { Button } from '@/shared/ui/redesigned/Button/Button';

import { profileActions } from '../../model/slice/profile.slice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';

import clsR from './ProfileCardHeader.redesigned.module.scss';
import cls from './ProfileCardHeader.module.scss';

interface ProfileCardHeaderProps {
  className?: string;
}

export const ProfileCardHeader: FC<ProfileCardHeaderProps> = memo((props) => {
  const { className } = props;

  const readOnly = useSelector(getProfileReadonly);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onEditClick = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelClick = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSaveClick = useCallback(() => {
    dispatch(updateProfile());
  }, [dispatch]);

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.ProfileCardHeader, {}, [className])}>
          {readOnly ? (
            <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
              <ButtonDeprecated data-testid="EditableProfileCard.editButton" onClick={onEditClick}>
                {t('edit')}
              </ButtonDeprecated>
            </RoleGuard>
          ) : (
            <div className={cls.buttons}>
              <ButtonDeprecated
                data-testid="EditableProfileCard.cancelButton"
                onClick={onCancelClick}
              >
                {t('cancel')}
              </ButtonDeprecated>

              <ButtonDeprecated
                data-testid="EditableProfileCard.saveButton"
                className={cls.save}
                onClick={onSaveClick}
              >
                {t('save')}
              </ButtonDeprecated>
            </div>
          )}
        </div>
      }
      on={
        <div className={classNames(clsR.ProfileCardHeader, {}, [className])}>
          {readOnly ? (
            <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
              <Button
                data-testid="EditableProfileCard.editButton"
                onClick={onEditClick}
                variant="outline"
                size="small"
              >
                {t('edit')}
              </Button>
            </RoleGuard>
          ) : (
            <div className={clsR.buttons}>
              <Button
                data-testid="EditableProfileCard.cancelButton"
                onClick={onCancelClick}
                variant="outline"
                size="small"
              >
                {t('cancel')}
              </Button>

              <Button
                data-testid="EditableProfileCard.saveButton"
                variant="outline"
                size="small"
                className={clsR.save}
                onClick={onSaveClick}
              >
                {t('save')}
              </Button>
            </div>
          )}
        </div>
      }
    />
  );
});
