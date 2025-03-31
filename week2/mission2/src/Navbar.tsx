import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

function Navbar() : React.ReactElement {
    const {theme} = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav
        className={clsx(
        'p-4 w-full flex justify-end',
        isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>
            <ThemeToggleButton/>
        </nav>
    )
}

export default Navbar;