import { useTodoContext } from '../context/TodoContext';

function TodoList() {
  const { todos, toggleComplete, deleteTodo } = useTodoContext();

  const pending = todos.filter(todo => !todo.isCompleted);
  const completed = todos.filter(todo => todo.isCompleted);

  return (
    <div className="todo-lists">
      <div className="todo-list">
        <h3>할 일</h3>
        <ul id="pending-list">
          {pending.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button className="complete-btn" onClick={() => toggleComplete(todo.id)}>완료</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="completed-list">
        <h3>완료</h3>
        <ul id="completed-list">
          {completed.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
