import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { thaiDateFormat } from "../../lib/utils";

const classNames = {
  AVAILABLE: `flex items-center justify-center text-center border-2 cursor-pointer border-accent bg-slate-300 text-accent text-9xl bg-center bg-no-repeat bg-contain bg-[url('assets/table.svg')]`,
  OCCUPIED: `flex items-center justify-center text-center border-2 cursor-pointer border-accent bg-accent text-white text-9xl bg-center bg-no-repeat bg-contain bg-[url('assets/table.svg')]`,
  RESERVED: `flex items-center justify-center text-center border-2 cursor-pointer border-accent bg-white text-accent text-9xl bg-center bg-no-repeat bg-contain bg-[url('assets/table.svg')]`,
};

const tableFormSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(8),
    seats: z.number().min(1),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านไม่ตรงกัน",
  });

export default function AdminHomePage() {
  const [selected, setSelected] = useState(null);
  const [add, setAdd] = useState(false);
  const [table, setTable] = useState(null);
  const quertClient = useQueryClient();
  const { data: tables, isLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: async () =>
      axios
        .get("http://localhost:3001/api/accounts/tables")
        .then((res) => res.data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(tableFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      seats: 1,
    },
  });

  async function tableFormOnSubmit(values) {
    const res = await axios.post("http://localhost:3001/auth/register", values);
    if (res.status === 200) {
      reset();
      quertClient.invalidateQueries(["tables"]);
    }
  }

  useEffect(() => {
    if (!selected || tables.length === 0) return;
    setTable(tables.find((table) => table.id === selected));
  }, [selected, tables]);

  // console.log(tables)

  return (
    <div className="flex justify-between flex-1 gap-x-2">
      <div className="flex flex-col items-center justify-start flex-1 p-4">
        <h1 className="text-3xl font-bold uppercase">โต๊ะ</h1>
        <div className="flex justify-between w-1/3">
          <div>
            <div className="border-2 size-10 border-accent bg-slate-300"></div>
            <span>โต๊ะว่าง</span>
          </div>
          <div>
            <div className="bg-orange-300 border-2 size-10 border-accent"></div>
            <span>มีคนนั่ง</span>
          </div>
          <div>
            <div className="border-2 size-10 border-accent"></div>
            <span>จองโต๊ะ</span>
          </div>
        </div>
        <div className="grid w-full h-full grid-cols-3 gap-6">
          {isLoading ? (
            <div>กำลังโหลด...</div>
          ) : (
            tables.map((table) => {
              const className = classNames[table.status];
              return (
                <div
                  key={table.id}
                  className={className}
                  onClick={() => {
                    setAdd(false);
                    setSelected(table.id);
                  }}
                >
                  {table.username}
                </div>
              );
            })
          )}
          <div
            className="flex items-center justify-center text-center bg-white border-2 cursor-pointer border-accent text-accent text-5xl"
            onClick={() => {
              setAdd(true);
              setSelected(null);
            }}
          >
            เพิ่มโต๊ะ
          </div>
        </div>
      </div>
      <div className="p-4 w-[500px] sticky top-0 bg-slate-200">
        {add && (
          <form
            onSubmit={handleSubmit(tableFormOnSubmit)}
            autoComplete="off"
            className="card shadow-xl w-[500px]"
          >
            <div className="gap-y-0 card-body">
              <h1 className="card-title">เพิ่มโต๊ะ</h1>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Username (ประจำโต๊ะ)</span>
                </div>
                <input
                  type="text"
                  name="username"
                  {...register("username")}
                  className="w-full input input-bordered"
                />
                <div className="label">
                  {errors.username && (
                    <span className="text-red-600 label-text-alt">
                      {errors.username.message}
                    </span>
                  )}
                </div>
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">จำนวนที่นั่ง</span>
                </div>
                <input
                  type="number"
                  name="seats"
                  {...register("seats", {
                    valueAsNumber: true,
                  })}
                  className="w-full input input-bordered"
                />
                <div className="label">
                  {errors.seats && (
                    <span className="text-red-600 label-text-alt">
                      {errors.seats.message}
                    </span>
                  )}
                </div>
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Password (ประจำโต๊ะ)</span>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="password"
                  autoSave="off"
                  {...register("password")}
                  className="w-full input input-bordered"
                />
                <div className="label">
                  {errors.password && (
                    <span className="text-red-600 label-text-alt">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </label>

              <label className="w-fullform-control">
                <div className="label">
                  <span className="label-text">ยืนยันรหัสผ่าน</span>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  autoSave="off"
                  {...register("confirmPassword")}
                  className="w-full input input-bordered "
                />
                <div className="label">
                  {errors.confirmPassword && (
                    <span className="text-red-600 label-text-alt">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </label>

              <div className="items-center justify-center card-actions gap-y-6">
                <button type="submit" className="w-full btn btn-primary">
                  บันทึกการเปลี่ยนแปลง
                </button>
              </div>
            </div>
          </form>
        )}
        {table && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-x-4">
              <span>{table.username}</span>
              <select
                className="w-full select select-bordered"
                value={table.status}
                onChange={async (e) => {
                  console.log(e.currentTarget.value);
                  const res = await axios.put(
                    "http://localhost:3001/api/accounts/update",
                    {
                      id: table.id,
                      status: e.currentTarget.value,
                    }
                  );
                  console.log(res);
                  if (res.status === 200) {
                    quertClient.invalidateQueries(["tables"]);
                  }
                }}
              >
                <option value={"AVAILABLE"}>โต๊ะว่าง</option>
                <option value={"OCCUPIED"}>มีคนนั่ง</option>
              </select>
            </div>

            <details className="collapse bg-base-200">
              <summary className="text-xl font-medium collapse-title">
                การจองโต๊ะ
              </summary>
              <div className="collapse-content">
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>วันที่จอง</th>
                        <th>ชื่อ</th>
                        <th>ลูกค้าที่นั่ง</th>
                        <th>หมายเลขโทรศัพท์</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {table.reservations.map((reservation, i) => (
                        <tr key={reservation.id}>
                          <th>{i + 1}</th>
                          <td>{thaiDateFormat(reservation.date)}</td>
                          <td>{reservation.name}</td>
                          <td>{reservation.pax}</td>
                          <td>{reservation.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </details>
            {table.currentOrder && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <h1 className="text-center">
                    {thaiDateFormat(
                      table.orders.find(
                        (order) => order.id === table.currentOrder
                      ).orderDate
                    )}
                  </h1>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>ชื่อ</th>
                        <th>ราคา</th>
                        <th>จำนวน</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.orders
                        .find((order) => order.id === table.currentOrder)
                        .items.map((item, i) => (
                          <tr key={item.product.name}>
                            <th>{i + 1}</th>
                            <td>{item.product.name}</td>
                            <td>{item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.price * item.quantity}</td>
                          </tr>
                        ))}

                      <tr>
                        <th>ยอดรวม</th>
                        <td colSpan={3}></td>
                        <td>
                          {table.orders
                            .find((order) => order.id === table.currentOrder)
                            .items.reduce(
                              (total, item) =>
                                total + item.product.price * item.quantity,
                              0
                            )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
