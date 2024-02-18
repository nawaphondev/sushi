import { Outlet, useLocation } from "react-router-dom";
import AdminSideNav from "@/components/navs/AdminSideNav";
import { Separator } from "@/components/ui/separator";
import { thaiDateFormat } from "@/lib/utils";

export default function AdminLayout() {
  const { pathname } = useLocation();
  const title = pathname === "/" ? "dashboard" : pathname.split("/")[1];

  return (
    <div className="flex flex-row flex-1 bg-[#E4E7E9] px-4 py-6 gap-x-2">
      <AdminSideNav />
      <Separator orientation="vertical" className="bg-black" />
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-[#191C1F] font-extrabold text-2xl capitalize">
            {title}
          </h1>
          <div>{thaiDateFormat(null, true)}</div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
