import {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Landing from '../pages/Landing'
import NavBar from '../components/NavBar'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AboutPage from '../pages/AboutPage'
import AdminHomePage from '../pages/admin/AdminHomePage'
import AdminSideNav from '../components/AdminSideNav'
import AdminProductPage from '../pages/admin/AdminProductPage'
import AdminProductList from '../components/AdminProductList'
import AdminProductAdd from '../components/AdminProductAdd'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Landing /> },
      { path: 'home', element: <HomePage /> },
      { path: 'login', element: <LoginPage />},
      { path: 'register', element: <RegisterPage />},
      { path: 'about', element: <AboutPage />},
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
      { path: 'login', element: <Navigate to='/' />},
      { path: 'about', element: <AboutPage />},
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <div className='flex flex-row bg-[#E4E7E9] px-4 py-6 gap-x-4'>
      <AdminSideNav />
      <Outlet />
    </div>,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: 'login', element: <Navigate to='/' />},
      {
        element: <AdminProductPage />,
        children: [
          { path: "products", element: <AdminProductList /> },
          { path: "products/add", element: <AdminProductAdd /> }
        ]
      },
    ]
  }
])


export default function AppRouter() {
  const {user} = useAuth()

  const finalRouter = !user?.id ? guestRouter : user.userType === 'ADMIN' ? adminRouter : userRouter

  
  return (
    <RouterProvider router={finalRouter} />
  )
}
