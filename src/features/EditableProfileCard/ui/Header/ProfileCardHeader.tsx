import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { updateProfile } from 'features/EditableProfileCard/model/services/updateProfileData/updateProfileData';
import { PermissionGuard } from 'features/PermissionGuard';
import { RoleGuard } from 'features/RoleGuard';
import { RoleName } from 'entities/Role';
import { profileActions } from '../../model/slice/profile.slice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import cls from './ProfileCardHeader.module.scss';

interface ProfileCardHeaderProps {
  className?: string;
}

export const ProfileCardHeader:FC<ProfileCardHeaderProps> = memo((props) => {
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
    <div className={classNames(cls.ProfileCardHeader, {}, [className])}>
      {readOnly
        ? (
          <RoleGuard roleNames={[RoleName.ADMIN, RoleName.WORKER]}>
            <Button onClick={onEditClick}>
              {t('edit')}
            </Button>
          </RoleGuard>
        )
        : (
          <div className={cls.buttons}>
            <Button onClick={onCancelClick}>
              {t('cancel')}
            </Button>

            <Button className={cls.save} onClick={onSaveClick}>
              {t('save')}
            </Button>
          </div>
            
        )}
    </div>
  );
});
