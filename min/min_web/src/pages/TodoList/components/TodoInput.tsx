import React, { useState } from "react";
import * as S from "../Styles";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState("");

  const handleAddTodo = () => {
    if (text.trim()) {
      onAddTodo(text);
      setText("");
    }
  };

  return (
    <S.InputContainer>
      <S.Input
        type="text"
        placeholder="할 일 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
      />
      <S.AddButton onClick={handleAddTodo}>할 일 추가</S.AddButton>
    </S.InputContainer>
  );
};

export default TodoInput;
