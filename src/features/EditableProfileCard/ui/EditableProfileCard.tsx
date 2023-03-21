import { ProfileCard } from 'entities/Profile';
import {
  memo, FC, useEffect, useCallback, 
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SvgLoader } from 'shared/ui/SvgLoader';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../model/selectors/getProfileForm/getProfileForm';
import { getProfileLoading } from '../model/selectors/getProfileLoading/getProfileLoading';
import { getProfileReadonly } from '../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfile } from '../model/services/getProfileData/getProfileData';
import { profileActions } from '../model/slice/profile.slice';
import cls from './EditableProfileCard.module.scss';
import { ProfileCardHeader } from './Header/ProfileCardHeader';

interface EditableProfileCardProps {
  className?: string;
  login?: string
}

export const EditableProfileCard:FC<EditableProfileCardProps> = memo((props) => {
  const { className, login } = props;
  const dispatch = useAppDispatch();
  const formData = useSelector(getProfileForm);
  const loading = useSelector(getProfileLoading);
  const error = useSelector(getProfileError);
  const readOnly = useSelector(getProfileReadonly);

  useEffect(() => {
    if (login) {
      dispatch(getProfile({ login: login }));
    }
  }, [dispatch, login]);

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
