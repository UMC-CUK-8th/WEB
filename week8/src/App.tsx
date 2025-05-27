import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LpDetailPage from './pages/LpDetailPage';
import ThrottlePage from './pages/ThrottlePage';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: 'login',
        element: <LoginPage/>,
      },
      {
        path: 'signup',
        element: <SignupPage/>,
      },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleLoginRedirectPage/>,
      },
      {
        path: 'lps/:lpId',
        element: <LpDetailPage />,
      },
      {
        path: 'throttle',
        element: <ThrottlePage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: 'my',
        element: <MyPage/>,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes,]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
