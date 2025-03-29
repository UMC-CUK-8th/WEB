import { useState } from 'react';
import './styles/style.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { TodoContext } from './context/TodoContext';

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

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
      <div className="todo-container">
        <h2>MADDIE TODO</h2>
        <TodoInput />
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}

export default App;
