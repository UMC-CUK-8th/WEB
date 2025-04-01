
import './App.css'
import Todo from './components/Todo'
import { ThemeProvider } from './context/ThemeProvider'
import { TodoProvider } from './context/todoContext'

function App(){
  return (
    <TodoProvider>
      <ThemeProvider>
     <Todo/>
     </ThemeProvider>
    </TodoProvider>
  )
}

export default App
