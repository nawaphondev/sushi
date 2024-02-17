import { Link } from "react-router-dom"

export const OrderHistoryColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      // const total = 0
      const total = row.original?.orderDetails?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
      const amount = parseFloat(total)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "THB",
      }).format(amount)
      return <div className="font-medium text-right">{formatted}</div>
    },
  },
  {
    id: "details",
    cell: ({ row }) => {
      const order = row.original

      return <Link to={`/order/${order.id}`}>รายละเอียด</Link>
      
    },
  },
  {
    id: "track",
    cell: ({ row }) => {
      const order = row.original

      return <Link to={`/order/${order.id}`}>ติดตามคำสั่งซื้อ</Link>
      
    },
  },
]
