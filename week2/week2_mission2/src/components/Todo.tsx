import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/todoContext";
import ThemeToggleButton from "../context/ThemeToggleButton";
import { THEME, ThemeProvider, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

const Todo = () =>{
    const {todos, completeTodo, deleteTodo, doneTodos} = useTodo();
    
    const { theme}= useTheme();
    const isLightMode = theme ===THEME.LIGHT;
    
      
    return (
    <>
    <div className={clsx('todo-container', isLightMode ? "text-black bg-white" : "text-white bg-gray-800")} >
      <ThemeToggleButton/>
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList title='할 일' todos={todos} buttonLabel='완료'
        buttonColor='#28a745'onClick={completeTodo} />
        <TodoList title='완료' todos={doneTodos} buttonLabel='삭제'
        buttonColor='#dc3545'onClick={deleteTodo}/>
      </div>
      </div>
    </>
    )
}

export default Todo;

