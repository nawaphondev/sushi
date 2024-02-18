import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import Icons from "@/components/Icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { thaiDateFormat } from "@/lib/utils";
import axios from "axios";

export default function OrderDetails() {
  const { id } = useParams();
  const {
    data: order,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3001/api/orders/${id}`)
        .then((res) => res.data);
    },
  });

  if (isError) return <div>พบข้อผิดพลาด</div>;
  if (isLoading) return <div>กำลังโหลด...</div>;

  return (
    <div className="flex items-center justify-center flex-grow w-8/12 mx-auto">
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle>รายละเอียดการสั่งซื้อ</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-6 border-y">
          <div className="flex flex-row justify-between p-6 border bg-accent">
            <div className="flex flex-col">
              <div>#{order.id}</div>
              <div>{thaiDateFormat(order.orderDate)}</div>
            </div>
            <h1>
              {order.orderDetails &&
                order.orderDetails?.reduce(
                  (acc, cur) => acc + cur.price * cur.quantity,
                  0
                )}
            </h1>
          </div>
          <div>
            คำสั่งซื้อคาดว่าจะถึงวันที่ {thaiDateFormat(order.orderDate)}
          </div>
          <div className="py-4 space-y-6 px-44">
            <Progress value={25} />
            <div className="flex flex-row items-center justify-between">
              <Icons.book className="w-12 h-12" />
              <Icons.package className="w-12 h-12" />
              <Icons.truck className="w-12 h-12" />
              <Icons.handshake className="w-12 h-12" />
            </div>
          </div>
          <div>
            สินค้า{" "}
            {order.orderDetails &&
              order.orderDetails.reduce((acc, item) => acc + item.quantity, 0)}
          </div>
          <Table>
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead>สินค้า</TableHead>
                <TableHead>ราคา</TableHead>
                <TableHead className="w-[100px]">จำนวน</TableHead>
                <TableHead className="text-right">ยอดรวมสุทธิ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderDetails?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="flex flex-row items-center font-medium gap-x-6">
                    <img
                      src={`http://localhost:3001/images/${item.product.productImg}`}
                      className="w-[100px]"
                    />
                    {item.product.name} {item.product.capacity}{" "}
                    {item.product.color}
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {item.quantity * item.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
