import { memo, FC } from 'react';

import { Theme, useTheme } from '@/shared/contexts/ThemeProvider';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import ThemeIcon from '@/shared/assets/icons/theme_icon.svg';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';

import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo((props) => {
  const { className } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames(cls.ThemeSwitcher, {}, [className])}>
      <Button variant={ButtonVariant.CLEAR} onClick={toggleTheme}>
        <ThemeIcon className={cls.icon} stroke={theme === Theme.Dark ? '#0115C6' : '#FFC700'} />
      </Button>
    </div>
  );
});
