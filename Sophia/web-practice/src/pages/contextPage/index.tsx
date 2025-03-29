import ThemeContent from '../../components/Theme/Content';
import Navbar from '../../components/Theme/Navbar';
import { ThemeProvider } from '../../context/ThemeContext';

function ContextPage() {
  return (
    <ThemeProvider>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <Navbar />
        <div className='flex-1 w-full'>
          <ThemeContent />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ContextPage;
