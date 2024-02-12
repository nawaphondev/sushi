import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth'
import {Link} from 'react-router-dom'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:3001/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:3001/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)
      // navigateToHome()


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
      <div className="mb-5 text-3xl">เข้าสู่ระบบ</div>
      <form className="flex flex-col items-center justify-center gap-3" onSubmit={hdlSubmit}>
        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">ชื่อผู้ใช้</span>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder='ชื่อผู้ใช้'
            name="username"
            value={input.username}
            onChange={ hdlChange }
          />
        </label>

        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">รหัสผ่าน</span>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder='รหัสผ่าน'
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>

        <div className='font-bold text-primary'>ลืมรหัสผ่าน?</div>
        <div className="flex w-full gap-5">
          <button type="submit" className="w-full p-3 text-center rounded-lg bg-primary text-primary-foreground">เข้าสู่ระบบ</button>
        </div>
      </form>

      
        <div className='flex flex-row justify-center w-full gap-16'>
          <div>ยังไม่มีบัญชี ?</div>
          <Link className='font-bold text-primary' to="/register">ลงทะเบียนได้ที่นี่</Link>
        </div>
    </div>
  );
}