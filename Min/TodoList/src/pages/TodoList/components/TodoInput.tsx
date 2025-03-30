import React, { useState } from "react";
import { useTodo } from "../../../contexts/TodoContext";
import { useThemeClasses } from "../Styles";

const TodoInput: React.FC = () => {
  const [text, setText] = useState("");
  const { addTodo } = useTodo();
  const classes = useThemeClasses();

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <div className={classes.inputContainer}>
      <input
        type="text"
        placeholder="할 일 입력"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleAddTodo()}
        className={classes.input}
      />
      <button onClick={handleAddTodo} className={classes.addButton}>
        할 일 추가
      </button>
    </div>
  );
};

export default TodoInput;
