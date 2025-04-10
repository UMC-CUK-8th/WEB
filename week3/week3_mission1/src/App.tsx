import './App.css'
import Movies from "./pages/movies.tsx";


function App() {
    console.log(import.meta.env.VITE_TMDB_KEY);
    return <Movies />
}

export default App
