import AdminNavBar from "../components/AdminNavBar";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

export default function AdminLayout() {
  return (
    <div className="flex flex-col flex-1">
      <AdminNavBar />
      <Outlet />
      <img src={logo} className="self-center h-[260px]" alt="" />
    </div>
  );
}
