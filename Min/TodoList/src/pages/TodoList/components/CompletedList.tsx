import React from "react";
import { useTodo } from "../../../contexts/TodoContext";
import TodoItem from "./TodoItem";
import { classes } from "../Styles";

const CompletedList: React.FC = () => {
  const { completedTodos, deleteTodo } = useTodo();

  return (
    <div className={classes.completedContainer}>
      <h2 className={classes.title}>완료</h2>
      {completedTodos.map((todo, index) => (
        <TodoItem key={index} text={todo} onDelete={() => deleteTodo(index)} />
      ))}
    </div>
  );
};

export default CompletedList;
