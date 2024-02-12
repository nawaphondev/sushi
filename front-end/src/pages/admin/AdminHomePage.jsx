import AdminDashboard from '../../components/AdminDashboard'

export default function AdminHomePage() {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between pb-2'>
        <h1 className="text-[#191C1F] font-extrabold text-2xl">Dashboard</h1>
        <div>date time</div>
      </div>
      <AdminDashboard />
    </div>
  )
}
