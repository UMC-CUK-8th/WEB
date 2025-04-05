import './App.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from './pages/home';
import PopularMoviesPage from './pages/popular';
import NowPlayingMoviesPage from './pages/now-playing';
import TopRatedMoviesPage from './pages/top-rated';
import UpComingMoviesPage from './pages/upcoming';
import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';

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
    ]
  },
])

function App() {
  return <RouterProvider router={router}/>
}

export default App