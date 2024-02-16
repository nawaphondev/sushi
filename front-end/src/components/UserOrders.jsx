import { OrderHistoryTable } from './orderHistory/OrderHistoryTable'
import { OrderHistoryColumns } from './orderHistory/OrderHistoryColumns'
import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'

export default function UserOrders() {
  const { user } = useAuth()
  const { data: products, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/api/orders/user/${user.id}`)
      const data = await response.json()
      console.log(data)
      return data
    },
  })

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className='flex flex-col flex-1'>
      <h1>Orders</h1>
      
      <OrderHistoryTable columns={OrderHistoryColumns} data={products}/>

    </div>
  )
}
