import { memo, FC } from 'react';

import { Theme, useTheme } from '@/shared/contexts/ThemeProvider';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import ThemeIconDeprecated from '@/shared/assets/icons/theme_icon.svg';
import { Button, ButtonVariant } from '@/shared/ui/deprecated/Button/Button';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { ToggleFeatures } from '@/shared/lib/helpers/features/components/ToggleFeatures/ToggleFeatures';

import cls from './ThemeSwitcher.module.scss';
import clsR from './ThemeSwitcher.redesigned.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo((props) => {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleFeatures
      feature="newDesign"
      off={
        <div className={classNames(cls.ThemeSwitcher, {}, [className])}>
          <Button variant={ButtonVariant.CLEAR} onClick={toggleTheme}>
            <ThemeIconDeprecated
              className={cls.icon}
              stroke={theme === Theme.Dark ? '#0115C6' : '#FFC700'}
            />
          </Button>
        </div>
      }
      on={
        <div className={classNames(cls.ThemeSwitcher, {}, [className])}>
          <ThemeIcon className={clsR.icon} onClick={toggleTheme} />
        </div>
      }
    />
  );
});
