import {Outlet} from 'react-router-dom'

export default function AdminProductPage() {


  return (
    <div className='w-full'>
      <div className='flex items-center justify-between pb-2'>
        <h1 className="text-[#191C1F] font-extrabold text-2xl">Products</h1>
        <div>date time</div>
      </div>
      <Outlet />
    </div>
  )
}
