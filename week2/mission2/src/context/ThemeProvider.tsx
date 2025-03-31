import React, { createContext, PropsWithChildren, useContext, useState } from "react"

export enum THEME {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme: THEME.LIGHT | THEME.DARK;
    toggleTheme : () => void;
}

export const ThemeContext = createContext<IThemeContext |  undefined>(undefined);

export const ThemeProvider = ({children}: PropsWithChildren) : React.ReactElement => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = () : void => {
        setTheme((prevTheme) : THEME =>
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () : IThemeContext => {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};