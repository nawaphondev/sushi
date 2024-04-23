import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MainLayout from "../layout/MainLayout";

import ErrorBoundary from "../pages/ErrorBoundary";
import HomePage from "../pages/user/HomePage";
import RegisterForm from "../components/forms/RegisterForm";

import UserProfile from "../pages/user/UserProfile";
import OrderHistory from "../pages/user/OrderHistory";
import GuestLayout from "../layout/GuestLayout";
import LoginForm from "../components/forms/LoginForm";
import AdminLayout from "../layout/AdminLayout";

import AdminMenuPage from "../pages/admin/AdminMenuPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminReservationPage from "../pages/admin/AdminReservationPage";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      //   { path: "forgot", element: <ForgotPasswordPage /> },
      //   { path: "product/:id", element: <ProductPage /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: "/home", element: <HomePage /> },
      { path: "login", element: <Navigate to="/" /> },
      { path: "register", element: <Navigate to="/" /> },
      // { path: "menu", element: <MenuPage /> },
      // { path: "about", element: <AboutPage /> },
      { path: "/bills", element: <OrderHistory /> },
      { path: "account", element: <UserProfile /> },
    ],
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorBoundary />,
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: "/home", element: <AdminHomePage /> },
      { path: "login", element: <Navigate to="/" /> },
      { path: "register", element: <Navigate to="/" /> },
      { path: "menu", element: <AdminMenuPage /> },
      { path: "reservations", element: <AdminReservationPage /> },
    ],
    // children: [
    //   { index: true, element: <AdminDashboard /> },
    //   { path: "login", element: <Navigate to="/" /> },
    //   {
    //     children: [
    //       { path: "products", element: <ProductTable /> },
    //       { path: "products/add", element: <ProductForm title="Add" /> },
    //       { path: "products/:id", element: <ProductForm title="Edit" /> },
    //     ],
    //   },
    //   {
    //     children: [
    //       { path: "orders", element: <OrderTable /> },
    //       { path: "orders/:id", element: <AdminOrderDetails /> },
    //     ],
    //   },
    //   { path: "/admin", element: <UserTable userType="admin" /> },
    //   { path: "/customer", element: <UserTable /> },
    //   { path: "/transactions", element: <PaymentTable /> },
    // ],
  },
]);

export default function AppRouter() {
  const { user } = useAuth();

  const finalRouter = !user?.id
    ? guestRouter
    : user.status === "ADMIN"
    ? adminRouter
    : userRouter;

  return <RouterProvider router={finalRouter} />;
}
