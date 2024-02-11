import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/login', text: 'Login' },
  { to : '/register', text: 'Register' },
]

const userNav = [
  { to : '/home', text: 'Home' },
]

export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl btn btn-ghost">Hello, {user?.id ? user.username : 'Guest'}</a>
      </div>
      <div className="flex-none">
        <ul className="px-1 menu menu-horizontal">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          ) }
        </ul>
      </div>
    </div>
  );
}
