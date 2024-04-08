import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { thaiDateFormat } from "@/lib/utils";

export const OrderColumns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
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
      return <div className="font-medium">{formatted} บาท</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const orderId = row.original.id;

      return (
        <Button asChild>
          <Link to={`/orders/${orderId}`} state={row.original}>
            รายละเอียด
          </Link>
        </Button>
      );
    },
  },
];
