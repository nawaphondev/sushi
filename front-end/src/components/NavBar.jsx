import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function NavBar() {
  const navigate = useNavigate()
  const {user, logout} = useAuth()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='sticky top-0 flex flex-row px-32 py-4 bg-[#F5F5F7] justify-between'>
      <div className='flex items-center justify-center'>
        <img src="/logo.png" alt="" />
        <h1 className='text-lg font-bold text-[#8B8E99]'>devphone</h1>
      </div>
      <div className='flex gap-x-4'>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About</Link>
      </div>
      { user? <Link to='#' onClick={hdlLogout}>Logout</Link>  : (
        <div className='flex gap-x-4'>
          <Link to='/login'>login</Link>
          <Link to='/register'>register</Link>
        </div>
      ) }
      
    </div>
  )
}
