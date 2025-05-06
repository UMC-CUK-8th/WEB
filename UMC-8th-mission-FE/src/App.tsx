import './App.css'
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/Loginpage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomeTestLayout from './layouts/HomeTestLayout';

// publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes:RouteObject[] = [
  {
    path: '/',
    element: <HomeTestLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage />}, 
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'v1/auth/google/callback', element: <GoogleLoginRedirectPage /> },
    ],
  }
];

// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes:RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
      path: 'my',
      element: <MyPage />,
      },
    ],
  }
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

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
        <div className="bg-black text-white min-h-screen">
          <AuthProvider>
                <RouterProvider router={router} />
          </AuthProvider>
        </div>  
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}  
      </QueryClientProvider>
  )
}

export default App;

