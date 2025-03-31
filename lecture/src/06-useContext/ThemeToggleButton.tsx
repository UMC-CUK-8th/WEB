import { THEME, useTheme } from './context/ThemeProvider';
import clsx from 'clsx';
export default function ThemeToggleButton(){
    const {theme,toggleTHeme}= useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (<button onClick={toggleTHeme}
        className={clsx('px-4 py-2 mt-4 rounded-md transition-all',{
            'bg-black text-white': !isLightMode,
            'bg-white text-black': isLightMode,
        })}
    >
        {isLightMode?'🌙다크모드':'라이트모드'}
    </button>
    );
}