"use strict";
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");
const todoContainer = document.querySelector(".todo-container");
addTodoButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText === "")
        return;
    addTodo(todoText);
    todoInput.value = "";
});
function addTodo(todoText) {
    var _a;
    const li = document.createElement("li");
    li.innerHTML = `
        ${todoText}
        <button class="complete-btn">완료</button>
    `;
    (_a = li.querySelector(".complete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => completeTodo(li, todoText));
    pendingList.appendChild(li);
    updateContainerSize();
}
function completeTodo(todoItem, todoText) {
    var _a;
    todoItem.innerHTML = `
        ${todoText}
        <button class="delete-btn">삭제</button>
    `;
    (_a = todoItem.querySelector(".delete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => removeTodo(todoItem));
    completedList.appendChild(todoItem);
    updateContainerSize();
}
function removeTodo(todoItem) {
    todoItem.remove();
    updateContainerSize();
}
function updateContainerSize() {
    const itemCount = pendingList.children.length + completedList.children.length;
    todoContainer.style.height = `${200 + itemCount * 55}px`;
}
