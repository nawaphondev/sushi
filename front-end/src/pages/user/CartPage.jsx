import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useCart from "@/hooks/useCart";
import { cartColumns as columns } from "@/lib/CartColumns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart: data } = useCart();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [total, setTotal] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    const selected = table.getSelectedRowModel().flatRows;
    const productTotal = selected.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.original.product.price * currentValue.original.quantity,
      0
    );
    setTotal(productTotal);
  }, [rowSelection, data]);

  return (
    <div className="flex items-center justify-center flex-grow w-8/12 mx-auto">
      <div className="flex flex-row w-full gap-x-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>ตะกร้าสินค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            <div className="flex flex-row items-center">
                              {cell.id.includes("name") && (
                                <img
                                  className="max-h-16"
                                  src={`http://localhost:3001/images/${row.original.productImg}`}
                                  alt=""
                                />
                              )}
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        ไม่พบผลลัพท์
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex-1 w-full text-sm text-muted-foreground flex-nowrap text-nowrap">
              {table.getFilteredSelectedRowModel().rows.length} จาก{" "}
              {table.getFilteredRowModel().rows.length} รายการที่เลือก
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col w-1/3">
          <CardHeader>
            <CardTitle>สรุปการสั่งซื้อ</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2">
            <div className="font-normal">ยอดรวม</div>
            <div className="font-medium place-self-end">{total} บาท</div>
            <div className="font-normal">ค่าจัดส่ง</div>
            <div className="font-medium place-self-end">ฟรี</div>
          </CardContent>
          <CardFooter className="flex-col flex-1 mt-auto gap-y-4">
            <Separator />
            <div className="flex flex-row justify-between w-full">
              <div className="font-medium">ยอดรวมสุทธิ</div>
              <div className="font-semibold place-self-end">{total} บาท</div>
            </div>
            <Button
              className="w-full"
              asChild
              variant={table.getSelectedRowModel().flatRows.length > 0 ? "default" : "disabled"}
            >
              <Link
                to={table.getSelectedRowModel().flatRows.length > 0 && "/checkout"}
                // to={{ pathname: "/checkout" }}
                state={{
                  items: table
                    .getSelectedRowModel()
                    .flatRows.map((row) => row.original),
                  total,
                }}
              >
                ดำเนินการสั่งซื้อ
              </Link>
            </Button>
                
            
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
