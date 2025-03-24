const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addTodoButton = document.getElementById("add-todo") as HTMLButtonElement;
const pendingList = document.getElementById("pending-list") as HTMLUListElement;
const completedList = document.getElementById("completed-list") as HTMLUListElement;
const todoContainer = document.querySelector(".todo-container") as HTMLDivElement;

addTodoButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") return; 

    addTodo(todoText);
    todoInput.value = "";
});

function addTodo(todoText: string) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${todoText}
        <button class="complete-btn">완료</button>
    `;

    li.querySelector(".complete-btn")?.addEventListener("click", () => completeTodo(li, todoText));

    pendingList.appendChild(li);
    updateContainerSize();
}

function completeTodo(todoItem: HTMLLIElement, todoText: string) {
    todoItem.innerHTML = `
        ${todoText}
        <button class="delete-btn">삭제</button>
    `;

    todoItem.querySelector(".delete-btn")?.addEventListener("click", () => removeTodo(todoItem));

    completedList.appendChild(todoItem);
    updateContainerSize();
}

function removeTodo(todoItem: HTMLLIElement) {
    todoItem.remove();
    updateContainerSize();
}

function updateContainerSize() {
    const itemCount = pendingList.children.length + completedList.children.length;
    todoContainer.style.height = `${200 + itemCount * 55}px`;
}
