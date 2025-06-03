import './App.css';
// import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Provider } from 'react-redux';

// Movie Optimization
import HomePage from './pages/MovieOptimization/HomePage';

// PlayList
// import Navbar from './components/PlayList/Navbar';
// import CartList from './components/PlayList/CartList';

// Debounce & Throttle
// import ThrottlePage from './pages/site/ThrottlePage';

// Site
// import NotFoundPage from './pages/site/NotFoundPage';
// import LoginPage from './pages/site/LoginPage';
// import HomePage from './pages/site/HomePage';
// import HomeLayout from './layouts/HomeLayout';
// import SignupPage from './pages/site/SignupPage';
// import MyPage from './pages/site/MyPage';
// import ProtectedLayout from './layouts/ProtectedLayout';
// import GoogleLoginRedirectPage from './pages/site/GoogleLoginRedirectPage';
// import LpDetail from './pages/site/LpDetail';
// import store from './store/store';
// import PriceBox from './components/PlayList/PriceBox';

// Movie
// import NotFountPage from './pages/MoviePage/NotFountPage';
// import MovieDetail from './pages/MoviePage/MovieDetail';
// import MoviePage from './pages/MoviePage/indext';
// import HomePage from './pages/MoviePage/HomePage';

// Site
// const publicRoutes: RouteObject[] = [
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
//         path: 'v1/auth/google/callback',
//         element: <GoogleLoginRedirectPage />,
//       },
//       {
//         path: ':lpId',
//         element: <LpDetail />,
//       },
//       {
//         path: 'throttle',
//         element: <ThrottlePage />,
//       },
//     ],
//   },
// ];

// const protectedRoutes: RouteObject[] = [
//   {
//     path: '/',
//     element: <ProtectedLayout />,
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         path: 'my',
//         element: <MyPage />,
//       },
//     ],
//   },
// ];

// const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

// export const queryClient = new QueryClient();

// Movie
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

function App() {
  return (
    // Site
    // <QueryClientProvider client={queryClient}>
    //   <AuthProvider>
    //     <RouterProvider router={router} />
    //   </AuthProvider>
    //   {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    // </QueryClientProvider>

    // PlayList
    // <Provider store={store}>
    //   <Navbar />
    //   <CartList />
    //   <PriceBox />
    // </Provider>

    // Movie Optimization
    <HomePage />
  );
}

export default App;
