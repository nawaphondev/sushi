import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

export const columns = [
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="flex items-center">
        <img className="max-h-16" src={`http://localhost:3001/images/${row.original.productImg}`} alt="" />
        {row.original.name}
      </div> 
    }
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
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
      const productId = row.original.id
      const queryClient = useQueryClient() // can't invalidate because I can't use a hook in here

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link 
              to={`/products/${productId}`}
              state={row.original}
            >
              <DropdownMenuItem>
              Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => axios.delete(
                "http://localhost:3001/api/products/delete",
                {data: {id: productId}}
              ).then(res => {
                if (res.status === 200) {
                  toast("deleted")
                  queryClient.invalidateQueries("products")
                }
              })}
            >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
