import { TTodo } from '../types/todo';
import TodoForm from './TodoForm';  
import TodoList from './TodoList';
import { useTodo } from '../TodoContext';

const Todo = () => {

    const {todos, completeTodo, deleteTodo, doneTodos} = useTodo();

    return (
        <div className="todo-container">
            <h1 className="todo-container_header">UMC TODO</h1>
            <TodoForm />
            <div className="list-container">
                <TodoList title='할 일' todos={todos} buttonLabel='완료' buttonColor='#28a745'
                        onClick={completeTodo}/>
                <TodoList title='완료' todos={doneTodos} buttonLabel='삭제' buttonColor='#dc3545' onClick={deleteTodo}/>
            </div>
        </div>
    ) 
}

export default Todo;
