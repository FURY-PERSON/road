import { Profile } from 'entities/Profile/model/types/profile';
import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { SvgLoader } from 'shared/ui/SvgLoader';
import { Text } from 'shared/ui/Text/Text';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  profile?: Profile;
  error?: string,
  isLoading?: boolean;
  readOnly?: boolean;
  onChangeFirstName?: (value: string) => void;
  onChangeLastName?: (value: string) => void;
}

export const ProfileCard:FC<ProfileCardProps> = memo((props) => {
  const {
    className, error, isLoading, profile, readOnly = true, onChangeFirstName, onChangeLastName,
  } = props;
  const { t } = useTranslation();

  const onChangeFirstNameHandler = (firstName: string) => {
    onChangeFirstName?.(firstName);
  };

  const onChangeLastNameHandler = (firstName: string) => {
    onChangeLastName?.(firstName);
  };

  const mods: Mods = {
    [cls.editing]: !readOnly,
  };

  if (isLoading) {
    return (
      <div className={cls.loader}>
        <SvgLoader />
      </div>
    );
  }

  if (error) {
    return <Text title={error} text="Try to reload the page" />;
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <TextInput readOnly={readOnly} value={profile?.firstName} onChange={onChangeFirstNameHandler} />
      <TextInput readOnly={readOnly} value={profile?.lastName} onChange={onChangeLastNameHandler} />
      <Text title={profile?.login} />
    </div>
  );
});
