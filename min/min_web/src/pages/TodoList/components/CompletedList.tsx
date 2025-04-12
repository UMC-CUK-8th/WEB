import React from "react";
import TodoItem from "./TodoItem";
import * as S from "../Styles";

interface CompletedListProps {
  completedTodos: string[];
  onDelete: (index: number) => void;
}

const CompletedList: React.FC<CompletedListProps> = ({ completedTodos, onDelete }) => {
  return (
    <S.CompletedContainer>
      <S.CompleteTitle>완료</S.CompleteTitle>
      {completedTodos.map((todo, index) => (
        <TodoItem key={index} text={todo} onDelete={() => onDelete(index)} />
      ))}
    </S.CompletedContainer>
  );
};

export default CompletedList;
