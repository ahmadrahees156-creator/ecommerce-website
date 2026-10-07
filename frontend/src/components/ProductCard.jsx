import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../services/wishlistApi'

function ProductCard({ id, name, description, price, image }) {
  const { darkMode } = useTheme()
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
        setWishlisted(
          (data?.products || []).some((item) => item._id === id)
        )
      })
      .catch(() => {})
  }, [id, isAuthenticated])

  const handleAddToCart = async () => {
    try {
      await addToCart({ id, name, description, price, image })
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } catch (err) {
      window.alert(
        err.response?.data?.message ||
          'Unable to add product to cart.'
      )
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
      window.alert(
        err.response?.data?.message ||
          'Unable to update wishlist.'
      )
    } finally {
      setWishlistLoading(false)
    }
  }

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        darkMode
          ? 'border-[#262626] bg-[#111111]'
          : 'border-[#E5E7EB] bg-white'
      }`}
    >
      <button
        onClick={toggleWishlist}
        disabled={wishlistLoading}
        aria-label={
          wishlisted
            ? 'Remove from wishlist'
            : 'Add to wishlist'
        }
        className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border text-xl shadow-sm backdrop-blur ${
          darkMode
            ? 'border-[#262626] bg-[#050505]/90'
            : 'border-[#E5E7EB] bg-white/90'
        }`}
      >
        {wishlisted ? '❤️' : '♡'}
      </button>

      <Link
        to={`/products/${id}`}
        className={`flex h-56 items-center justify-center p-6 sm:h-64 ${
          darkMode ? 'bg-[#0B0B0B]' : 'bg-[#F7F8F6]'
        }`}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h2
          className={`text-xl font-bold ${
            darkMode ? 'text-[#F5F5F5]' : 'text-[#171717]'
          }`}
        >
          {name}
        </h2>

        <p
          className={`mt-2 min-h-12 text-sm leading-6 ${
            darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'
          }`}
        >
          {description}
        </p>

        <p
          className={`mt-4 text-xl font-bold ${
            darkMode ? 'text-[#F5F5F5]' : 'text-[#171717]'
          }`}
        >
          ₹{Number(price).toLocaleString('en-IN')}
        </p>

        {added && (
          <p
            role="status"
            className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${
              darkMode
                ? 'bg-[#052E16] text-[#4ADE80]'
                : 'bg-[#DCFCE7] text-[#15803D]'
            }`}
          >
            ✓ {name} added to cart successfully!
          </p>
        )}

        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <Link
            to={`/products/${id}`}
            className={`rounded-xl border px-3 py-3 text-center text-sm font-semibold transition ${
              darkMode
                ? 'border-[#262626] text-[#F5F5F5] hover:bg-[#050505]'
                : 'border-[#E5E7EB] text-[#171717] hover:bg-[#F7F8F6]'
            }`}
          >
            View Details
          </Link>

          <button
            onClick={handleAddToCart}
            className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
              added
                ? darkMode
                  ? 'bg-[#22C55E] text-[#050505]'
                  : 'bg-[#15803D] text-white'
                : darkMode
                  ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                  : 'bg-[#15803D] text-white hover:bg-[#166534]'
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