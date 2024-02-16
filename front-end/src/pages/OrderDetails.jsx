import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Progress } from "@/components/ui/progress"
import Icons from "@/components/ui/Icons"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

export default function OrderDetails() {
  const { id } = useParams()
  const { data: order, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/api/orders/${id}`)
      const data = await response.json()
      // console.log(data)
      return data
    },
  })

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading...</div>
  
  return (
    
    <div className='flex items-center justify-center flex-grow w-8/12 mx-auto'>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle>รายละเอียดการสั่งซื้อ</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-6 border-y">
          <div className="flex flex-row justify-between p-6 border bg-accent">
            <div className="flex flex-col">
              <div>#{order.id}</div>
              <div>{order.orderDate}</div>
            </div>
            <h1>{order.orderDetails && order.orderDetails?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)}</h1>
          </div>
          <div>Order is expected to arrive on (Date Time)</div>
          <div className="py-4 space-y-6 px-44">
            <Progress value={25}/>
            <div className="flex flex-row items-center justify-between">
              <Icons.product className="w-12 h-12" />
              <Icons.product className="w-12 h-12" />
              <Icons.product className="w-12 h-12" />
              <Icons.product className="w-12 h-12" />
            </div>
          </div>
          <div>Product(Number of products)</div>
          <Table>
            <TableHeader className="bg-accent">
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="w-[100px]">Quantity</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                order.orderDetails?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex flex-row items-center font-medium gap-x-6">
                      <img src={`http://localhost:3001/images/${item.product.productImg}`} className="w-[100px]" />
                      {item.product.name} {item.product.capacity} {item.product.color}
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.quantity * item.price}</TableCell>
                  </TableRow>
                ))
              }
              
            </TableBody>
          </Table>

        </CardContent>
        <CardFooter className="flex flex-row items-center justify-center p-6 gap-x-6">
          <div className="flex flex-col">
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
          </div>
          <Separator orientation="vertical"/>
          <div className="flex flex-col">
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
            <div>asdasdasdasd</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
