import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { addToWishlist, getWishlist, removeFromWishlist } from '../services/wishlistApi'

function ProductCard({ id, name, description, price, image }) {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlisted(false)
      return
    }

    getWishlist()
      .then((data) => {
        setWishlisted((data?.products || []).some((item) => item._id === id))
      })
      .catch(() => {})
  }, [id, isAuthenticated])

  const handleAddToCart = async () => {
    try {
      await addToCart({ id, name, description, price, image })
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } catch (err) {
      window.alert(err.response?.data?.message || 'Unable to add product to cart.')
    }
  }

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      setWishlistLoading(true)
      if (wishlisted) {
        await removeFromWishlist(id)
        setWishlisted(false)
      } else {
        await addToWishlist(id)
        setWishlisted(true)
      }
    } catch (err) {
      window.alert(err.response?.data?.message || 'Unable to update wishlist.')
    } finally {
      setWishlistLoading(false)
    }
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <button
        onClick={toggleWishlist}
        disabled={wishlistLoading}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-white/90 text-xl shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
      >
        {wishlisted ? '❤️' : '♡'}
      </button>

      <Link
        to={`/products/${id}`}
        className="flex h-56 items-center justify-center bg-slate-100 p-6 dark:bg-slate-800 sm:h-64"
      >
        <img src={image} alt={name} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h2>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {description}
        </p>

        <p className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
          ₹{Number(price).toLocaleString('en-IN')}
        </p>

        {added && (
          <p role="status" className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
            ✓ {name} added to cart successfully!
          </p>
        )}

        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <Link
            to={`/products/${id}`}
            className="rounded-xl border border-slate-300 px-3 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900'
            }`}
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard