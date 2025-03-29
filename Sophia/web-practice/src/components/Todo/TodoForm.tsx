import { useTodoContext } from '../../context/TodoContext';

function TodoForm() {
  const { handleSubmit, inputData, setInputData } = useTodoContext();

  return (
    <form action='' className='todo-container__form' onSubmit={handleSubmit}>
      <label htmlFor='todo' className='sr-only'>
        할일 입력
      </label>
      <input type='input' name='todo' id='todo' placeholder='할 일 입력' className='todo-container__input' onChange={(e) => setInputData(e.target.value.trim())} value={inputData} />
      <button type='submit' className='todo-container__button'>
        할 일 추가
      </button>
    </form>
  );
}

export default TodoForm;
