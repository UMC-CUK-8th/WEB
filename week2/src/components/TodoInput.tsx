import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

function TodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodoContext();

  const handleAdd = () => {
    if (text.trim() === '') return;
    addTodo(text.trim());
    setText('');
  };

  return (
    <div className="input-area">
      <input
        type="text"
        id="todo-input"
        placeholder="할 일 입력"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button id="add-todo" onClick={handleAdd}>
        할 일 추가
      </button>
    </div>
  );
}

export default TodoInput;
