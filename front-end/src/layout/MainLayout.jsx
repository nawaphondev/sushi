import NavBar from "@/components/navs/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col flex-1">
      <NavBar />
      <Outlet />
    </div>
  );
}
