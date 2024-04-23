import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

export default function MainLayout() {
  return (
    <div className="flex flex-col flex-1">
      <NavBar />
      <Outlet />
      <img src={logo} className="self-center w-1/3" alt="" />
    </div>
  );
}
