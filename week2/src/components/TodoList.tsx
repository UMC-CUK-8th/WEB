import { useTodoContext } from '../context/TodoContext';
import { useTheme, THEME } from '../context/ThemeProvider';
import clsx from 'clsx';

function TodoList() {
  const { todos, toggleComplete, deleteTodo } = useTodoContext();
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;
  
  const pending = todos.filter(todo => !todo.isCompleted);
  const completed = todos.filter(todo => todo.isCompleted);

  return (
    <div className="flex justify-between gap-4 w-full mt-6">
      {/* 할 일 목록 */}
      <div className="flex-1 p-3 rounded-md">
        <h3 className="text-lg font-semibold mb-2">할 일</h3>
        <ul id="pending-list" className="flex flex-col gap-2">
          {pending.map(todo => (
            <li
              key={todo.id}
              className={clsx(
                'flex justify-between items-center px-3 py-2 rounded-md transition-colors duration-300',
                isLightMode
                  ? 'bg-gray-100 text-black'
                  : 'bg-gray-700 text-white'
              )}
            >
              <span>{todo.text}</span>
              <button onClick={() => toggleComplete(todo.id)} className="complete-btn">
                완료
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 완료된 목록 */}
      <div className="flex-1 p-3 rounded-md">
        <h3 className="text-lg font-semibold mb-2">완료</h3>
        <ul id="completed-list" className="flex flex-col gap-2">
          {completed.map(todo => (
            <li
              key={todo.id}
              className={clsx(
                'flex justify-between items-center px-3 py-2 rounded-md transition-colors duration-300 opacity-80',
                isLightMode
                  ? 'bg-gray-100 text-black'
                  : 'bg-gray-700 text-white'
              )}
            >
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
