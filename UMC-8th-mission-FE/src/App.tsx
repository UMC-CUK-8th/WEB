import './App.css'
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/Loginpage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import { AuthProvider } from './context/AuthContext';

// publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes:RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
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

function App() {
  return (
    <AuthProvider>
      <div className="bg-black text-white min-h-screen">
          <RouterProvider router={router} />
      </div>
    </AuthProvider>
  )
}

export default App;

