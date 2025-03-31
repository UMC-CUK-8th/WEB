import { createContext, PropsWithChildren, useContext, useState } from 'react';

export enum THEME {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTheme | undefined;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext는 반드시 ThemeProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
