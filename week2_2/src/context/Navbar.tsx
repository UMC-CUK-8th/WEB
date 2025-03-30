import ThemeToggleButton from "./ThemeToggleButton";
import { THEME, useTheme } from "./ThemeProvider";
import clsx from "clsx";


const Navbar = () => {
    const {theme} = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav className={clsx('p-4 w-screen flex justify-end', isLightMode ? 'bg-white' : 'bg-gray-800')}>
            <ThemeToggleButton />
        </nav>
    )
}

export default Navbar;