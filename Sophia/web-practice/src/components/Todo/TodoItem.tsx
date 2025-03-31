import type { Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todoId: number) => void;
  isDone: boolean;
}

function TodoItem({ todo, onUpdate, isDone }: TodoItemProps) {
  const handleClick = (todoId: number) => {
    onUpdate?.(todoId);
  };

  return (
    <li key={todo.id}>
      <p>{todo.text}</p>
      <button type='button' className={isDone ? 'todo-button__delete' : 'todo-button__finish'} onClick={() => handleClick(todo.id)}>
        {isDone ? '삭제' : '완료'}
      </button>
    </li>
  );
}

export default TodoItem;
