import { useState } from 'react';
import './styles/style.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { TodoContext } from './context/TodoContext';
import { THEME, ThemeProvider, useTheme } from './context/ThemeProvider';
import ThemeToggleButton from './components/ThemeToggleButton';
import clsx from 'clsx';

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

function AppContent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleComplete, deleteTodo }}>
      {/* 배경 전체 */}
      <div
        className={clsx(
          'min-h-screen transition-colors flex flex-col items-center py-10',
          isLightMode ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'
        )}
      >
        {/* 상단 토글 영역 */}
        <div
          className={clsx(
            'w-full flex justify-end p-4',
            isLightMode ? 'bg-gray-100' : 'bg-gray-900'
          )}
        >
          <ThemeToggleButton />
        </div>

        {/* 투두 카드 */}
        <div
          className={clsx(
            'rounded-[15px] shadow-md p-6 w-[500px] text-center mt-6 transition-all',
            isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
          )}
        >
          <h2 className="text-[24px] font-bold mb-6">MADDIE TODO</h2>
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </TodoContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;