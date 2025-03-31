import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import { useTheme, THEME } from '../context/ThemeProvider';
import clsx from 'clsx';

function TodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodoContext();
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  const handleAdd = () => {
    if (text.trim() === '') return;
    addTodo(text.trim());
    setText('');
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-2 mb-4',
        'transition-colors duration-300',
        isLightMode ? '' : ''
      )}
    >
      <input
        type="text"
        id="todo-input"
        placeholder="할 일 입력"
        value={text}
        onChange={e => setText(e.target.value)}
        className={clsx(
          'flex-1 px-4 py-2 rounded-md border outline-none transition-colors duration-300',
          isLightMode
            ? 'bg-white text-black border-gray-300 focus:border-blue-500'
            : 'bg-gray-700 text-white border-gray-600 focus:border-blue-400'
        )}
      />
      <button
        id="add-todo"
        onClick={handleAdd}
        className={clsx(
          'px-4 py-2 rounded-md font-semibold transition-colors duration-300',
          isLightMode
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-blue-400 text-black hover:bg-blue-500'
        )}
      >
        할 일 추가
      </button>
    </div>
  );
}

export default TodoInput;
