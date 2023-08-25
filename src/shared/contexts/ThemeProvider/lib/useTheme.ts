import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../model/ThemeContext';

interface IUseTheme {
  toggleTheme: () => void;
  theme: Theme;
}

export const useTheme = (): IUseTheme => {
  const { setTheme, theme } = useContext(ThemeContext);

  const toggle = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    setTheme?.(newTheme);
  };

  return {
    theme: theme || Theme.Light,
    toggleTheme: toggle
  };
};
