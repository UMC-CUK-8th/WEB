import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NotFoundPage from './pages/NotFoundPage';
import Loginpage from './pages/Loginpage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <Loginpage /> },
      {path: 'signup', element: <SignupPage /> },
      {path: 'my', element: <MyPage /> },
    ],
  },
])

function App() {
  return (
    <div className="bg-black text-white h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;

