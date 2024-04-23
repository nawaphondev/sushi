import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

export default function GuestLayout() {
  return (
    <div className="flex items-center justify-between flex-1 w-8/12 mx-auto">
      <div className="flex flex-col items-center gap-y-6">
        <img src={logo} className="h-32 mb-auto" />
        <h1 className="text-xl font-bold">Welcome to Omakase</h1>
        <p>welcome to serve you.</p>
      </div>
      <Outlet />
    </div>
  );
}
