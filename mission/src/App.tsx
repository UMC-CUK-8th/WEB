import './App.css'
import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import ProtectedLayout from './layout/ProtectedLayout';
import { AuthProvider } from './context/AuthContext';

// 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <HomeLayout/>,
        errorElement: <NotFound/>,
       
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
              path:'signup',
              element:<SignupPage/>,
            },
            {
                path: 'v1/auth/google/callback',
                element: <GoogleLoginRedirectPage />,
            },
        ]
    },

];

// 인증 필요한 라우트
const protectedRoutes: RouteObject[] = [
    {
      path: '/',
      element: <ProtectedLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: 'my',
          element: <MyPage />,
        },
      ],
    },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
function App() {
    return(
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    ); 
}

export default App;
