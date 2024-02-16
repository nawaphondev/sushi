import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import useAuth from "@/hooks/useAuth"
import useCart from "@/hooks/useCart"

export default function CartRemoveButton(props) {
  const { user } = useAuth()
  const {setCart} = useCart()
  const {mutate} = useMutation({
    mutationFn: async () => {
      return await fetch(`http://localhost:3001/api/carts/remove`, {
        method: "DELETE",
        body: JSON.stringify({...props, shoppingCartId: user.shoppingCart.id}),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(async(res) => await res.json())
    },
    onSuccess: () => {
      toast("Item removed from cart")
      setCart(prev => prev.filter(item => item.product.id !== props.productId))
    }
  })

  return (
    <Button variant="destructive" onClick={() => {
      mutate()
    }}>Remove</Button>
  )
}
