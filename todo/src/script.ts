// 요소 가져오기
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addTodoButton = document.getElementById("add-todo") as HTMLButtonElement;
const pendingList = document.getElementById("pending-list") as HTMLUListElement;
const completedList = document.getElementById("completed-list") as HTMLUListElement;
const todoContainer = document.querySelector(".todo-container") as HTMLDivElement;

// 할 일 추가 이벤트
addTodoButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") return; // 빈 입력 방지

    addTodo(todoText);
    todoInput.value = "";
});

// 할 일 추가 함수
function addTodo(todoText: string) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${todoText}
        <button class="complete-btn">완료</button>
    `;

    // 완료 버튼 클릭 이벤트
    li.querySelector(".complete-btn")?.addEventListener("click", () => completeTodo(li, todoText));

    pendingList.appendChild(li);
    updateContainerSize();
}

// 완료 목록으로 이동
function completeTodo(todoItem: HTMLLIElement, todoText: string) {
    todoItem.innerHTML = `
        ${todoText}
        <button class="delete-btn">삭제</button>
    `;

    // 삭제 버튼 클릭 이벤트
    todoItem.querySelector(".delete-btn")?.addEventListener("click", () => removeTodo(todoItem));

    completedList.appendChild(todoItem);
    updateContainerSize();
}

// 할 일 삭제 함수
function removeTodo(todoItem: HTMLLIElement) {
    todoItem.remove();
    updateContainerSize();
}

// 박스 크기 업데이트
function updateContainerSize() {
    const itemCount = pendingList.children.length + completedList.children.length;
    todoContainer.style.height = `${200 + itemCount * 55}px`;
}
