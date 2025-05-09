import './App.css'
import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
// import LpDetailPage from "./pages/LpDetailPage";
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';
import ProtectedLayout from './layout/ProtectedLayout';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


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
        // {
        //     path: 'lp/:id',
        //     element: <LpDetailPage />,
        // }
      ],
    },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient();

function App() {
    return(
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
        {import.meta.env.DEV &&<ReactQueryDevtools initialIsOpen={false} />}
        {/* import.meta.env.PROD */}
        </QueryClientProvider>
    ); 
}

export default App;
