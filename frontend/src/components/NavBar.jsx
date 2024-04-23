import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import logo from "../assets/logo.png";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { setCart } = useCart();
  const navigate = useNavigate();

  if (!user) return null;

  function hdlLogout() {
    try {
      setCart([]);
      logout();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex items-center justify-between p-4 navbar bg-base-100">
      <Link to="/" className="h-20 navbar-start">
        <img src={logo} />
      </Link>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <Link to={"/"}>เมนู</Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to={"/bills"}>บิล</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex">
          <div>{user.username}</div>
          <div className="divider divider-horizontal"></div>
          <div onClick={hdlLogout} className="uppercase cursor-pointer">
            ออกจากระบบ
          </div>
        </div>
      </div>
    </div>
  );
}
