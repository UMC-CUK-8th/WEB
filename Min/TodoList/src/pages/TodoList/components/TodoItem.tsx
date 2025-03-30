import React from "react";
import { useThemeClasses } from "../Styles"; 

interface TodoItemProps {
  text: string;
  onComplete?: () => void;
  onDelete?: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ text, onComplete, onDelete }) => {
  const classes = useThemeClasses();

  return (
    <div className={classes.itemContainer}>
      <span className={classes.itemText}>{text}</span>
      {onComplete && (
        <button onClick={onComplete} className={classes.completeButton}>
          완료
        </button>
      )}
      {onDelete && (
        <button onClick={onDelete} className={classes.deleteButton}>
          삭제
        </button>
      )}
    </div>
  );
};

export default TodoItem;
