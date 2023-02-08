import { useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../model/ThemeContext"

interface ThemeProviderProps {
  children?: JSX.Element | JSX.Element[]
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme.Light || Theme.Light;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const {children} = props;
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const value = useMemo(() => ({
    theme: theme,
    setTheme: setTheme
  }), [theme, setTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}