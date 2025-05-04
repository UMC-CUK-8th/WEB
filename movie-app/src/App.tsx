import './App.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { AuthProvider } from './context/authContext';

import HomePage from './pages/home';
import SignUpPage from './pages/signup';
import LoginPage from './pages/login';
import PopularMoviesPage from './pages/popular';
import NowPlayingMoviesPage from './pages/now-playing';
import TopRatedMoviesPage from './pages/top-rated';
import UpComingMoviesPage from './pages/upcoming';
import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';
import MovieDetailPage from './pages/movieDetail';
import OauthCallbackPage from './pages/oauthCallback';
import MyPage from './pages/my';
import ProtectedRoute from './components/protectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'popular',
        element: <PopularMoviesPage/>
      },
      {
        path: 'now-playing',
        element: <NowPlayingMoviesPage/>
      },
      {
        path: 'top-rated',
        element: <TopRatedMoviesPage/>
      },
      {
        path: 'upcoming',
        element: <UpComingMoviesPage/>
      },
      {
        path: 'signup',
        element: <SignUpPage/>
      },
      {
        path: '/v1/auth/google/callback',
        element: <OauthCallbackPage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage/>
      },
      {
        path: 'mypage',
        element: <ProtectedRoute><MyPage/></ProtectedRoute> 
      },
    ]
  },
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;