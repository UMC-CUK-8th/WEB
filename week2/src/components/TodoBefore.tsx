import { useState } from 'react';
import { TTodo } from '../types/todo';
const TodoBefore = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("동작함");
        const text = input.trim();
        if (text){
            const newTodo: TTodo = {
                id: Date.now(),
                text,
            };
            setTodos((prevTodos):TTodo[] => [...prevTodos, newTodo]);
            setInput('');
        };
    };
    const completeTodo = (todo:TTodo) => {
        setTodos((prevTodos):TTodo[] => prevTodos.filter((t):boolean => t.id !== todo.id));
        setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
    };
    const deleteTodo = (todo:TTodo) => {
        setDoneTodos((prevDoneTodos):TTodo[] => prevDoneTodos.filter((t):boolean => t.id !== todo.id)); 
    };
  return (
    <div className='todo-container'>
        <h1 className='todo-container_header'>UMC TODO</h1>
        <form onSubmit={handleSubmit}className="todo-container_form">
            <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" className="todo-container_input" placeholder="할 일을 입력해주세요" required/>
            <button className="todo-container_button">추가</button>
        </form>
        <div className="list-container">
            <div className="list-container_section">
                <h2 className="list-container_title">할 일</h2>
                <ul id="todo-list"className="list-container_list">
                    {todos.map((todo) => (
                        <li key={todo.id} className="list-container_item">
                            <span className="list-container_item-text">{todo.text}</span>
                            <button onClick= {():void=>completeTodo(todo)}style={{backgroundColor:'#28a745'}} className="list-container_item-button">완료</button>
                        </li>
                    ))}              
            </ul>
            </div>
            
            <div className="list-container_section">
                <h2 className="list-container_title">완료</h2>
                <ul id="todo-list"className="list-container_list">
                {doneTodos.map((todo) => (
                        <li key={todo.id} className="list-container_item">
                            <span className="list-container_item-text">{todo.text}</span>
                            <button onClick={()=>deleteTodo(todo)} style={{backgroundColor:'#dc3545'}} className="list-container_item-button">삭제</button>
                        </li>
                    ))}     
               
            </ul>
            </div>
        </div>
    </div>
  );
}
export default TodoBefore;