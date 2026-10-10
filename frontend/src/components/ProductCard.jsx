
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

  const card = darkMode
    ? 'border-[#383838] bg-[#1A1A1A] text-[#F5F5F5]'
    : 'border-[#E4E9DF] bg-white text-[#173D30]'

  const imageSurface = darkMode
    ? 'bg-[#202020]'
    : 'bg-[#F8F5EC]'

  const secondaryText = darkMode
    ? 'text-[#B5B5B5]'
    : 'text-[#68786D]'

  const buttonPrimary = darkMode
    ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
    : 'bg-[#064E3B] text-white hover:bg-[#047857]'

  const buttonSecondary = darkMode
    ? 'border-[#484848] text-[#F5F5F5] hover:border-[#D6B887] hover:text-[#D6B887]'
    : 'border-[#D7E0D5] text-[#173D30] hover:border-[#064E3B] hover:bg-[#F8F5EC]'

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(6,78,59,0.10)] ${card}`}
    >
      <div className="relative">
        <Link
          to={`/products/${id}`}
          aria-label={`View ${name}`}
          className={`flex h-44 items-center justify-center overflow-hidden p-4 sm:h-48 ${imageSurface}`}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className={`text-sm ${secondaryText}`}>
              Image unavailable
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={toggleWishlist}
          disabled={wishlistLoading}
          aria-label={
            wishlisted ? 'Remove from wishlist' : 'Add to wishlist'
          }
          aria-pressed={wishlisted}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur transition hover:scale-110 disabled:opacity-50 ${
            darkMode
              ? 'border-[#484848] bg-[#171717]/90'
              : 'border-[#E4E9DF] bg-white/90'
          }`}
        >
          <span
            className={`text-xl leading-none ${
              wishlisted
                ? darkMode
                  ? 'text-[#D6B887]'
                  : 'text-[#047857]'
                : secondaryText
            }`}
          >
            {wishlisted ? '♥' : '♡'}
          </span>
        </button>

        <span
          className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            darkMode
              ? 'bg-[#D6B887] text-[#171717]'
              : 'bg-[#064E3B] text-white'
          }`}
        >
          ShopKart
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link
          to={`/products/${id}`}
          className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 transition hover:underline sm:text-base"
        >
          {name}
        </Link>

        <p className={`mt-2 line-clamp-2 min-h-9 text-xs leading-5 ${secondaryText}`}>
          {description || 'Explore quality products at ShopKart.'}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-lg font-bold tracking-tight sm:text-xl">
            ₹{Number(price).toLocaleString('en-IN')}
          </p>

          <span
            className={`text-[10px] font-medium uppercase tracking-wide ${secondaryText}`}
          >
            Price
          </span>
        </div>

        {added && (
          <p
            role="status"
            className={`mt-3 rounded-md px-2 py-2 text-xs font-medium ${
              darkMode
                ? 'bg-[#203126] text-[#B8D8BF]'
                : 'bg-[#EAF3E9] text-[#064E3B]'
            }`}
          >
            ✓ Added to cart successfully
          </p>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Link
            to={`/products/${id}`}
            className={`flex min-h-10 items-center justify-center rounded-lg border px-2 py-2 text-center text-xs font-semibold transition sm:text-sm ${buttonSecondary}`}
          >
            Details
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex min-h-10 items-center justify-center rounded-lg px-2 py-2 text-xs font-semibold transition sm:text-sm ${buttonPrimary}`}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard