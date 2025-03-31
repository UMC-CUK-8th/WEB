import clsx from 'clsx';
import { THEME, useThemeContext } from '../../context/ThemeContext';

function ThemeContent() {
  const { theme } = useThemeContext();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={clsx('p-4 h-dvh', isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white')}>
      <h1 className={clsx('text-2xl font-bold', isLightMode ? 'text-black' : 'text-white')}>ThemeContent</h1>
      <p className={clsx('mt-2', isLightMode ? 'text-balck' : 'text-white')}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam cum vitae dolore? Quae aliquam praesentium sint dolorum esse reprehenderit minima? Animi dolorum rem impedit quas iure, laudantium amet voluptatibus ea.</p>
    </div>
  );
}

export default ThemeContent;
