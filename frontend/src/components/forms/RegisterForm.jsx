/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const passwordFormSchema = z
  .object({
    username: z.string().min(1),
    // firstName: z.string().min(1),
    // lastName: z.string().min(1),
    // email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    // phoneNumber: z.string().min(10).max(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "รหัสผ่านไม่ตรงกัน",
  });

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      username: "",
      // firstName: "",
      // lastName: "",
      // email: "",
      password: "",
      confirmPassword: "",
      // phoneNumber: "",
    },
  });

  async function passwordFormOnSubmit(values) {
    const rs = await axios.post("http://localhost:3001/auth/register", values);
    console.log(rs);
    navigate("/");
  }

  return (
    <form
      onSubmit={handleSubmit(passwordFormOnSubmit)}
      autoComplete="off"
      className="card shadow-xl w-[500px]"
    >
      <div className="grid grid-cols-2 gap-y-0 card-body">
        <h1 className="col-span-2 card-title">ลงทะเบียน</h1>

        {/* <label className="w-full form-control">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            type="text"
            name="firstName"
            {...register("firstName")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.firstName && (
              <span className="text-red-600 label-text-alt">
                {errors.firstName.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Last Name</span>
          </div>
          <input
            type="text"
            name="lastName"
            {...register("lastName")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.lastName && (
              <span className="text-red-600 label-text-alt">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full col-span-2 form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="text"
            name="email"
            {...register("email")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.email && (
              <span className="text-red-600 label-text-alt">
                {errors.email.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input
            type="text"
            name="phoneNumber"
            {...register("phoneNumber")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.phoneNumber && (
              <span className="text-red-600 label-text-alt">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </label> */}

        <label className="w-full col-span-2 form-control">
          <div className="label">
            <span className="label-text">Username</span>
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
            <span className="label-text">Password</span>
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
            <span className="label-text">Confirm Password</span>
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

        <div className="items-center justify-center col-span-2 card-actions gap-y-6">
          <button type="submit" className="w-full btn btn-primary">
            ยืนยันการลงทะเบียน
          </button>

          <div>
            มีบัญชีอยู่แล้ว?{" "}
            <Link className="font-bold text-primary" to="/">
              เข้าสู่ระบบได้ที่นี่
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
