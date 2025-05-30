import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import CompletedList from "./components/CompletedList";
import { TodoProvider } from "../../contexts/TodoContext";
import ThemeToggleButton from "../../06-useContext/ThemeToggleButton";
import { useThemeClasses } from "./Styles";

const Todo: React.FC = () => {
  const classes = useThemeClasses(); 

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <TodoProvider>
          <div className={classes.container}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={classes.title}>UMC TODOLIST</h2>
            </div>

            <TodoInput />
            <ThemeToggleButton />

            <div className={classes.wrapper}>
              <TodoList />
              <CompletedList />
            </div>
          </div>
        </TodoProvider>
      </div>
    </>
  );
};

export default Todo;
