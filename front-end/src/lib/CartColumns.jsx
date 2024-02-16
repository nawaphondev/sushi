import CartQuantity from "@/components/CartQuantity"
import CartRemoveButton from "@/components/CartRemoveButton"
import { Checkbox } from "@/components/ui/checkbox"

export const cartColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return `${row.original.product.name} ${row.original.product.price} - ${row.original.product.color}`
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return `${row.original.product.price}`
    }
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity")
      // return quantity
      return <CartQuantity quantity={quantity} className="w-10" />
    }
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => {
      const amount = parseFloat(row.original.product.price * row.original.quantity)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "THB",
      }).format(amount)
      return <div className="font-medium text-right">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const {id: productId} = row.original.product

      return <CartRemoveButton productId={productId} />
    },
  },
]
