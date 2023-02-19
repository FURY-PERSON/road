import { memo, FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './LanguageSwitcher.module.scss';
import { useTranslation } from 'react-i18next';
import i18n from 'shared/config/i18n/i18n';
import { Button } from 'shared/ui/Button/Button';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher:FC<LanguageSwitcherProps> = memo((props) => {
  const { className } = props;

  const {t} = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
      <div className={classNames(cls.LanguageSwitcher, {}, [className])}>
        <Button onClick={toggleLanguage}>{t('change language')}</Button>
      </div>
  );
})