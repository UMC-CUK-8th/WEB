import Navbar from '../context/Navbar'
import ThemeContent from '../context/ThemeContent'
import { ThemeProvider } from '../context/ThemeProvider'

const ContextPage = () => {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justigy-center">
        <Navbar />
        <main className='flex-1'>
          <ThemeContent />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default ContextPage;