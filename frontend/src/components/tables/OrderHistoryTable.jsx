import { OrderHistoryColumns } from "./OrderHistoryColumns";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import axios from "axios";

export default function UserOrders() {
  const { user } = useAuth();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3001/api/orders/user/${user.id}`)
        .then((res) => res.data);
    },
  });

  if (isError) return <div>เกิดข้อผิดพลาด</div>;
  if (isLoading) return <div>กำลังโหลด...</div>;

  return (
    <div className="flex flex-col flex-1">
      <h1>คำสั่งซื้อ</h1>

      <DataTable columns={OrderHistoryColumns} data={data} />
    </div>
  );
}
