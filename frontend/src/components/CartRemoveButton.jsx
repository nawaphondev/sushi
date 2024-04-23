import useCart from "../hooks/useCart";

export default function CartRemoveButton(props) {
  const { setCart } = useCart();

  return (
    <button
      className="p-1 bg-red-600 rounded-full cursor-pointer size-fit"
      onClick={() => {
        // console.log(props)
        // eslint-disable-next-line react/prop-types
        setCart((prev) => prev.filter((p) => p.id != props.productId));
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-3 stroke-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
