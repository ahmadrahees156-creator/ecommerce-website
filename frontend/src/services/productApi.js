import axios from 'axios'
export const getProducts = async (params = {}) => (await axios.get('/api/products',{params})).data
export const getCategories = async () => (await axios.get('/api/products/categories')).data.data
export const getProductById = async id => (await axios.get('/api/products/'+id)).data.data