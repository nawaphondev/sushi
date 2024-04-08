import CartRemoveButton from "@/components/CartRemoveButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import Icons from "@/components/Icons";
import { cn } from "@/lib/utils";
import useCart from "@/hooks/useCart";

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
      return <div className="flex flex-row items-center justify-center">
        <img src={`http://localhost:3001/images/${row.original.product.productImg}`} className="size-16" alt="" />
        <p>{row.original.product.name} - {row.original.product.color}</p>
        
      </div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return `${row.original.product.price}`;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity");
      // return quantity
      
      return <NumberSelector quantity={quantity} id={row.original.product.id} className="w-10" />;
      // return <CartQuantity quantity={quantity} className="w-10" />;
    },
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => {
      const amount = parseFloat(
        row.original.product.price * row.original.quantity
      );
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "THB",
      }).format(amount);
      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id: productId } = row.original.product;

      return <CartRemoveButton productId={productId} />;
    },
  },
];

// eslint-disable-next-line react/prop-types
function NumberSelector({ quantity, className, id }) {
  const [value, setValue] = useState(quantity);
  const {setCart} = useCart()

  useEffect(() => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id == id) item.quantity = value
       
        return item
      })
      // return prev
    })
  }, [value])
  

  return (
    <div className="flex flex-row items-center justify-center p-2 border rounded-md select-none">
      <Icons.minus
        onClick={() =>
          setValue((prev) => {
            if (prev <= 1) return prev;
            else return prev - 1;
          })
        }
        className="w-8 h-8"
      />
      <input
        type="number"
        value={value}
        onChange={(e) => {
          if (e.target.value <= 1) return;
          setValue(e.target.value);
        }}
        className={cn(className, "text-center select-none")}
      />
      <Icons.plus
        onClick={() => setValue((prev) => prev + 1)}
        className="w-8 h-8"
      />
    </div>
  );
}
