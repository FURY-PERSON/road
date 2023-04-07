import { ProfileCard } from 'entities/Profile';
import {
  memo, FC, useEffect, useCallback, 
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { SvgLoader } from 'shared/ui/SvgLoader';
import { Text, TextVariant } from 'shared/ui/Text/Text';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../model/selectors/getProfileForm/getProfileForm';
import { getProfileLoading } from '../model/selectors/getProfileLoading/getProfileLoading';
import { getProfileReadonly } from '../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidationErrors } from '../model/selectors/getProfileValidationErrors/getProfileValidationErrors';
import { fetchProfile } from '../model/services/fetchProfileData/fetchProfileData';
import { profileActions } from '../model/slice/profile.slice';
import { ProfileValidationError } from '../model/types/editableProfileCard';
import cls from './EditableProfileCard.module.scss';
import { ProfileCardHeader } from './Header/ProfileCardHeader';

interface EditableProfileCardProps {
  className?: string;
  login?: string
}

const errorMap: Record<ProfileValidationError, string> = {
  [ProfileValidationError.NO_DATA]: 'no data',
  [ProfileValidationError.SERVER_ERROR]: 'server error',
  [ProfileValidationError.USER_DATA]: 'incorrect user data',
};

export const EditableProfileCard:FC<EditableProfileCardProps> = memo((props) => {
  const { className, login } = props;
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const loading = useSelector(getProfileLoading);
  const error = useSelector(getProfileError);
  const validationErrors = useSelector(getProfileValidationErrors);
  const readOnly = useSelector(getProfileReadonly);

  useInitialEffect(() => {
    dispatch(fetchProfile({ login: login }));
  });

  const onChangeFirstName = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ firstName: value }));
  }, [dispatch]);

  const onChangeLastName = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ lastName: value }));
  }, [dispatch]);

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
          <Text key={error} variant={TextVariant.ERROR} title={errorMap[error]} />
        ))
        : null}
      
      <ProfileCard 
        profile={formData} 
        error={error} 
        readOnly={readOnly}
        onChangeLastName={onChangeLastName} 
        onChangeFirstName={onChangeFirstName} 
      />
    </div>
  );
});
