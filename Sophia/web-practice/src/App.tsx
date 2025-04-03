import './App.css';
import HomePage from './pages/MoviePage/HomePage';
import MoviePage from './pages/MoviePage/indext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFountPage from './pages/MoviePage/NotFountPage';
import MovieDetail from './pages/MoviePage/MovieDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFountPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
