import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NotFoundPage from './pages/NotFoundPage';
import Loginpage from './pages/Loginpage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <Loginpage /> },
      {path: 'signup', element: <SignupPage /> }
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;

