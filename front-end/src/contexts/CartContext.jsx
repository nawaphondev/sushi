/* eslint-disable react/prop-types */
import useAuth from '@/hooks/useAuth'
import axios from 'axios'
import {createContext, useState, useEffect} from 'react'

const CartContext = createContext()


function CartContextProvider(props) {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()


  async function fetchCart() {
    const res = await axios.get('http://localhost:3001/api/carts/get/'+user.shoppingCart.id)
    return res.data
  }

  useEffect( ()=>{
    if (!user) { return }
    const run = async () => {
      try {
        setLoading(true)
        const data = await fetchCart()
        // console.log(data.shoppingCartItems)
        // console.log(data)
        setCart(data.shoppingCartItems)
        
      } catch(err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [user])

  return (
    <CartContext.Provider value={{cart, setCart, loading}}>
      {props.children}
    </CartContext.Provider>
  )
}

export { CartContextProvider }
export default CartContext