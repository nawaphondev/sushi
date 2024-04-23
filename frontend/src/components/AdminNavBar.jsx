import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

export default function AdminNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  function hdlLogout() {
    try {
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
            <Link to={"/"}>โต๊ะ</Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to={"/menu"}>เมนู</Link>
          </li>
          <div className="divider divider-horizontal"></div>
          <li>
            <Link to={"/reservations"}>การจองโต๊ะ</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <span className="cursor-pointer" onClick={hdlLogout}>
          ออกจากระบบ
        </span>
      </div>
    </div>
  );
}
