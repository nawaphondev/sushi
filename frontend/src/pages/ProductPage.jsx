import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import NumberSelector from "../components/NumberSelector";

export default function ProductPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const quantityRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return axios
        .get(`http://localhost:3001/api/products/get/${id}`)
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

  if (isError) return <div>พบข้อผิดพลาด</div>;
  if (isLoading) return <div>กำลังโหลด</div>;

  return (
    <div className="flex items-center justify-center flex-1 w-8/12 mx-auto">
      <div className="flex gap-x-6">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <img
            src={`http://localhost:3001/images/${product.productImages[0].file}`}
            alt={product.name}
            className="w-7/12"
          />
          <div className="flex items-center h-56 gap-4 justify-evenly">
            {product.productImages.map((image, i) => {
              if (i == 0) return null;
              return (
                <img
                  key={i}
                  src={`http://localhost:3001/images/${image.file}`}
                  alt={product.name}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col w-full gap-y-6">
          <h1 className="text-xl">{product.name}</h1>
          <h1 className="text-xl">{product.price}</h1>

          <div className="flex items-center justify-between gap-x-4">
            <div className="flex flex-col items-center justify-center gap-y-2">
              <NumberSelector
                className="text-center"
                ref={quantityRef}
                quantity={1}
                onChange={(quantity) => setQuantity(quantity)}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-y-6">
              <button
                className="btn btn-wide btn-primary"
                onClick={() => {
                  mutate(
                    {
                      productId: product.id,
                      quantity,
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["shoppingCartItems"],
                        });
                      },
                    }
                  );
                }}
              >
                เพิ่มไปยังตะกร้า
              </button>

              <button
                onClick={() => {
                  navigate(
                    { pathname: "/checkout" },
                    { state: { items: [{ product, quantity }] } }
                  );
                }}
                className="btn btn-outline btn-wide btn-primary"
              >
                สั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
