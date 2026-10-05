import api from './api'

export const createOrder = async () => (await api.post('/orders')).data.data
export const getMyOrders = async (status = '') => (await api.get('/orders', { params: status ? { status } : {} })).data.data
export const getOrderById = async (id) => (await api.get('/orders/' + id)).data.data
export const cancelOrder = async (id) => (await api.patch('/orders/' + id + '/cancel')).data.data