import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { thaiDateFormat } from "../../lib/utils";

export default function UserOrders() {
  const { user } = useAuth();
  const {
    data: order,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3001/api/orders/table/${user.id}`)
        .then((res) => res.data);
    },
  });

  if (isError) return <div>เกิดข้อผิดพลาด</div>;
  if (isLoading) return <div>กำลังโหลด...</div>;

  return (
    <div className="flex items-center justify-center flex-1 mx-auto">
      <div className="flex flex-col">
        <h1 className="text-center">{order.account.username} บิล {thaiDateFormat(order.orderDate)}</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>ชื่อเมนู</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={item.productId}>
                  <th>{i + 1}</th>
                  <td>{item.product.name}</td>
                  <td>{item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.price * item.quantity}</td>
                </tr>
              ))}

              <tr>
                <th>ยอดรวม</th>
                <td colSpan={4} className="text-right">
                  {order.items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
