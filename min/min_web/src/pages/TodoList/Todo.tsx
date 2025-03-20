import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import CompletedList from "./components/CompletedList";
import * as S from "./Styles"; 

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [completedTodos, setCompletedTodos] = useState<string[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, text]);
  };

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    const completedTask = newTodos.splice(index, 1)[0] ?? ""; // 기본값 설정
    setTodos(newTodos);
    setCompletedTodos([...completedTodos, completedTask]);
  };

  const deleteTodo = (index: number) => {
    setCompletedTodos((prevCompleted) => prevCompleted.filter((_, i) => i !== index));
  };

  return (
    <S.Container>
      <S.Title>UMC TODOLIST</S.Title>
      <TodoInput onAddTodo={addTodo} />
      <S.Wrapper>
        <TodoList todos={todos} onComplete={completeTodo} />
        <CompletedList completedTodos={completedTodos} onDelete={deleteTodo} />
      </S.Wrapper>
    </S.Container>
  );
};

export default Todo;
