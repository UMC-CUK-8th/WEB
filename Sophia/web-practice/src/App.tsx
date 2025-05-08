import './App.css';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import NotFoundPage from './pages/site/NotFoundPage';
import LoginPage from './pages/site/LoginPage';
import HomePage from './pages/site/HomePage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/site/SignupPage';
import MyPage from './pages/site/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/site/GoogleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetail from './pages/site/LpDetail';

// import NotFountPage from './pages/MoviePage/NotFountPage';
// import MovieDetail from './pages/MoviePage/MovieDetail';
// import MoviePage from './pages/MoviePage/indext';
// import HomePage from './pages/MoviePage/HomePage';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'my',
        element: <MyPage />,
      },
      {
        path: ':lpId',
        element: <LpDetail />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

// const movieRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//     errorElement: <NotFountPage />,
//     children: [
//       {
//         path: 'movies/:category',
//         element: <MoviePage />,
//       },
//       {
//         path: 'movie/:movieId',
//         element: <MovieDetail />,
//       },
//     ],
//   },
// ]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
