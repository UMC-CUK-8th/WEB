import React from "react";
import * as S from "../Styles"

interface TodoItemProps {
  text: string;
  onComplete?: () => void;
  onDelete?: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ text, onComplete, onDelete }) => {
  return (
    <S.ItemContainer>
      <S.ItemText>{text}</S.ItemText>
      {onComplete && <S.CompleteButton onClick={onComplete}>완료</S.CompleteButton>}
      {onDelete && <S.DeleteButton onClick={onDelete}>삭제</S.DeleteButton>}
    </S.ItemContainer>
  );
};

export default TodoItem;
