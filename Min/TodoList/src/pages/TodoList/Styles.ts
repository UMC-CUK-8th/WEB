import clsx from "clsx";
import { useTheme, THEME } from "../../06-useContext/context/ThemeProvider";

export const useThemeClasses = () => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return {
    container: clsx(
      `
      rounded-[15px]
      shadow-md
      p-6
      w-[500px]
      text-center
    `,
      isLightMode ? 'bg-white' : 'bg-gray-800'
    ),

    title: clsx(
      'text-[24px] font-bold mb-6',
      isLightMode ? 'text-black' : 'text-white'
    ),

    inputContainer: 'flex justify-between items-center mb-6',

    input: clsx(
      `
      flex-1
      border
      rounded-md
      px-4
      py-2
      mr-2
      outline-none
    `,
      isLightMode
        ? 'border-gray-300 bg-white text-black'
        : 'border-gray-600 bg-gray-700 text-white'
    ),

    wrapper: 'flex justify-between gap-4',

    listContainer: 'flex-1',

    completedContainer: 'flex-1',

    titleSection: clsx(
      'font-bold text-lg mb-3',
      isLightMode ? 'text-black' : 'text-white'
    ),

    itemContainer: clsx(
      `
      rounded-md
      p-3
      mb-2
      flex
      items-center
      justify-between
    `,
      isLightMode ? 'bg-gray-100' : 'bg-gray-700'
    ),

    itemText: isLightMode ? 'text-left text-black' : 'text-left text-white',

    addButton: 'bg-green-500 text-white px-4 py-2 rounded-md',

    completeButton: 'bg-green-500 text-white px-3 py-1 rounded-md',

    deleteButton: 'bg-red-500 text-white px-3 py-1 rounded-md',
  };
};
