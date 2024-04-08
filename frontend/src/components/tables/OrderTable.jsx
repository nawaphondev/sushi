import { OrderColumns } from "./OrderColumns";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

export default function OrderTable() {
  const { pathname } = useLocation();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return axios
        .get("http://localhost:3001/api/orders/all")
        .then((res) => res.data);
    },
  });

  if (isError) return <div>เกิดข้อผิดพลาด</div>;
  if (isLoading) return <div>กำลังโหลด...</div>;

  return (
    <div className="flex flex-col">
      {pathname !== "/" && (
        <div className="flex flex-row items-start justify-between">
          <div>
            <NavLink to="/">Dashboard</NavLink>
            {" > "}
            <span className="text-primary">Order List</span>
          </div>
        </div>
      )}
      <DataTable columns={OrderColumns} data={data} />
    </div>
  );
}
