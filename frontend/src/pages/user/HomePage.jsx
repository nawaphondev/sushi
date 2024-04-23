import ProductCard from "../../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import NumberSelector from "../../components/NumberSelector";
import CartRemoveButton from "../../components/CartRemoveButton";
import { thaiDateFormat } from "../../lib/utils";
import useAuth from "../../hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();
  const { cart, setCart } = useCart();
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      axios
        .get("http://localhost:3001/api/products/all")
        .then((res) => res.data),
  });
  const [filter, setFilter] = useState([]);

  function categoryOnChange(e) {
    // console.log(e.currentTarget.value);
    e.currentTarget.checked = true;
    if (e.currentTarget.value === "ALL") {
      return setFilter(products);
    }
    setFilter(
      products.filter((product) => product.category === e.currentTarget.value)
    );
  }

  // console.log(products)

  useEffect(() => {
    if (isSuccess && !isLoading && !isError) setFilter(products);
  }, [isLoading, isSuccess, isError, products]);

  return (
    <div className="flex justify-between flex-1">
      <div className="flex items-start justify-center flex-1">
        <div className="flex flex-col gap-y-4">
          <div className="join">
            <input
              className="px-8 join-item btn"
              type="radio"
              name="options"
              value={"ALL"}
              aria-label="เมนูทั้งหมด"
              defaultChecked
              onChange={categoryOnChange}
            />
            <input
              className="px-8 join-item btn "
              type="radio"
              name="options"
              value={"NIGIRI"}
              aria-label="Nigiri"
              onChange={categoryOnChange}
            />
            <input
              className="px-8 join-item btn"
              type="radio"
              name="options"
              value={"MAKI"}
              aria-label="Maki"
              onChange={categoryOnChange}
            />
            <input
              className="px-8 join-item btn"
              type="radio"
              name="options"
              value={"GUNKAN"}
              aria-label="Gunkan"
              onChange={categoryOnChange}
            />
            <input
              className="px-8 join-item btn"
              type="radio"
              name="options"
              value={"OTHERS"}
              aria-label="Others"
              onChange={categoryOnChange}
            />
          </div>
          <div className="grid grid-cols-4 gap-8">
            {isLoading ? (
              <div>กำลังโหลด...</div>
            ) : filter?.length > 0 ? (
              filter.map((product, i) => (
                <ProductCard product={product} key={product.id} top={i < 3} />
              ))
            ) : (
              <div>ไม่พบสินค้า</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col px-8 py-2 bg-white gap-y-2 w-80">
        <h2 className="font-bold text-center">ออเดอร์</h2>
        <h3 className="font-medium text-center">โต๊ะ {user.username}</h3>
        <span className="text-center">{thaiDateFormat(new Date(), true)}</span>
        {cart.map((item) => (
          <div key={item.id}>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-4">
                <CartRemoveButton productId={item.id} />
                {item.name}
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <NumberSelector
                  quantity={item.quantity}
                  onChange={(quantity) =>
                    setCart((prev) =>
                      prev.map((p) =>
                        p.id == item.id ? { ...p, quantity } : p
                      )
                    )
                  }
                />
                <span>{item.quantity * item.price}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="sticky top-0 space-y-4">
          <div className="divider"></div>
          <label className="form-control">
            <div className="pt-0 label">
              <span className="label-text">หมายเหตุ</span>
            </div>
            <textarea className="h-24 textarea textarea-bordered"></textarea>
          </label>

          <div className="flex justify-between">
            <span>รายการทั้งหมด</span>
            <span>{cart.reduce((a, b) => a + b.quantity, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>ยอดวม</span>
            <span>{cart.reduce((a, b) => a + b.quantity * b.price, 0)}</span>
          </div>
          <div className="sticky flex justify-between">
            <button
              className="uppercase btn btn-accent"
              onClick={async () => {
                // console.log(cart);
                const res = await axios
                  .post("http://localhost:3001/api/orders/new", {
                    accountId: user.id,
                    items: cart,
                  })
                  .then((res) => res.data);
                // console.log(res)
                if (res.success) {
                  // console.log("Cleart cart")
                  setCart([]);
                }
              }}
            >
              ยืนยันออเดอร์
            </button>
            <button className="uppercase btn" onClick={() => setCart([])}>
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
