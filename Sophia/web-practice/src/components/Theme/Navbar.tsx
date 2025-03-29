import clsx from 'clsx';
import { THEME, useThemeContext } from '../../context/ThemeContext';
import ThemeToggleButton from './ToggleButton';

function Navbar() {
  const { theme } = useThemeContext();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={clsx('p-4 w-full flex justify-end', isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white')}>
      <ThemeToggleButton />
    </div>
  );
}

export default Navbar;
