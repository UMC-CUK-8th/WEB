import { useTodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';

interface TodoListProps {
  title: string;
  isDone: boolean;
}

function TodoList({ title, isDone }: TodoListProps) {
  const { todos, dones, handleFinish, handleDelete } = useTodoContext();

  const todoArr = isDone ? dones : todos;
  const onUpdate = isDone ? handleDelete : handleFinish;

  return (
    <div className='render-container__section'>
      <h2>{title}</h2>
      <ul id='todo-list' className='render-container__list'>
        {todoArr.map((todo) => (
          <TodoItem todo={todo} onUpdate={(todoId) => onUpdate(todoId)} isDone={isDone} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
