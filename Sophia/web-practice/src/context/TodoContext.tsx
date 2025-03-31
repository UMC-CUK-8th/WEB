import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Todo } from '../types/todo';

interface TodoContextProps {
  todos: Todo[];
  dones: Todo[];
  inputData: string;
  setInputData: (inputData: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFinish: (todoId: number) => void;
  handleDelete: (todoId: number) => void;
}

export const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Todo[]>([]);

  const [inputData, setInputData] = useState<string>('');

  // 할 일 추가 버튼
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: inputData,
      },
    ]);

    setInputData('');
  };

  // 완료 버튼
  const handleFinish = (todoId: number) => {
    const updateTodos = todos.filter((todo) => todoId !== todo.id);
    setTodos(updateTodos);

    const doneTodos = todos.find((todo) => todoId === todo.id);

    if (doneTodos) {
      setDones((prev) => [...prev, doneTodos]);
    }
  };

  // 삭제 버튼
  const handleDelete = (todoId: number) => {
    const updateDones = dones.filter((done) => todoId !== done.id);
    setDones(updateDones);
  };

  return <TodoContext.Provider value={{ todos, dones, inputData, handleSubmit, handleFinish, handleDelete, setInputData }}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext는 반드시 TodoProvider 내부에서 사용되어야 합니다.');
  }

  return context;
};
