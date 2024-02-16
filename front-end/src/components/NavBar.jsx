import {Link, useNavigate} from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Logo from './Logo'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import Icons from './ui/Icons'
import useCart from '@/hooks/useCart'
import { Badge } from "@/components/ui/badge"
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function NavBar() {
  const navigate = useNavigate()
  const {user, logout} = useAuth()
  const { cart } = useCart()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='sticky top-0 flex flex-row px-32 py-4 bg-[#F5F5F7] justify-between items-center shadow-xl'>
      <Link to="/"><Logo /></Link>
      
      <div className='flex items-center gap-x-5'>
        <Link className='text-[#8B8E99] font-semibold' to='/home'>หน้าหลัก</Link>
        <Link className='text-[#8B8E99] font-semibold' to='/about'>ติดต่อเรา</Link>
      </div>
      { user
        ? <div className='flex flex-row items-center justify-center gap-x-6'>
            <Link className='text-[#8B8E99] font-semibold self-center' to='#' onClick={hdlLogout}>ออกจากระบบ</Link>
            <Sheet>
              <SheetTrigger>
                <div className='relative'>
                  { cart.length > 0 && <Badge className="absolute -right-1 -top-1 px-[0.4rem] py-[0.007rem] text-[0.8rem] font-extralight">{cart.length}</Badge>}
                  <Icons.cart className='w-8 h-8'/>
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>ตะกร้าสินค้า</SheetTitle>
                  {
                    cart?.length > 0 ? cart.map((item) => {
                      return (
                        <div className='flex flex-row items-center justify-between gap-4' key={item.product.id}>
                          <img src={`http://localhost:3001/images/${item.product.productImg}`} alt="" className='w-20 h-20' />
                          <div>{item.product.name}</div>
                          <div>{item.quantity}</div>
                        </div>
                      )
                      
                    }) : <div>Your cart is empty! Add some items to your cart.</div>
                  }
                </SheetHeader>
                <SheetFooter>
                  
                    <Button asChild onClick={() => navigate('/cart')}><SheetClose>ไปยังตะกร้า</SheetClose></Button>
                  
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger><Icons.user className='w-8 h-8'/></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                <Link to="/account">บัญชีของฉัน</Link></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>ออกจากระบบ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            
          </div>
        : (
          <div className='flex items-center gap-x-4'>
            <Link className='text-[#8B8E99] font-semibold' to='/login'>เข้าสู่ระบบ</Link>
            <span>|</span>
            <Link className='text-[#8B8E99] font-semibold' to='/register'>สมัครสมาชิก</Link>
          </div>
        )
      }
      
    </div>
  )
}
