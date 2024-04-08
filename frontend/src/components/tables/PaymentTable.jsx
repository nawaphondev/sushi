import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { PaymentColumns } from "./PaymentColumns";
import axios from "axios";

export default function PaymentTable() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      return axios
        .get("http://localhost:3001/api/payments/all")
        .then((res) => res.data);
    },
  });

  if (isError) return <div>เกิดข้อผิดพลาด</div>;
  if (isLoading) return <div>กำลังโหลด...</div>;

  return (
    <div className="flex flex-col">
      <DataTable columns={PaymentColumns} data={data} />
    </div>
  );
}
