// import UseEffectCounterPage from './02-useEffect/UseEffectCounterPage';
// import UseEffectError from './02-useEffect/UseEffectError';
// import UseEffectPage from './02-useEffect/UseEffectPage';
import './App.css';
import MoviePage from './pages/MoviePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// BrowserRouter v5
// createBrowserRouter v6 - 일단은 v6 기준으로 설명.
// react-router-dom v7(next.js, remix)

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage />
      }
    ],
  },
]);

// movies/upcoming
// movies/popular
// movies/now_playing
// movies/top_rated
// movies?category=popular
// movies/123
// movies/category/{movie_id}

function App() {
  return (
    <div className='bg-black'>
      <RouterProvider router={router} />
    </div>
  );
    // <>
    //   {/* <UseEffectPage /> */}
    //   {/* <UseEffectCounterPage /> */}
    //   {/* <UseEffectError /> */}
    //   <MoviePage />
    // </>
}

export default App;
