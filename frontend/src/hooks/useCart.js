import { useContext } from "react";
import CartContext from "../contexts/CartContext";

export default function useCart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cartContext;
}
