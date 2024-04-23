/* eslint-disable react/prop-types */
import useCart from "../hooks/useCart";

export default function ProductCard({ product, top = false }) {
  const { setCart } = useCart();

  return (
    <div className="indicator">
      {top && (
        <span className="indicator-item badge badge-accent indicator-center">
          อร่อยเว่อร์เต็ม 10
        </span>
      )}
      <div className="w-48 h-full border shadow-xl card card-compact bg-base-100">
        <figure>
          <img
            src={`http://localhost:3001/images/${product.image}`}
            alt="Shoes"
            className="object-cover aspect-square"
          />
        </figure>
        <div className="card-body">
          <div className="items-center justify-between mt-auto card-actions">
            <div className="card-title">{product.name}</div>

            <button
              className="cursor-pointer"
              onClick={() =>
                setCart((prev) => {
                  //add 1 quantity to existing product id
                  if (prev.find((p) => p.id === product.id)) {
                    return prev.map((p) =>
                      p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                    );
                  }
                  //add new product
                  return [...prev, { ...product, quantity: 1 }];
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 122.88"
                className="size-10 fill-accent"
                fill="currentColor"
              >
                <path d="M61.44 0A61.46 61.46 0 1 1 18 18 61.25 61.25 0 0 1 61.44 0ZM88.6 56.82v9.24a4 4 0 0 1-4 4H70v14.56a4 4 0 0 1-4 4h-9.18a4 4 0 0 1-4-4V70H38.26a4 4 0 0 1-4-4v-9.18a4 4 0 0 1 4-4h14.58V38.26a4 4 0 0 1 4-4h9.24a4 4 0 0 1 4 4v14.58h14.54a4 4 0 0 1 4 4Zm8.83-31.37a50.92 50.92 0 1 0 14.9 36 50.78 50.78 0 0 0-14.9-36Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
