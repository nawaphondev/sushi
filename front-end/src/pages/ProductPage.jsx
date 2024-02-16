import { useQuery, useMutation } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import Icons from '../components/ui/Icons'
import { toast } from "sonner"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useEffect, useRef, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import useCart from '@/hooks/useCart'
import NumberSelector from '@/components/NumberSelector'

export default function ProductPage() {
  const { id } = useParams()
  const { user} = useAuth()
  const { cart, setCart } = useCart()
  const quantityRef = useRef(null)
  const [quantity, setQuantity] = useState(1)

  const { data: product, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/api/products/get/${id}`)
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

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading</div>
  
  return (
    <div className='flex items-center justify-center flex-grow w-8/12 mx-auto'>
      <div className='flex flex-col gap-y-6'>
        <div className='grid grid-cols-2 gap-x-16'>
          <img src={`http://localhost:3001/images/${product.productImg}`} alt={product.name} className='py-16 px-28 border border-[#E4E7E9]' />
          <div className='flex flex-col w-full gap-y-6'>
            <h1 className='text-xl'>{product.name} {product.capacity} {product.color}</h1>
            <div className='grid grid-cols-2'>
              <div className='text-[#5F6C72]'>ID: <span className='text-[#191C1F] font-medium'>{product.id}</span></div>

              <div className='text-[#5F6C72]'>STOCK: <span className='text-[#25B800] font-medium'>{product.stock}</span></div>
              <div className='text-[#5F6C72]'>PRODUCT: <span className='text-[#191C1F] font-medium'>{product.name}</span></div>

            </div>
            <Separator />
            <div className='flex flex-col'>
              <Label>สี</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสี" />
                </SelectTrigger>
                <SelectContent>

                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="White">White</SelectItem>

                </SelectContent>
              </Select>
              <Label>ความจุ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกความจุ" />
                </SelectTrigger>
                <SelectContent>

                  <SelectItem value="64 GB">64 GB Storage</SelectItem>
                  <SelectItem value="128 GB">128 GB Storage</SelectItem>

                </SelectContent>
              </Select>
            </div>
          </div>
          <Carousel>
            <CarouselContent>
              <CarouselItem>...</CarouselItem>
              <CarouselItem>...</CarouselItem>
              <CarouselItem>...</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className='flex flex-col gap-y-2'>
            <div className='flex flex-row gap-2'>
              <NumberSelector className="w-1/5 text-center" ref={quantityRef} quantity={1} onChange={(e) => console.log("onChange", e)} getValue={setQuantity} />
              <Button variant={"outline"} className="w-full border-primary text-primary" onClick={() => {
                mutate({
                  productId: product.id,
                  quantity
                },
                {
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
              }}>เพิ่มไปยังตะกร้า</Button>
            </div>
            <Button className="w-full" asChild>
              <Link
                to={{ pathname: "/checkout" }}
                state={{items: [{product, quantity}], total: product.price * quantity}}
              >สั่งซื้อ
              </Link>
            </Button>
          </div>
        </div>
        <div className='border border-[#E4E7E9] flex flex-col w-full'>
          <div className='border border-[#E4E7E9] flex justify-center'>
            <div className='border-b-[3px] border-orange-400'>คำอธิบายสินค้า</div>
          </div>
          <div className='border border-[#E4E7E9] px-44 flex justify-center gap-x-32 py-6 items-start'>
            <div className='grid grid-rows-7 text-[#5F6C72] gap-x-2 w-full h-full gap-y-1 text-nowrap'>
              <h3 className='font-medium text-[#191C1F] col-span-2'>Description</h3>
              <div>Screen size:</div>
              <div>6.1 Inch</div>
              <div>Chip:</div>
              <div>A13 Bionic</div>
              <div>Display:</div>
              <div>Liquid Retina</div>
              <div>Front Camera:</div>
              <div>12MP</div>
              <div>Back Camera:</div>
              <div>Dual 12MP (Wide and Ultra Wide)</div>
              <div>Connection Ports:</div>
              <div>Lightning</div>
            </div>

            <div className='grid grid-rows-6 gap-x-2 text-[#191C1F] w-full gap-y-2 items-center text-nowrap'>
              
              <h3 className='col-span-2 font-medium'>Feature</h3>
              <Icons.user className="text-primary w-min"/>
              <div>1 Year Warranty</div>
              <Icons.user className="text-primary"/>
              <div>Free Shipping and Fast Delivery</div>
              <Icons.user className="text-primary"/>
              <div>100% Money Back Garauntee</div>
              <Icons.user className="text-primary"/>
              <div>24/7 Customer Support</div>
              <Icons.user className="text-primary"/>
              <div>Secure Payment Method</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
