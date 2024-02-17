import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import useAuth from "@/hooks/useAuth"
import { useQueryClient } from "@tanstack/react-query"

export default function CartRemoveButton(props) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
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
      toast("สินค้าถูกลบออกจากตะกร้า")
      queryClient.invalidateQueries('carts')
    }
  })

  return (
    <Button variant="destructive" onClick={() => {
      mutate()
    }}>ลบ</Button>
  )
}
