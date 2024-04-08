import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CartRemoveButton(props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return axios
        .delete(`http://localhost:3001/api/carts/remove`, {
          data: {
            ...props,
            shoppingCartId: user.shoppingCart.id,
          },
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      toast("สินค้าถูกลบออกจากตะกร้า");
      queryClient.invalidateQueries("shoppingCartItems");
    },
  });

  return (
    <Button
      variant="destructive"
      onClick={() => {
        mutate();
      }}
    >
      ลบ
    </Button>
  );
}
