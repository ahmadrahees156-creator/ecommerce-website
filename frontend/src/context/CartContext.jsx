import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { getCart, addCartItem, updateCartItem, removeCartItem, clearCart as clearServerCart } from '../services/cartApi'

const CartContext = createContext()
const formatCart = (serverCart) => (serverCart?.items || []).map(({ product = {}, quantity }) => ({
  ...product, id: product._id || product.id, price: String(product.price ?? 0),
  image: product.imageUrl || product.image || '', quantity
}))

function CartProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('shopkart-cart') || '[]'))
  const [cartLoading, setCartLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) { localStorage.setItem('shopkart-cart', JSON.stringify(cart)); return }
    ;(async () => {
      try { setCartLoading(true); setCart(formatCart(await getCart())); localStorage.removeItem('shopkart-cart') }
      finally { setCartLoading(false) }
    })()
  }, [isAuthenticated])

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      setCart(c => { const x=c.find(i=>i.id===product.id); return x ? c.map(i=>i.id===product.id?{...i,quantity:i.quantity+1}:i) : [...c,{...product,quantity:1}] })
      return
    }
    setCart(formatCart(await addCartItem(product.id, 1)))
  }
  const removeFromCart = async (id) => isAuthenticated ? setCart(formatCart(await removeCartItem(id))) : setCart(c=>c.filter(i=>i.id!==id))
  const increaseQuantity = async (id) => {
    const item=cart.find(i=>i.id===id); if(!item)return
    if(isAuthenticated) setCart(formatCart(await updateCartItem(id,item.quantity+1)))
    else setCart(c=>c.map(i=>i.id===id?{...i,quantity:i.quantity+1}:i))
  }
  const decreaseQuantity = async (id) => {
    const item=cart.find(i=>i.id===id); if(!item)return
    if(!isAuthenticated) return setCart(c=>c.map(i=>i.id===id?{...i,quantity:i.quantity-1}:i).filter(i=>i.quantity>0))
    setCart(formatCart(item.quantity===1 ? await removeCartItem(id) : await updateCartItem(id,item.quantity-1)))
  }
  const clearCart = async () => isAuthenticated ? setCart(formatCart(await clearServerCart())) : setCart([])
  return <CartContext.Provider value={{cart,cartLoading,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart}}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext)
export default CartProvider