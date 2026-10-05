import api from './api'

export const getProductReviews = async (productId) => (await api.get('/products/' + productId + '/reviews')).data.data
export const addProductReview = async (productId, rating, comment) => (await api.post('/products/' + productId + '/reviews', { rating, comment })).data.data