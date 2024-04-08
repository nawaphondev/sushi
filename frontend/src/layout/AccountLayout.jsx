import UserSideNav from "@/components/navs/UserSideNav";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <div className="flex items-center justify-center flex-grow w-8/12 mx-auto">
      <div className="flex flex-row w-full gap-x-6">
        <UserSideNav />
        <Outlet />
      </div>
    </div>
  );
}
