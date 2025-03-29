import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import CompletedList from "./components/CompletedList";
import { TodoProvider } from "../../contexts/TodoContext";
import { classes } from "./Styles";

const Todo: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <TodoProvider>
        <div className={classes.container}>
          <h2 className={classes.title}>UMC TODOLIST</h2>
          <TodoInput />
          <div className={classes.wrapper}>
            <TodoList />
            <CompletedList />
          </div>
        </div>
      </TodoProvider>
    </div>
  );
};

export default Todo;
