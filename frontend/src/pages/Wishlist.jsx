import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getWishlist, removeFromWishlist } from '../services/wishlistApi'

function Wishlist() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadWishlist = async () => {
    try {
      setLoading(true)
      const data = await getWishlist()
      setProducts(data?.products || [])
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load wishlist.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWishlist()
  }, [])

  const remove = async (id) => {
    try {
      const data = await removeFromWishlist(id)
      setProducts(data?.products || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to remove item.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold sm:text-4xl">My Wishlist</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Products you saved for later.</p>

        {loading && <p className="mt-8 text-center">Loading wishlist...</p>}
        {error && <p className="mt-8 rounded-xl bg-red-50 p-4 text-red-600 dark:bg-red-950/30 dark:text-red-400">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <div className="mt-8 rounded-2xl border bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xl font-semibold">Your wishlist is empty.</p>
            <Link to="/products" className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white dark:bg-white dark:text-slate-900">
              Browse Products
            </Link>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product._id} className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Link to={`/products/${product._id}`}>
                  <div className="flex h-52 items-center justify-center rounded-xl bg-slate-100 p-5 dark:bg-slate-800">
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-contain" />
                  </div>
                  <h2 className="mt-4 text-xl font-bold">{product.name}</h2>
                </Link>
                <p className="mt-2 text-lg font-bold">₹{Number(product.price).toLocaleString('en-IN')}</p>
                <button onClick={() => remove(product._id)} className="mt-4 w-full rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30">
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Wishlist