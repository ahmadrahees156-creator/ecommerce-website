import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getWishlist,
  removeFromWishlist,
} from '../services/wishlistApi'
import { useTheme } from '../context/ThemeContext'

function Wishlist() {
  const { darkMode } = useTheme()

  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadWishlist = async () => {
    try {
      setLoading(true)
      setError('')
      setWishlist(await getWishlist())
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load wishlist.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWishlist()
  }, [])

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId)
      await loadWishlist()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to remove product from wishlist.'
      )
    }
  }

  const card = darkMode
    ? 'border-[#262626] bg-[#111111]'
    : 'border-[#E5E7EB] bg-white'

  const muted = darkMode
    ? 'text-[#A3A3A3]'
    : 'text-[#525252]'

  const green = darkMode
    ? 'text-[#22C55E]'
    : 'text-[#15803D]'

  if (loading) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center ${
          darkMode
            ? 'bg-[#050505] text-[#F5F5F5]'
            : 'bg-[#F7F8F6] text-[#171717]'
        }`}
      >
        <p>Loading wishlist...</p>
      </main>
    )
  }

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors sm:px-6 lg:px-8 ${
        darkMode
          ? 'bg-[#050505] text-[#F5F5F5]'
          : 'bg-[#F7F8F6] text-[#171717]'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            My Wishlist
          </h1>

          <p className={`mt-2 ${muted}`}>
            Products you saved for later.
          </p>
        </div>

        {error && (
          <p className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-500">
            {error}
          </p>
        )}

        {!error &&
          (!wishlist?.products ||
            wishlist.products.length === 0) && (
            <div
              className={`mt-8 rounded-2xl border p-10 text-center ${card}`}
            >
              <p className="text-lg font-semibold">
                Your wishlist is empty.
              </p>

              <p className={`mt-2 ${muted}`}>
                Save products you like and find them here later.
              </p>

              <Link
                to="/products"
                className={`mt-6 inline-block rounded-xl px-5 py-3 font-semibold text-white ${
                  darkMode
                    ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                    : 'bg-[#15803D] hover:bg-[#166534]'
                }`}
              >
                Browse Products
              </Link>
            </div>
          )}

        {!error &&
          wishlist?.products &&
          wishlist.products.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.products.map((product) => (
                <div
                  key={product._id}
                  className={`overflow-hidden rounded-2xl border shadow-sm ${card}`}
                >
                  <div
                    className={`flex h-56 items-center justify-center p-6 ${
                      darkMode
                        ? 'bg-[#0B0B0B]'
                        : 'bg-[#F7F8F6]'
                    }`}
                  >
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className={muted}>
                        No image available
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h2 className="line-clamp-1 text-lg font-bold">
                      {product.name}
                    </h2>

                    <p
                      className={`mt-2 line-clamp-2 text-sm ${muted}`}
                    >
                      {product.description}
                    </p>

                    <p className={`mt-4 text-xl font-bold ${green}`}>
                      ₹
                      {Number(product.price).toLocaleString(
                        'en-IN'
                      )}
                    </p>

                    <div className="mt-5 flex gap-2">
                      <Link
                        to={`/products/${product._id}`}
                        className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold text-white ${
                          darkMode
                            ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                            : 'bg-[#15803D] hover:bg-[#166534]'
                        }`}
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() =>
                          handleRemove(product._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </main>
  )
}

export default Wishlist