import './App.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { AuthProvider } from './context/authContext';
import { Provider } from 'react-redux';
import store from './app/store';

import HomePage from './pages/home';
import SignUpPage from './pages/signup';
import LoginPage from './pages/login';
import PopularMoviesPage from './pages/popular';
import NowPlayingMoviesPage from './pages/now-playing';
import TopRatedMoviesPage from './pages/top-rated';
import UpComingMoviesPage from './pages/upcoming';
import NotFound from './pages/not-found';
import LPLayout from './layout/LPlayout';
import MovieLayout from './layout/Movielayout';
import MovieDetailPage from './pages/movieDetail';
import OauthCallbackPage from './pages/oauthCallback';
import MyPage from './pages/my';
import ProtectedRoute from './components/protectedRoute';
import LPDetail from './pages/lpDetail';
import SearchPage from './pages/search';
import CartPage from './pages/cart';
import MovieSearchResult from './pages/searchMovie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LPLayout/>,
    errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: <HomePage/>
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
        path: 'mypage',
        element: <ProtectedRoute><MyPage/></ProtectedRoute> 
      },
      {
        path: 'lp/:lpId',
        element: <ProtectedRoute><LPDetail /></ProtectedRoute>
      },  
      {
        path: 'search',
        element: <SearchPage/>
      },
      {
        path: 'store',
        element: <CartPage/>
      }
    ]
  },
  {
    path: '/movies',
    element: <MovieLayout/>,
    children: [
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
        path: 'movies/:movieId',
        element: <MovieDetailPage/>
      },
      {
        path: 'search',
        element: <MovieSearchResult/>
      }
    ]
  }
])

function App() {
  return (
    <Provider store={store}> 
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}

export default App;