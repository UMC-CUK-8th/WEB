import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/site/NotFoundPage';
import LoginPage from './pages/site/LoginPage';
import HomePage from './pages/site/HomePage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/site/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
