"use strict";
const todoInput = document.getElementById('todo');
const todoForm = document.getElementById('todo-container__form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let doneTasks = [];
const renderTodo = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTodo();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTodo();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTodo();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    const button = document.createElement('button');
    if (isDone) {
        button.style.backgroundColor = 'red';
        button.textContent = '삭제';
    }
    else {
        button.style.backgroundColor = 'green';
        button.textContent = '완료';
    }
    li.appendChild(button);
    button.addEventListener('click', () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    return li;
};
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
