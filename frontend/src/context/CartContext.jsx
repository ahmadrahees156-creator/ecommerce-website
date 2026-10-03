import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

function CartProvider({ children }) {
  const [cart, setCart] = useState([])

const addToCart = (product) => {
  setCart((currentCart) => {
    const existingProduct = currentCart.find(
      (item) => item.id === product.id
    )

    if (existingProduct) {
      return currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }

    return [...currentCart, { ...product, quantity: 1 }]
  })
}
  
  const removeFromCart = (id) => {
    setCart((currentCart) =>
    currentCart.filter((product) => product.id !== id)
)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

export default CartProvider