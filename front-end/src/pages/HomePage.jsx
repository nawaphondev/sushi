import { useQuery } from '@tanstack/react-query'

export default function HomePage() {
  const { data: products, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/products')
      const data = await response.json()
      return data
    },
  })

  return <h1>home page</h1>


  return (
    <div className='flex flex-row'>
      <div>filter</div>
      <div className='flex flex-col'>
        <div>
          {
            isLoading ? <div>Loading...</div> : (products.length > 0) ? products.map((product, index) => (
              <div key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                {/* <img src={} alt="" /> */}
              </div>
            )) : <div>No products found</div>
          }
        </div>
      </div>

    </div>
  )
}
