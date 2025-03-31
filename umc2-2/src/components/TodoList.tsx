import React from 'react'
import { TTodo } from '../types/todo';

interface TodoListProps {
    title : string;
    todos?: TTodo[];
    buttonLabel : string;
    buttonColor : string;
    onClick: (todo:TTodo) => void;
}

const TodoList = ({title, todos, buttonLabel, buttonColor, onClick}: TodoListProps) => {
  return (
    <div className="list-container_section">
        <h2 className="list-container_title">{title}</h2>
        <ul id='todo-list' className="list-container_list">
            {todos?.map((todo) =>(
                <li key={todo.id} className="list-container_item">
                    <span className="list-container_item-text">{todo.text}</span>
                    <button 
                    onClick={():void => onClick(todo)}
                    style={{backgroundColor:buttonColor}}
                    className="list-container_item-button">{buttonLabel}</button>
                </li>
            ))
            }
        </ul>
    </div>
  )
}

export default TodoList;