import {  PropsWithChildren, createContext, useContext, useState } from "react";

export enum THEME{
    LIGHT="LIGHT",
    DARK="DARK",
}
type TTheme=THEME.LIGHT|THEME.DARK;

interface IThemeCOntext{
    theme:TTheme;
    toggleTHeme :() =>void;
}


export const ThemeContext = createContext<IThemeCOntext|undefined>(undefined);

export const ThemeProvider = ({children}:PropsWithChildren) =>{
    const[theme,setTheme] = useState<TTheme>(THEME.LIGHT);
    const toggleTHeme =()=>{
        setTheme((prevTheme)=>
        prevTheme===THEME.LIGHT?THEME.DARK:THEME.LIGHT
        );
    }
    return(
        <ThemeContext.Provider value={{theme:theme, toggleTHeme:toggleTHeme}} >
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () =>{

    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
