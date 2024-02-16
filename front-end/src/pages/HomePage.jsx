import { useMutation, useQuery } from '@tanstack/react-query'
import Icons from '../components/ui/Icons'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import useAuth from '@/hooks/useAuth'
import useCart from '@/hooks/useCart'

export default function HomePage() {
  const { user } = useAuth()
  const { cart, setCart } = useCart()

  const { data: products, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/products/all')
      const data = await response.json()
      return data
    },
  })

  const {mutate} = useMutation({
    mutationFn: async (data) => {
      return fetch(`http://localhost:3001/api/carts/add`, {
        method: "POST",
        body: JSON.stringify({...data, shoppingCartId: user.shoppingCart.id}),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(async(res) => await res.json())
    }
  })

  return (
    <div className='flex items-center justify-center flex-grow w-8/12 mx-auto'>
      <div className='flex flex-col gap-x-4 gap-y-12'>
        <Input type="text" className='rounded-md border border-[#E4E7E9] w-full'/>
        <div className='grid grid-cols-4 gap-8'>
          {
            isLoading ? <div>Loading...</div> : (products.length > 0) ? products.map((product) => (
              

              <Link to={`/product/${product.id}`} key={product.id}>
                <Card>
                  <CardHeader>
                    <img src={`http://localhost:3001/images/${product.productImg}`} alt="" className='object-scale-down aspect-square' />
                  </CardHeader>
                  <CardContent>
                  <div>{product.name} ({product.capacity}) - {product.color}</div>
                  <div className='pl-2 text-primary'>{product.price} บาท</div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Icons.cart className="z-10 w-10 h-10" onClick={(e)=> {
                      e.preventDefault()
                      e.stopPropagation()
                      mutate({ productId: product.id, quantity: 1 }, {
                        onSuccess: (data) => {
                          if (cart.find((item) => item.product.id === product.id)) {
                            setCart(prev => prev.map((item) => {
                              if (item.product.id === product.id) {item.quantity = data.quantity} return item
                            }))
                          } else {
                            setCart(prev => [...prev, {product: { id: product.id, name: product.name, price: product.price, productImg: product.productImg }, quantity: data.quantity}])
                          }
                          toast(`${product.name} ถูกเพิ่มไปยังตะกร้า`, {
                            action: {
                              label: 'เรียกกลับ',
                              onClick: () => console.log('เรียกกลับ')
                            }
                          })
                        }
                      })
                    }
                    }/>
                  </CardFooter>
                </Card>
                
                
                
              </Link>
            )) : <div>ไม่พบสินค้า</div>
          }
        </div>
      </div>
    </div>
  )
}
