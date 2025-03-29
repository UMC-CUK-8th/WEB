const todoInput = document.getElementById('todo') as HTMLInputElement;
const todoForm = document.getElementById('todo-container__form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

interface Todo {
  id: number;
  text: string;
}

// 할일 목록
let todos: Todo[] = [];
// 완료 목록
let doneTasks: Todo[] = [];

// 목록 렌더링
const renderTodo = () => {
  // 목록 초기화
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

// 입력창 공백 제거
const getTodoText = () => {
  return todoInput.value.trim();
};

// 할일 목록 추가
const addTodo = (text: string) => {
  todos.push({ id: Date.now(), text });
  todoInput.value = '';
  renderTodo();
};

// 완료 목록으로 이동
const completeTodo = (todo: Todo) => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTodo();
};

// 목록 삭제
const deleteTodo = (todo: Todo) => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTodo();
};

// 목록 생성
const createTodoElement = (todo: Todo, isDone: boolean) => {
  const li = document.createElement('li');
  li.textContent = todo.text;
  const button = document.createElement('button');

  // 완료 여부에 따른 버튼 상태
  if (isDone) {
    button.style.backgroundColor = 'red';
    button.textContent = '삭제';
  } else {
    button.style.backgroundColor = 'green';
    button.textContent = '완료';
  }

  li.appendChild(button);

  // 완료 여부에 따른 클릭이벤트
  button.addEventListener('click', () => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  return li;
};

// 할일 추가 버튼
todoForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});
