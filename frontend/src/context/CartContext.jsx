import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart as clearServerCart,
} from '../services/cartApi'

const CartContext = createContext()

const formatCart = (serverCart) =>
  (serverCart?.items || []).map((item) => {
    const product = item.product || {}

    return {
      ...product,
      id: product._id || product.id,
      price: String(product.price ?? 0),
      image: product.imageUrl || product.image || '',
      quantity: item.quantity,
    }
  })

function CartProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopkart-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })
  const [cartLoading, setCartLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('shopkart-cart', JSON.stringify(cart))
      return
    }

    const loadServerCart = async () => {
      try {
        setCartLoading(true)
        const serverCart = await getCart()
        setCart(formatCart(serverCart))
        localStorage.removeItem('shopkart-cart')
      } catch {
        // Keep the current local cart if the server is temporarily unavailable.
      } finally {
        setCartLoading(false)
      }
    }

    loadServerCart()
  }, [isAuthenticated])

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      setCart((currentCart) => {
        const existingProduct = currentCart.find((item) => item.id === product.id)

        if (existingProduct) {
          return currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }

        return [...currentCart, { ...product, quantity: 1 }]
      })
      return
    }

    const serverCart = await addCartItem(product.id, 1)
    setCart(formatCart(serverCart))
  }

  const removeFromCart = async (id) => {
    if (!isAuthenticated) {
      setCart((currentCart) => currentCart.filter((product) => product.id !== id))
      return
    }

    const serverCart = await removeCartItem(id)
    setCart(formatCart(serverCart))
  }

  const increaseQuantity = async (id) => {
    const item = cart.find((product) => product.id === id)
    if (!item) return

    if (!isAuthenticated) {
      setCart((currentCart) =>
        currentCart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      )
      return
    }

    const serverCart = await updateCartItem(id, item.quantity + 1)
    setCart(formatCart(serverCart))
  }

  const decreaseQuantity = async (id) => {
    const item = cart.find((product) => product.id === id)
    if (!item) return

    if (!isAuthenticated) {
      setCart((currentCart) =>
        currentCart
          .map((product) =>
            product.id === id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
          .filter((product) => product.quantity > 0)
      )
      return
    }

    if (item.quantity === 1) {
      const serverCart = await removeCartItem(id)
      setCart(formatCart(serverCart))
      return
    }

    const serverCart = await updateCartItem(id, item.quantity - 1)
    setCart(formatCart(serverCart))
  }

  const clearCart = async () => {
    if (!isAuthenticated) {
      setCart([])
      return
    }

    const serverCart = await clearServerCart()
    setCart(formatCart(serverCart))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLoading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

export default CartProvider