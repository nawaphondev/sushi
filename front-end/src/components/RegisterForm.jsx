import axios from 'axios'
import {useState} from "react";
import {Link} from 'react-router-dom'

export default function RegisterForm() {
  const [input, setInput] = useState({
    username : '', 
    password : '',
    confirmPassword : '',
    email : '',
    phoneNumber: ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if(input.password !== input.confirmPassword) {
        return alert('กรุณาตรวจสอบการยืนยันรหัสผ่าน')
      }
      const rs = await axios.post('http://localhost:3001/auth/register', {...input, phoneNumber: "0828373964"})
      console.log(rs)
      if(rs.status === 200) {
        alert('ลงทะเบียนสำเร็จ')
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  return (
    <div className="flex flex-col w-2/5 p-8 border border-[#E4E7E9] rounded-2xl gap-4">
      <div className='flex items-center justify-center'>
        <img src="/logo.png" alt="" />
        <h1 className='text-4xl font-medium text-[#8B8E99]'>devphone</h1>
      </div>
      <div className="mb-5 text-3xl">ลงทะเบียน</div>
      <form className="flex flex-col items-center justify-center gap-3" onSubmit={hdlSubmit}>
        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">ชื่อผู้ใช้</span>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            name="username"
            placeholder='กรุณาระบุชื่อผู้ใช้'
            value={input.username}
            onChange={ hdlChange }
          />
        </label>
        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">อีเมล</span>
          <input
            type="email"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder='กรุณาระบุอีเมล'
            name="email"
            value={input.email}
            onChange={ hdlChange }
          />
        </label>
        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">รหัสผ่าน</span>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder='กรุณาระบุรหัสผ่าน'
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>
        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">ยืนยันรหัสผ่าน</span>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder='กรุณาระบุรหัสผ่านอีกครั้ง'
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={ hdlChange }
          />
        </label>
        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">หมายเลขโทรศัพท์</span>
          <input
            type="tel"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder='กรุณาระบุหมายเลขโทรศัพท์'
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={ hdlChange }
          />
        </label>
        <div className="flex w-full gap-5 ">
          <button type="submit" className="w-full p-3 text-center rounded-lg bg-primary text-primary-foreground">ยืนยันการลงทะเบียน</button>
        </div>
      </form>
      <div className='flex flex-row justify-center w-full gap-16'>
        <div>มีบัญชีอยู่แล้ว?</div>
        <Link className='font-bold text-primary' to="/login">เข้าสู่ระบบได้ที่นี่</Link>
      </div>
    </div>
  );
}
