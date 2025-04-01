import { THEME, useTheme } from '../context/ThemeProvider';
import clsx from 'clsx';

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <button
            onClick={toggleTheme}
            className={clsx(
                'text-xs px-3 py-1 transition-colors duration-300',
                isLightMode
                  ? 'border-gray-500 text-gray-700 hover:bg-gray-200'
                  : 'border-gray-400 text-gray-200 hover:bg-gray-700'
            )}
        >
            {isLightMode ? '다크 모드' : '라이트 모드'}
        </button>
    );
}