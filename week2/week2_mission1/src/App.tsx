
import './App.css'
import Todo from './components/Todo'
import { TodoProvider } from './context/todoContext'

function App(){
  return (
    <TodoProvider>
     <Todo/>
    </TodoProvider>
  )
}

export default App
