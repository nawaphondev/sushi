import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ForgetPasswordForm() {
  const [input, setInput] = useState({
    username: "",
    secretQuestion: "",
    secretAnswer: "",
    newPassword: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    // console.log(input)
    e.preventDefault();
    try {
      const rs = await axios.post(
        "http://localhost:3001/api/users/forget",
        input
      );
      console.log(rs)
      if (rs.status === 200) {
        toast.success("กู้คืนรหัสผ่านสำเร็จ คุณสามารถใช้รหัสผ่านใหม่เพื่อเข้าสู่ระบบได้ต่อไป");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col w-2/5 p-8 border border-[#E4E7E9] rounded-2xl gap-4">
      <div className="flex items-center justify-center">
        <img src="/logo.png" alt="" />
        <h1 className="text-4xl font-medium text-[#8B8E99]">devphone</h1>
      </div>
      <div className="mb-5 text-3xl">เข้าสู่ระบบ</div>
      <form
        className="flex flex-col items-center justify-center gap-3"
        onSubmit={hdlSubmit}
      >
        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">ชื่อผู้ใช้</span>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder="ชื่อผู้ใช้"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>

        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">คำถามสำหรับการกู้คืนรหัสผ่าน</span>
          <input
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder="ระบุคำถามสำหรับการกู้คืนรหัสผ่าน"
            autoComplete="off"
            name="secretQuestion"
            value={input.secretQuestion}
            onChange={hdlChange}
          />
        </label>

        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">คำตอบสำหรับการกู้คืนรหัสผ่าน</span>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder="ระบุคำตอบสำหรับการกู้คืนรหัสผ่าน"
            autoComplete="off"
            name="secretAnswer"
            value={input.secretAnswer}
            onChange={hdlChange}
          />
        </label>

        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">ตั้งค่ารหัสผ่านใหม่</span>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder="รหัสผ่าน"
            autoComplete="off"
            name="newPassword"
            value={input.newPassword}
            onChange={hdlChange}
          />
        </label>

        <div className="flex w-full gap-5">
          <button
            type="submit"
            className="w-full p-3 text-center rounded-lg bg-primary text-primary-foreground"
          >
            ยืนยันการเปลี่ยนรหัสผ่าน
          </button>
        </div>
      </form>

      <div className="flex flex-row justify-center w-full gap-16">
        <Link className="font-bold text-primary" to="/login">
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
      </div>
    </div>
  );
}
