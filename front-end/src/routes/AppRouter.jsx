import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Landing from '../pages/Landing'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AboutPage from '../pages/AboutPage'
import AdminProductList from '../components/productTable/AdminProductList'
import AdminProductAdd from '../components/AdminProductAdd'
import ProductPage from '../pages/ProductPage'
import AdminLayout from '@/layout/AdminLayout'
import AdminDashboard from '@/components/AdminDashboard'
import MainLayout from '@/layout/MainLayout'
import CartPage from '@/pages/CartPage'
import CheckOutPage from '@/pages/CheckOut'
import OrderDetails from '@/pages/OrderDetails'
import AccountLayout from '@/layout/AccountLayout'
import UserDashBoard from '@/components/UserDashboard'
import UserOrders from '@/components/UserOrders'
import UserProfile from '@/components/UserProfile'

const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: '/home', element: <HomePage /> },
      { path: 'login', element: <LoginPage />},
      { path: 'register', element: <RegisterPage />},
      { path: 'about', element: <AboutPage />},
      { path: 'product/:id', element: <ProductPage />},
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to='/home' /> },
      { path: '/home', element: <HomePage /> },
      { path: 'login', element: <Navigate to='/' />},
      { path: 'register', element: <Navigate to='/' />},
      { path: 'about', element: <AboutPage />},
      { path: 'product/:id', element: <ProductPage />},
      { path: 'cart', element: <CartPage />},
      { path: 'checkout', element: <CheckOutPage />},
      { path: 'order/:id', element: <OrderDetails />},
      { path: 'account',
        element: <AccountLayout />,
        children: [
          { index: true, element: <UserDashBoard />},
          { path: '/account/orders', element: <UserOrders />},
          { path: '/account/profile', element: <UserProfile />},
        ]
      }
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'login', element: <Navigate to='/' />},
      {
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
