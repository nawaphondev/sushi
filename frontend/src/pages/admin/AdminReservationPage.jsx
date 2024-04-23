import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const loginFormSchema = z.object({
  name: z.string().min(1),
  date: z.date(),
  phone: z.string().min(10).max(10),
  pax: z.number().min(1),
  tableId: z.number(),
});

export default function AdminReservationPage() {
  const [tables, setTables] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: new Date().toString(),
      pax: 1,
    },
  });

  useEffect(() => {
    async function getTables() {
      const t = await axios
        .get("http://localhost:3001/api/accounts/tables")
        .then((res) => res.data);
      setTables(t);
    }
    getTables();
  }, []);

  async function loginFormOnSubmit(values) {
    // console.log(input)
    try {
      // console.log(values);
      const res = await axios.post("http://localhost:3001/api/reservations/new", values);
      console.log(res)
      if (res.status === 200) {
        reset()
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="flex items-center justify-center flex-1">
      <form
        className="p-2 shadow-xl card w-[500px]"
        onSubmit={handleSubmit(loginFormOnSubmit)}
      >
        <div className="w-full card-body gap-y-4">
          <h1 className="card-title">การจองโต๊ะ</h1>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">ชื่อผู้จอง</span>
            </div>
            <input
              type="text"
              name="name"
              {...register("name")}
              className="w-full input input-bordered"
            />
            <div className="label">
              {errors.name && (
                <span className="text-red-600 label-text-alt">
                  {errors.name.message}
                </span>
              )}
            </div>
          </label>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">หมายเลขโทรศัพท์</span>
            </div>
            <input
              type="number"
              name="phone"
              {...register("phone")}
              className="w-full input input-bordered"
            />
            <div className="label">
              {errors.phone && (
                <span className="text-red-600 label-text-alt">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </label>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">วันที่จอง</span>
            </div>
            <input
              type="datetime-local"
              name="date"
              {...register("date", {
                valueAsDate: true,
              })}
              className="w-full input input-bordered"
            />
            <div className="label">
              {errors.date && (
                <span className="text-red-600 label-text-alt">
                  {errors.date.message}
                </span>
              )}
            </div>
          </label>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">จำนวนลูกค้าที่นั่ง</span>
            </div>
            <input
              type="number"
              name="pax"
              {...register("pax", {
                valueAsNumber: true,
              })}
              className="w-full input input-bordered"
            />
            <div className="label">
              {errors.pax && (
                <span className="text-red-600 label-text-alt">
                  {errors.pax.message}
                </span>
              )}
            </div>
          </label>

          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="label-text">โต๊ะ</span>
            </div>
            <select
              name="tableId"
              {...register("tableId", {
                valueAsNumber: true,
              })}
              className="select select-bordered"
            >
              {tables.length > 0 &&
                tables
                  .filter((t) => t.seats >= watch("pax"))
                  .map((table) => (
                    <option key={table.id} value={table.id}>
                      {table.username}
                    </option>
                  ))}
            </select>
            <div className="label">
              {errors.tableId && (
                <span className="text-red-600 label-text-alt">
                  {errors.tableId.message}
                </span>
              )}
            </div>
          </label>

          <div className="items-center justify-center w-full card-actions">
            <button type="submit" className="btn btn-primary">
              ยันยันการจองโต๊ะ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
