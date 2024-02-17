/* eslint-disable react/prop-types */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority"
import Logo from "@/components/Logo";
import useAuth from "@/hooks/useAuth";
import Icons from "@/components/ui/Icons";

export default function AdminSideNav() {
  const navigate = useNavigate()
  const {logout} = useAuth()

  function hdlLogout() {
    try {
      logout()
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }
  const {pathname} = useLocation()
  
  return (
    <nav className='sticky left-0 flex flex-col w-3/12 h-full px-4 gap-y-6'>
      <Logo />
      <div className="flex flex-col">
        <h2 className='uppercase text-[#3858D6] opacity-50 text-xs'>menu</h2>
        <NavButton title="Dashboard" path="/" activePath={pathname}><Icons.dashboard/></NavButton>
        <NavButton title="Products" path="/products" activePath={pathname}><Icons.product /></NavButton>
        <NavButton title="Orders" path="/orders" activePath={pathname}><Icons.stack /></NavButton>
        <NavButton title="Transactions" path="/transactions" activePath={pathname}><Icons.wallet /></NavButton>
      </div>
      
      <div className="flex flex-col">
        <h2 className='uppercase text-[#3858D6] opacity-50 text-xs'>user management</h2>
        <NavButton title="Admin" path="/admin" activePath={pathname}><Icons.users /></NavButton>
        <NavButton title="Customer" path="/customer" activePath={pathname}><Icons.user /></NavButton>
      </div>
      
      <div>
        <h2 className='uppercase text-[#3858D6] opacity-50 text-xs'>others</h2>
        <NavButton title="Settings" path="/settings" activePath={pathname}><Icons.settings /></NavButton>
        <Link className='p-2 rounded-md w-full text-[#8B8E99] hover:bg-[#3858D6] flex gap-x-2' to="#" onClick={hdlLogout}>
          <Icons.logout /> Logout
        </Link>
      </div>
    </nav>
  )
}

function NavButton(props) {
  const {title, path, activePath, className, children} = props
  const variant = path === activePath ? "active" : "default"
  const buttonVariants = cva(
    "p-2 rounded-md flex gap-x-2",
    {
      variants: {
        variant: {
          default:
            "text-[#8B8E99] hover:bg-[#3858D6]",
          active:
          "bg-[#8B8E99] bg-opacity-10 text-[#3858D6]",
        }
      },
      defaultVariants: {
        variant: "default",
      },
    }
  )

  return <NavLink to={path} state={{from: activePath}} className={cn(buttonVariants({variant, className}))}>
    {children}{title} 
  </NavLink>
}