import { NavLink, useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import thaiAddress from "@/lib/thaiAddress";
import Icons from "@/components/Icons";
import { calculateTax, thaiDateFormat } from "@/lib/utils";

function calculateItemsTotal(orderDetails) {
  return orderDetails.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
}

export default function AdminOrderDetails() {
  const { state: order } = useLocation();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start justify-between">
        <div>
          <NavLink to="/">Dashboard</NavLink>
          {" > "}
          <NavLink to="/orders">Order List</NavLink>
          {" > "}
          <span className="text-primary">Order Detail</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-4 p-4 bg-white rounded-md">
          <div>
            เลขที่คำสั่งซื้อ <span>#{order.id}</span>
          </div>

          <div className="grid grid-cols-2 place-content-between">
            <div className="flex items-center gap-x-1">
              <Icons.calendar />
              <div> วันที่สั่งซื้อ</div>
            </div>
            <div className="place-self-end">
              {thaiDateFormat(order.orderDate)}
            </div>
            <div className="flex items-center gap-x-1">
              <Icons.creditcard />
              <div>วิธีการชำระ</div>
            </div>
            <div className="place-self-end">{order.payment.method}</div>
          </div>
        </div>
        <div className="flex flex-col col-span-2 gap-4 p-4 bg-white rounded-md">
          <h1>ข้อมูลผู้สั่งซื้อ</h1>
          <div className="grid grid-cols-2 place-content-between">
            <div className="flex items-center gap-x-1">
              <Icons.user />
              <div> ชื่อ-นามสกุล</div>
            </div>
            <div className="place-self-end">
              {order.user.firstName} {order.user.lastName}
            </div>
            <div className="flex items-center gap-x-1">
              <Icons.mail />
              <div> อีเมล</div>
            </div>
            <div className="place-self-end">{order.user.email}</div>
            <div className="flex items-center gap-x-1">
              <Icons.phone />
              <div>เบอร์โทร</div>
            </div>
            <div className="place-self-end">{order.user.phoneNumber}</div>
          </div>
        </div>
        <div className="flex flex-col col-span-2 gap-4 p-4 bg-white rounded-md">
          <h1>รายละเอียดคำสั่งซื้อ</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead className="w-[100px]">Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.orderDetails.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className="font-medium">
                      {item.product.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.product.color}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.product.capacity}
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {item.price * item.quantity}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}></TableCell>
                <TableCell colSpan={1}>ยอดรวม</TableCell>
                <TableCell className="text-right">
                  {calculateItemsTotal(order.orderDetails)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}></TableCell>
                <TableCell colSpan={1}>ภาษี</TableCell>
                <TableCell className="text-right">
                  {calculateTax(calculateItemsTotal(order.orderDetails), 7)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}></TableCell>
                <TableCell colSpan={1}>ค่าจัดส่ง</TableCell>
                <TableCell className="text-right">
                  {order.deliveryFee}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}></TableCell>
                <TableCell colSpan={1}>ยอดรวมสุทธิ</TableCell>
                <TableCell className="text-right">
                  {(calculateItemsTotal(order.orderDetails) +
                    order.deliveryFee) *
                    1.07}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-white rounded-md">
          <h1>ที่อยู่ในการจัดส่ง</h1>
          <div className="flex items-center gap-x-1">
            <Icons.mapPin />
            <div className="flex flex-col gap-y-1">
              <div>ที่อยู่</div>
              {thaiAddress(order.shippingAddress)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
