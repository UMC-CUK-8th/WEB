import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme(); // 라이트 모드인지, 다크 모드인지 여부도 알아야 한다.

    const isLightMode = theme === THEME.LIGHT;
    return (
        <button onClick={toggleTheme}
            className={clsx('px-4 py-2 mt-4 rounded-md transiton-all', {
                'bg-black text-white': !isLightMode,
                'bg-white text-black': isLightMode,
            })}
            >
            {isLightMode ? '🌙 다크 모드' : '☀️ 라이트 모드'}
        </button>
    );
}
