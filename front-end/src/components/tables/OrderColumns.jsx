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
    header: "Status",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      return thaiDateFormat(row.getValue("orderDate"));
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      // const total = 0
      const total = row.original?.orderDetails?.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
      const amount = parseFloat(total);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "THB",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const orderId = row.original.id;

      return (
        <Button asChild>
          <Link to={`/orders/${orderId}`} state={row.original}>
            Details
          </Link>
        </Button>
      );
    },
  },
];
