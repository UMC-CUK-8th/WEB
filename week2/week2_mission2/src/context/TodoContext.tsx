import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoCotext{
    todos: TTodo[];
    doneTodos:TTodo[];
    addTodo:(text:string)=>void;
    completeTodo:(todo:TTodo)=>void;
    deleteTodo:(todo:TTodo)=>void;
}

export const TodoContext = createContext<ITodoCotext|undefined>(undefined);

export const TodoProvider =({children}:PropsWithChildren)=>{
    const [todos, setTodos]=useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos]=useState<TTodo[]>([]);
    //input은 전역변수로 만들 필요가 없다

    const addTodo = ( text:string):void=>{
        const newTodo: TTodo={id:Date.now(), text};
        setTodos((prevTodos):TTodo[]=>[...prevTodos,newTodo]);
    };

    const completeTodo = (todo:TTodo) : void => {
        setTodos(prevTodos => prevTodos.filter((t):boolean => t.id!=todo.id));
        setDoneTodos(prevDoneTodos=>[...prevDoneTodos,todo]);
    };
    
    const deleteTodo = (todo :TTodo) =>{
        setDoneTodos((prevDoneTodo)=>prevDoneTodo.filter((t):boolean =>t.id!==todo.id));
    }

    return (
        <TodoContext.Provider value={{todos, doneTodos, addTodo, completeTodo, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () =>{
    const context = useContext(TodoContext);
    //컨텍스트가 없는 경우 
    if(!context){ //실수했을 때 정확한 에러메세지를 받을 수 있다! 
        throw new Error(
            'useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 합니다.'
        );
    }
    //컨텍스트가 있는 경우 
    return context;
}