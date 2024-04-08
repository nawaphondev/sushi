import RegisterForm from "../components/forms/RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex flex-row items-center flex-grow w-8/12 mx-auto justify-evenly">
      <img src="/login.png" className="object-contain w-auto" />
      <div className="flex flex-col w-full px-8 py-4 border border-[#E4E7E9] rounded-2xl gap-x-4">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="" />
          <h1 className="text-3xl font-medium text-[#8B8E99]">devphone</h1>
        </div>
        <div className="mb-5 text-3xl">ลงทะเบียน</div>
        <RegisterForm />

        <div className="flex flex-row justify-around w-full pt-6">
          <div>มีบัญชีอยู่แล้ว?</div>
          <Link className="font-bold text-primary" to="/login">
            เข้าสู่ระบบได้ที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}
