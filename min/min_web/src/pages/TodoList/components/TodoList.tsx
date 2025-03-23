import React from "react";
import TodoItem from "./TodoItem";
import * as S from "../Styles";

interface TodoListProps {
  todos: string[];
  onComplete: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete }) => {
  return (
    <S.ListContainer>
      <S.Title>할 일</S.Title>
      {todos.map((todo, index) => (
        <TodoItem key={index} text={todo} onComplete={() => onComplete(index)} />
      ))}
    </S.ListContainer>
  );
};

export default TodoList;
