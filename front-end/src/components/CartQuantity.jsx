/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import NumberSelector from './NumberSelector'

export default function CartQuantity(props) {
  const [quantity, setQuantity] = useState(props.quantity)
  const ref = useRef(null)

  useEffect(() => {
    // console.log(quantity)
  }, [quantity])
  

  return (
    <NumberSelector ref={ref} {...props} getValue={setQuantity}/>
  )
}
