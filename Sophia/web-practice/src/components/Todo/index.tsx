import { TodoProvider } from '../../context/TodoContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './style.css';

function Todo() {
  return (
    <TodoProvider>
      <div className='todo-container'>
        <h1>TODO LIST</h1>
        <TodoForm />
        <div className='render-container'>
          <TodoList title='할 일' isDone={false} />
          <TodoList title='완료' isDone={true} />
        </div>
      </div>
    </TodoProvider>
  );
}

export default Todo;
