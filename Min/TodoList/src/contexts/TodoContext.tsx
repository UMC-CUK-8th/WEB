import { createContext, useContext, useState, ReactNode } from "react";

interface TodoContextType {
  todos: string[];
  completedTodos: string[];
  addTodo: (text: string) => void;
  completeTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within a TodoProvider");
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);

  const addTodo = (text: string) => setTodos([...todos, text]);

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    const completed = newTodos.splice(index, 1)[0] ?? "";
    setTodos(newTodos);
    setCompletedTodos([...completedTodos, completed]);
  };

  const deleteTodo = (index: number) => {
    setCompletedTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TodoContext.Provider
      value={{ todos, completedTodos, addTodo, completeTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
