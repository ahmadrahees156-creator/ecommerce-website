import api from './api'

export const createOrder = async () => {
  const response = await api.post('/orders')
  return response.data.data
}

export const getMyOrders = async (status = '') => {
  const response = await api.get('/orders', {
    params: status ? { status } : {},
  })
  return response.data.data
}

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`)
  return response.data.data
}

export const cancelOrder = async (id) => {
  const response = await api.patch(`/orders/${id}/cancel`)
  return response.data.data
}