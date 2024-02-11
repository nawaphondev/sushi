import axios from 'axios'
import {useState} from "react";
import useAuth from '../hooks/useAuth'
import {Link, useNavigate} from 'react-router-dom'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })
  const navigateToHome = useNavigate("/home")

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
      <div className="mb-5 text-3xl">Login</div>
      <form className="flex flex-col items-center justify-center gap-3" onSubmit={hdlSubmit}>
        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">Username</span>
          <input
            type="text"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder='Username'
            name="username"
            value={input.username}
            onChange={ hdlChange }
          />
        </label>

        <label className="w-full form-control">
          <span className="text-[#8B8E99] text-sm">Password</span>
          <input
            type="password"
            className="w-full p-2 rounded-md bg-background border border-[#E4E7E9]"
            placeholder='Password'
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>

        <div className='font-bold text-primary'>Forgot password?</div>
        <div className="flex w-full gap-5">
          <button type="submit" className="w-full p-3 text-center rounded-lg bg-primary text-primary-foreground">Login</button>
        </div>
      </form>

      
        <div className='flex flex-row justify-center w-full gap-16'>
          <div>Dont have an account?</div>
          <Link className='font-bold text-primary' to="/register">register</Link>
        </div>
    </div>
  );
}