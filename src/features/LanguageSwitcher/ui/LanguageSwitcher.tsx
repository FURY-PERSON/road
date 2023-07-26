import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import i18n from '@/shared/config/i18n/i18n';
import { Button } from '@/shared/ui/Button/Button';
import cls from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean
}

export const LanguageSwitcher:FC<LanguageSwitcherProps> = memo((props) => {
  const { className, short = false } = props;

  const { t } = useTranslation();

  const toggleLanguage = () => { 
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <div 
      data-testid="LanguageSwitcher"
      className={classNames(cls.LanguageSwitcher, {}, [className])}
    >
      <Button onClick={toggleLanguage}>
        {short ? t('change language short') : t('change language')}
      </Button>
    </div>
  );
});
