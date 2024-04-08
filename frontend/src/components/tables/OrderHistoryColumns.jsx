import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { thaiDateFormat } from "@/lib/utils";

export const OrderHistoryColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "สถานะ",
  },
  {
    accessorKey: "orderDate",
    header: "วันที่สั่งซื้อ",
    cell: ({ row }) => {
      return thaiDateFormat(row.getValue("orderDate"));
    },
  },
  {
    accessorKey: "price",
    header: "ราคา",
    cell: ({ row }) => {
      // const total = 0
      const total = row.original?.orderDetails?.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
      const amount = parseFloat(total);
      const formatted = new Intl.NumberFormat("th-TH").format(amount);
      return <div className="font-medium text-right">{formatted} บาท</div>;
    },
  },
  {
    id: "details",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Button asChild>
          <Link to={`/order/${order.id}`}>รายละเอียด</Link>
        </Button>
      );
    },
  },
];
