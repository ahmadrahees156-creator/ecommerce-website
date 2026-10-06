import api from './api'

export const getProductReviews = async (productId) => {
  const response = await api.get(`/products/${productId}/reviews`)
  return response.data.data
}

export const addProductReview = async (productId, rating, comment) => {
  const response = await api.post(`/products/${productId}/reviews`, {
    rating,
    comment,
  })
  return response.data.data
}