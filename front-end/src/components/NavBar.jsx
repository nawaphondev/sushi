import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Logo from './Logo'

export default function NavBar() {
  const navigate = useNavigate()
  const {user, logout} = useAuth()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='absolute w-screen top-0 flex flex-row px-32 py-4 bg-[#F5F5F7] justify-between shadow-xl'>
      <Link to="/"><Logo /></Link>
      
      <div className='flex items-center gap-x-5'>
        <Link className='text-[#8B8E99] font-semibold' to='/home'>หน้าหลัก</Link>
        <Link className='text-[#8B8E99] font-semibold' to='/about'>ติดต่อเรา</Link>
      </div>
      { user? <Link className='text-[#8B8E99] font-semibold self-center' to='#' onClick={hdlLogout}>ออกจากระบบ</Link>  : (
        <div className='flex items-center gap-x-4'>
          <Link className='text-[#8B8E99] font-semibold' to='/login'>เข้าสู่ระบบ</Link>
          <span>|</span>
          <Link className='text-[#8B8E99] font-semibold' to='/register'>สมัครสมาชิก</Link>
        </div>
      ) }
      
    </div>
  )
}
