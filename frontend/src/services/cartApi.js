import api from './api'

export const getCart = async () => {
  const response = await api.get('/cart')
  return response.data.data
}

export const addCartItem = async (productId, quantity = 1) => {
  const response = await api.post('/cart/add', { productId, quantity })
  return response.data.data
}

export const updateCartItem = async (productId, quantity) => {
  const response = await api.patch(`/cart/items/${productId}`, { quantity })
  return response.data.data
}

export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/items/${productId}`)
  return response.data.data
}

export const clearCart = async () => {
  const response = await api.delete('/cart/clear')
  return response.data.data
}