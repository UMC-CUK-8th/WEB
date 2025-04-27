import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import NotFoundPage from './pages/site/NotFoundPage';
// import LoginPage from './pages/site/LoginPage';
// import HomePage from './pages/site/HomePage';
// import HomeLayout from './layouts/HomeLayout';
// import SignupPage from './pages/site/SignupPage';
// import MyPage from './pages/site/MyPage';

import NotFountPage from './pages/MoviePage/NotFountPage';
import MovieDetail from './pages/MoviePage/MovieDetail';
import MoviePage from './pages/MoviePage/indext';
import HomePage from './pages/MoviePage/HomePage';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomeLayout />,
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: 'login',
//         element: <LoginPage />,
//       },
//       {
//         path: 'signup',
//         element: <SignupPage />,
//       },
//       {
//         path: 'my',
//         element: <MyPage />,
//       },
//     ],
//   },
// ]);

const movieRouter = createBrowserRouter([
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
        path: 'movie/:movieId',
        element: <MovieDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={movieRouter} />;
}

export default App;
