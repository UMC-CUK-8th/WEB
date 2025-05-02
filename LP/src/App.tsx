
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';

//publicRoutes : 인증 없이 접근 가능 라우트
const publicRoutes:RouteObject[]=[
  {
    path: "/",
    element: <HomeLayout />, //공유하는 부분만! 
    errorElement: <NotFoundPage />,
    children: [
      {index:true, element: <HomePage/ >},
      {path:'login', element: <LoginPage/ >},
      {path:'signup', element: <SignupPage/ >},
    ]
  }
];
//protectedRoutes : 인증이 필요한 라우트
const protectedRoutes:RouteObject[]=[
  {
    path:"/",
    element:(<ProtectedLayout><HomeLayout/></ProtectedLayout>),
    errorElement: <NotFoundPage />,

    children:[{
      path:'my',
      element:<MyPage/>,
    }]
  }
]

const router = createBrowserRouter([...publicRoutes,...protectedRoutes]);
function App() {
  

  return(
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
