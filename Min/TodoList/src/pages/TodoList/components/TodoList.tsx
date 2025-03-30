import React from "react";
import { useTodo } from "../../../contexts/TodoContext";
import TodoItem from "./TodoItem";
import { useThemeClasses } from "../Styles";

const TodoList: React.FC = () => {
  const { todos, completeTodo } = useTodo();
  const classes = useThemeClasses();
  
  return (
    <div className={classes.listContainer}>
      <h2 className={classes.title}>할 일</h2>
      {todos.map((todo, index) => (
        <TodoItem key={index} text={todo} onComplete={() => completeTodo(index)} />
      ))}
    </div>
  );
};

export default TodoList;
