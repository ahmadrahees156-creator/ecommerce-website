import axios from 'axios'

export const getProducts = async (params = {}) => {
  const response = await axios.get('/api/products', { params })
  return response.data
}

export const getCategories = async () => {
  const response = await axios.get('/api/products/categories')
  return response.data.data
}

export const getProductById = async (id) => {
  const response = await axios.get(`/api/products/${id}`)
  return response.data.data
}