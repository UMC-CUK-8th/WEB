import {  createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME{
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}
type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext{
    theme: TTheme
    toggleTheme: () => void;
}

export const ThemContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children} : PropsWithChildren)  => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

    const toggleTheme = ():void => {
        setTheme((prevTheme):THEME =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
    };

    return (
        <ThemContext.Provider value={{theme, toggleTheme}}>{children}</ThemContext.Provider>
    );
}

export const useTheme = () :IThemeContext => {
    const context = useContext(ThemContext);

    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}