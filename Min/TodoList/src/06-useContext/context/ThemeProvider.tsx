import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
};

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContextState {
    theme: TTheme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<IThemeContextState | undefined>(undefined)   // 값이 없을 수 있어서 undifined로.

export const ThemeProvider = ({children}: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}> 
            {children}
        </ThemeContext.Provider>
    )
}

// key랑 value 값 같으면 생략 가능.

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}