import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import i18n from '@/shared/config/i18n/i18n';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button/Button';
import { ToggleFeatures } from '@/shared/lib/helpers/ToggleFeatures/ToggleFeatures';
import { Button } from '@/shared/ui/redesigned/Button/Button';

import cls from './LanguageSwitcher.module.scss';
import clsR from './LanguageSwitcher.redesigned.module.scss';

interface LanguageSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = memo((props) => {
  const { className, short = false } = props;

  const { t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div
          data-testid="LanguageSwitcher"
          className={classNames(cls.LanguageSwitcher, {}, [className])}
        >
          <ButtonDeprecated onClick={toggleLanguage}>
            {short ? t('change language short') : t('change language')}
          </ButtonDeprecated>
        </div>
      }
      on={
        <div
          data-testid="LanguageSwitcher"
          className={classNames(clsR.LanguageSwitcher, {}, [className])}
        >
          <Button onClick={toggleLanguage} variant="clear">
            {short ? t('change language short') : t('change language')}
          </Button>
        </div>
      }
    />
  );
});
