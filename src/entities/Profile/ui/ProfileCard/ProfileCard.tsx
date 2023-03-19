import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileLoading } from 'entities/Profile/model/selectors/getProfileLoading/getProfileLoading';
import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
}

export const ProfileCard:FC<ProfileCardProps> = memo((props) => {
  const { className } = props;
  const { t } = useTranslation('profile');

  const data = useSelector(getProfileData);
  const error = useSelector(getProfileError);
  const loading = useSelector(getProfileLoading);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <Text title={t('profile')} />
      <Button variant={ButtonVariant.OUTLINE}>{t('edit')}</Button>
    </div>
  );
});
