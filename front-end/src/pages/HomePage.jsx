import { useMutation, useQuery } from "@tanstack/react-query";
import Icons from "../components/Icons";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function HomePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return axios
        .get("http://localhost:3001/api/products/all")
        .then((res) => res.data);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return axios
        .post(`http://localhost:3001/api/carts/add`, {
          ...data,
          shoppingCartId: user.shoppingCart.id,
        })
        .then((res) => res.data);
    },
  });

  return (
    <div className="flex items-center justify-center flex-grow w-8/12 mx-auto">
      <div className="flex flex-col gap-x-4 gap-y-12 mt-8 py-1">
        <Input
          type="text"
          placeholder="ค้นหาสินค้า..."
          className="rounded-md border border-[#E4E7E9] w-full"
        />
        <div className="grid grid-cols-4 gap-8">
          {isLoading ? (
            <div>กำลังโหลด...</div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Card>
                  <CardHeader>
                    <img
                      src={`http://localhost:3001/images/${product.productImg}`}
                      alt=""
                      className="object-scale-down aspect-square"
                    />
                  </CardHeader>
                  <CardContent>
                    <div>
                      {product.name} ({product.capacity}) - {product.color}
                    </div>
                    <div className="pl-2 text-primary">{product.price} บาท</div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Icons.cart
                      className="z-10 w-10 h-10"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        mutate(
                          { productId: product.id, quantity: 1 },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: ["shoppingCartItems"],
                              });
                              toast(`${product.name} ถูกเพิ่มไปยังตะกร้า`, {
                                action: {
                                  label: "เรียกกลับ",
                                  onClick: () => console.log("เรียกกลับ"),
                                },
                              });
                            },
                          }
                        );
                      }}
                    />
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div>ไม่พบสินค้า</div>
          )}
        </div>
      </div>
    </div>
  );
}
