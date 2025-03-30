import { useTheme, THEME } from './ThemeProvider';
import clsx from 'clsx';

const ThemeContext = () => {
    const {theme} = useTheme();
    const isLightMode = theme === THEME.LIGHT;
    
  return (
    <div className={clsx('p-4 h-dvh w-screen', isLightMode ? 'bg-white' : 'bg-gray-800')}>

        <h1 className={clsx('text-wxl font-bold', isLightMode ? 'text-black' : 'text-white')}> Theme Content </h1>
        <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>UMC 미션</p>
    </div>
  )
}

export default ThemeContext;