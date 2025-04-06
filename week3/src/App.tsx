import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MoviePage from './pages/MoviePage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage/>,
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage/>,
      },
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
