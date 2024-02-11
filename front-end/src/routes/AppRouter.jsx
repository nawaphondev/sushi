import {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Landing from '../pages/Landing'
import NavBar from '../components/NavBar'
import ContactForm from '../pages/ContactForm'
import HomePage from '../pages/HomePage'
import AdminDashboard from '../pages/AdminDashboard'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Landing /> },
      { path: '/home', element: <HomePage /> },
      { path: '/login', element: <LoginPage />},
      { path: '/register', element: <RegisterPage />},
      { path: '/about', element: <ContactForm />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <Navigate to='/' />},
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
    ]
  }
])


export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}
