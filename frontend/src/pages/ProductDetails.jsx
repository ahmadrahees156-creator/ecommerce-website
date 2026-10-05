import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/productApi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { addToWishlist, getWishlist, removeFromWishlist } from '../services/wishlistApi'
import { addProductReview, getProductReviews } from '../services/reviewApi'

function ProductDetails() {
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
  const [reviewForm, setReviewForm] = useState({ rating: '5', comment: '' })

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
          setWishlisted((wishlist?.products || []).some((item) => item._id === id))
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load this product.')
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
      window.alert(err.response?.data?.message || 'Unable to add product to cart.')
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
      window.alert(err.response?.data?.message || 'Unable to update wishlist.')
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
      await addProductReview(id, Number(reviewForm.rating), reviewForm.comment)
      setReviewForm({ rating: '5', comment: '' })
      await loadReviews()
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Unable to add review.')
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) {
    return <main className="min-h-screen p-6 text-center">Loading product...</main>
  }

  if (error || !product) {
    return (
      <main className="min-h-screen p-6 text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <p className="mt-3 text-slate-500">{error}</p>
        <Link to="/products" className="mt-4 inline-block underline">
          Back to Products
        </Link>
      </main>
    )
  }

  const image = product.imageUrl || product.image

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/products"
          className="text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
        >
          ← Back to Products
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2 md:p-8">
          <div className="flex items-center justify-center rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <img
              src={image}
              alt={product.name}
              className="h-72 w-full max-w-sm object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <button onClick={toggleWishlist} className="text-2xl" aria-label="Toggle wishlist">
                {wishlisted ? '❤️' : '♡'}
              </button>
            </div>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
              {product.description}
            </p>
            <p className="mt-5 text-2xl font-bold">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>

            {product.category && (
              <p className="mt-3 text-sm text-slate-500">Category: {product.category}</p>
            )}
            <p className="mt-2 text-sm text-slate-500">
              Stock: {product.stock ?? 'Available'}
            </p>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
            >
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>

            {added && (
              <Link
                to="/cart"
                className="mt-3 rounded-xl border py-3 text-center hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                View Cart
              </Link>
            )}
          </div>
        </div>

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>

          {reviews.length === 0 ? (
            <p className="mt-4 text-slate-500 dark:text-slate-400">No reviews yet.</p>
          ) : (
            <div className="mt-5 space-y-4">
              {reviews.map((review) => (
                <article key={review._id} className="border-t pt-4 dark:border-slate-800">
                  <div className="flex justify-between gap-3">
                    <strong>{review.user?.name || 'Customer'}</strong>
                    <span>⭐ {review.rating}/5</span>
                  </div>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold">Write a Review</h2>

          {!isAuthenticated ? (
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Please{' '}
              <Link to="/login" className="font-semibold text-blue-600">
                login
              </Link>{' '}
              to review this product.
            </p>
          ) : (
            <form onSubmit={submitReview} className="mt-5 space-y-4">
              <select
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, rating: e.target.value })
                }
                className="rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
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
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                maxLength={500}
                required
                rows={4}
                placeholder="Share your experience..."
                className="w-full rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-950"
              />

              {reviewError && <p className="text-sm text-red-600">{reviewError}</p>}

              <button
                disabled={reviewLoading}
                className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-slate-900"
              >
                {reviewLoading
                  ? 'Submitting...'
                  : `Submit Review${user?.name ? ` as ${user.name}` : ''}`}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProductDetails