import { createContext, useContext } from 'react';
import type { Todo } from '../App';

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoContext는 TodoContext.Provider 내부에서만 사용 가능 ㅜ.ㅜㅜ');
  return context;
};
