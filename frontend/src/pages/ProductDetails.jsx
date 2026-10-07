import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/productApi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from '../services/wishlistApi'
import {
  addProductReview,
  getProductReviews,
} from '../services/reviewApi'

function ProductDetails() {
  const { darkMode } = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated, user } = useAuth()

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [wishlisted, setWishlisted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [reviewForm, setReviewForm] = useState({
    rating: '5',
    comment: '',
  })

  const loadReviews = async () => {
    try {
      setReviews(await getProductReviews(id))
    } catch {
      setReviews([])
    }
  }

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getProductById(id)
        setProduct(data)

        await loadReviews()

        if (isAuthenticated) {
          const wishlist = await getWishlist()

          setWishlisted(
            (wishlist?.products || []).some(
              (item) => item._id === id
            )
          )
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Unable to load this product.'
        )
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id, isAuthenticated])

  const handleAddToCart = async () => {
    try {
      await addToCart({
        ...product,
        id: product._id,
        image: product.imageUrl || product.image,
      })

      setAdded(true)
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
    }
  }

  const submitReview = async (e) => {
    e.preventDefault()
    setReviewError('')

    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      setReviewLoading(true)

      await addProductReview(
        id,
        Number(reviewForm.rating),
        reviewForm.comment
      )

      setReviewForm({
        rating: '5',
        comment: '',
      })

      await loadReviews()
    } catch (err) {
      setReviewError(
        err.response?.data?.message ||
          'Unable to add review.'
      )
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) {
    return (
      <main
        className={`min-h-screen p-6 text-center ${
          darkMode
            ? 'bg-[#050505] text-[#F5F5F5]'
            : 'bg-[#F7F8F6] text-[#171717]'
        }`}
      >
        Loading product...
      </main>
    )
  }

  if (error || !product) {
    return (
      <main
        className={`min-h-screen p-6 text-center ${
          darkMode
            ? 'bg-[#050505] text-[#F5F5F5]'
            : 'bg-[#F7F8F6] text-[#171717]'
        }`}
      >
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

        <p className="mt-3 text-red-500">{error}</p>

        <Link
          to="/products"
          className={`mt-4 inline-block font-semibold ${
            darkMode
              ? 'text-[#22C55E]'
              : 'text-[#15803D]'
          }`}
        >
          Back to Products
        </Link>
      </main>
    )
  }

  const image = product.imageUrl || product.image

  const card = darkMode
    ? 'border-[#262626] bg-[#111111]'
    : 'border-[#E5E7EB] bg-white'

  const muted = darkMode
    ? 'text-[#A3A3A3]'
    : 'text-[#525252]'

  return (
    <main
      className={`min-h-screen p-6 transition-colors ${
        darkMode
          ? 'bg-[#050505] text-[#F5F5F5]'
          : 'bg-[#F7F8F6] text-[#171717]'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <Link
          to="/products"
          className={`font-semibold transition ${
            darkMode
              ? 'text-[#A3A3A3] hover:text-[#22C55E]'
              : 'text-[#525252] hover:text-[#15803D]'
          }`}
        >
          ← Back to Products
        </Link>

        <div
          className={`mt-6 grid grid-cols-1 gap-8 rounded-2xl border p-6 shadow-sm md:grid-cols-2 md:p-8 ${card}`}
        >
          <div
            className={`flex items-center justify-center rounded-xl p-4 ${
              darkMode ? 'bg-[#0B0B0B]' : 'bg-[#F7F8F6]'
            }`}
          >
            <img
              src={image}
              alt={product.name}
              className="h-72 w-full max-w-sm object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold">
                {product.name}
              </h1>

              <button
                onClick={toggleWishlist}
                className="text-2xl"
                aria-label="Toggle wishlist"
              >
                {wishlisted ? '❤️' : '♡'}
              </button>
            </div>

            <p className={`mt-4 leading-7 ${muted}`}>
              {product.description}
            </p>

            <p className="mt-5 text-2xl font-bold">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>

            {product.category && (
              <p className={`mt-3 text-sm ${muted}`}>
                Category: {product.category}
              </p>
            )}

            <p className={`mt-2 text-sm ${muted}`}>
              Stock: {product.stock ?? 'Available'}
            </p>

            <button
              onClick={handleAddToCart}
              className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${
                darkMode
                  ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                  : 'bg-[#15803D] text-white hover:bg-[#166534]'
              }`}
            >
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>

            {added && (
              <Link
                to="/cart"
                className={`mt-3 rounded-xl border py-3 text-center transition ${
                  darkMode
                    ? 'border-[#262626] hover:bg-[#050505]'
                    : 'border-[#E5E7EB] hover:bg-[#F7F8F6]'
                }`}
              >
                View Cart
              </Link>
            )}
          </div>
        </div>

        <section
          className={`mt-8 rounded-2xl border p-6 shadow-sm ${card}`}
        >
          <h2 className="text-2xl font-bold">
            Reviews ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <p className={`mt-4 ${muted}`}>
              No reviews yet.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {reviews.map((review) => (
                <article
                  key={review._id}
                  className={`border-t pt-4 ${
                    darkMode
                      ? 'border-[#262626]'
                      : 'border-[#E5E7EB]'
                  }`}
                >
                  <div className="flex justify-between gap-3">
                    <strong>
                      {review.user?.name || 'Customer'}
                    </strong>

                    <span>⭐ {review.rating}/5</span>
                  </div>

                  <p className={`mt-2 ${muted}`}>
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section
          className={`mt-6 rounded-2xl border p-6 shadow-sm ${card}`}
        >
          <h2 className="text-2xl font-bold">
            Write a Review
          </h2>

          {!isAuthenticated ? (
            <p className={`mt-3 ${muted}`}>
              Please{' '}
              <Link
                to="/login"
                className={
                  darkMode
                    ? 'font-semibold text-[#22C55E]'
                    : 'font-semibold text-[#15803D]'
                }
              >
                login
              </Link>{' '}
              to review this product.
            </p>
          ) : (
            <form
              onSubmit={submitReview}
              className="mt-5 space-y-4"
            >
              <select
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    rating: e.target.value,
                  })
                }
                className={`rounded-xl border px-4 py-3 outline-none ${
                  darkMode
                    ? 'border-[#262626] bg-[#050505]'
                    : 'border-[#E5E7EB] bg-white'
                }`}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Very Poor</option>
              </select>

              <textarea
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    comment: e.target.value,
                  })
                }
                maxLength={500}
                required
                rows={4}
                placeholder="Share your experience..."
                className={`w-full rounded-xl border px-4 py-3 outline-none ${
                  darkMode
                    ? 'border-[#262626] bg-[#050505] placeholder:text-[#737373]'
                    : 'border-[#E5E7EB] bg-white placeholder:text-[#737373]'
                }`}
              />

              {reviewError && (
                <p className="text-sm text-red-500">
                  {reviewError}
                </p>
              )}

              <button
                disabled={reviewLoading}
                className={`rounded-xl px-5 py-3 font-semibold transition disabled:opacity-50 ${
                  darkMode
                    ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                    : 'bg-[#15803D] text-white hover:bg-[#166534]'
                }`}
              >
                {reviewLoading
                  ? 'Submitting...'
                  : `Submit Review${
                      user?.name ? ` as ${user.name}` : ''
                    }`}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProductDetails