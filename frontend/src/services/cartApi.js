import api from './api'

export const getCart = async () => (await api.get('/cart')).data.data
export const addCartItem = async (productId, quantity = 1) => (await api.post('/cart/add', { productId, quantity })).data.data
export const updateCartItem = async (productId, quantity) => (await api.patch('/cart/items/' + productId, { quantity })).data.data
export const removeCartItem = async (productId) => (await api.delete('/cart/items/' + productId)).data.data
export const clearCart = async () => (await api.delete('/cart/clear')).data.data