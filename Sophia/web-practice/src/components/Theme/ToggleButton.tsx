import { THEME, useThemeContext } from '../../context/ThemeContext';
import clsx from 'clsx';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeContext();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className={clsx('px-4 py-2 mt-4 rounded-md transition-all', {
        'bg-black text-white': !isLightMode,
        'bg-white text-black': isLightMode,
      })}
    >
      {isLightMode ? '🌙다크 모드' : '☀️라이트 모드'}
    </button>
  );
}

export default ThemeToggleButton;
