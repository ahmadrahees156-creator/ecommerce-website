
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
  getProductReviews,
  addProductReview,
} from '../services/reviewApi'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { darkMode } = useTheme()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState('')
  const [wishlisted, setWishlisted] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [cartMessage, setCartMessage] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [reviewError, setReviewError] = useState('')
  const [reviewMessage, setReviewMessage] = useState('')

  const c = darkMode
    ? {
        page: '#101010',
        card: '#1A1A1A',
        image: '#222222',
        text: '#F5F5F5',
        muted: '#B5B5B5',
        border: '#383838',
        accent: '#D6B887',
        button: '#E5E2DC',
        buttonText: '#171717',
        soft: '#252820',
      }
    : {
        page: '#F8F5EC',
        card: '#FFFFFF',
        image: '#F0F2EB',
        text: '#173D30',
        muted: '#68786D',
        border: '#E4E9DF',
        accent: '#064E3B',
        button: '#064E3B',
        buttonText: '#FFFFFF',
        soft: '#EAF0E7',
      }

  useEffect(() => {
    let cancelled = false

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await getProductById(id)
        const data = response?.data ?? response
        const item = data?.product ?? data

        if (!item || !(item._id || item.id)) {
          throw new Error('Product not found.')
        }

        if (cancelled) return

        setProduct(item)

        const images = [
          ...(Array.isArray(item.images) ? item.images : []),
          item.imageUrl,
          item.image,
        ].filter(
          (image) => typeof image === 'string' && image.trim()
        )

        setSelectedImage(images[0] || '')
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              'Unable to load this product.'
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProduct()

    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => {
    let cancelled = false

    const checkWishlist = async () => {
      if (!isAuthenticated) {
        setWishlisted(false)
        return
      }

      try {
        const response = await getWishlist()
        const data = response?.data ?? response
        const items =
          data?.products ?? data?.wishlist ?? data?.items ?? []

        if (!cancelled && Array.isArray(items)) {
          setWishlisted(
            items.some((item) =>
              String(
                item._id ??
                  item.id ??
                  item.product?._id ??
                  item.product?.id
              ) === String(id)
            )
          )
        }
      } catch {
      }
    }

    checkWishlist()

    return () => {
      cancelled = true
    }
  }, [id, isAuthenticated])

  useEffect(() => {
    let cancelled = false

    const loadReviews = async () => {
      try {
        setReviewsLoading(true)
        setReviewError('')

        const data = await getProductReviews(id)

        if (!cancelled) {
          const list = Array.isArray(data)
            ? data
            : data?.reviews ?? []

          setReviews(list)
        }
      } catch (err) {
        if (!cancelled) {
          setReviewError(
            err.response?.data?.message ||
              'Unable to load reviews.'
          )
        }
      } finally {
        if (!cancelled) setReviewsLoading(false)
      }
    }

    loadReviews()

    return () => {
      cancelled = true
    }
  }, [id])

  const images = product
    ? [
        ...(Array.isArray(product.images) ? product.images : []),
        product.imageUrl,
        product.image,
      ].filter(
        (image, index, array) =>
          typeof image === 'string' &&
          image.trim() &&
          array.indexOf(image) === index
      )
    : []

  const name = product?.name ?? product?.title ?? 'Product'
  const price = Number(product?.price ?? 0)
  const description =
    product?.description ||
    'Discover the details of this ShopKart product.'

  const category =
    typeof product?.category === 'object'
      ? product.category?.name ?? product.category?.title
      : product?.category

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + (Number(review.rating) || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : '0.0'

  const handleAddToCart = async () => {
    try {
      setCartMessage('')

      await addToCart({
        id: product._id ?? product.id,
        name,
        description,
        price,
        image: selectedImage,
        quantity,
      })

      setCartMessage('Product added to your cart successfully!')
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

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (rating < 1 || rating > 5) {
      setReviewError('Please select a rating from 1 to 5.')
      return
    }

    if (!comment.trim()) {
      setReviewError('Please write a review comment.')
      return
    }

    try {
      setReviewLoading(true)
      setReviewError('')
      setReviewMessage('')

      await addProductReview(id, rating, comment.trim())

      const data = await getProductReviews(id)
      const list = Array.isArray(data)
        ? data
        : data?.reviews ?? []

      setReviews(list)
      setRating(0)
      setComment('')
      setReviewMessage(
        'Your review has been submitted successfully!'
      )
    } catch (err) {
      setReviewError(
        err.response?.data?.message ||
          'Unable to submit review.'
      )
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) {
    return (
      <main
        className="min-h-screen px-4 py-20 text-center"
        style={{ backgroundColor: c.page, color: c.text }}
      >
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
          style={{
            borderColor: c.accent,
            borderTopColor: 'transparent',
          }}
        />

        <p className="mt-5" style={{ color: c.muted }}>
          Loading product details...
        </p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main
        className="min-h-screen px-4 py-20 text-center"
        style={{ backgroundColor: c.page, color: c.text }}
      >
        <p
          className="text-3xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Product unavailable
        </p>

        <p className="mt-3 text-sm" style={{ color: c.muted }}>
          {error || 'This product could not be found.'}
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block rounded-lg px-5 py-3 text-sm font-semibold"
          style={{
            backgroundColor: c.button,
            color: c.buttonText,
          }}
        >
          Back to Products
        </Link>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen px-4 py-6 transition-colors duration-300 sm:px-6 sm:py-10 lg:px-10"
      style={{ backgroundColor: c.page, color: c.text }}
    >
      <div className="mx-auto max-w-7xl">
        <nav
          className="mb-4 flex flex-wrap items-center gap-2 text-xs"
          style={{ color: c.muted }}
        >
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <span>/</span>
          <span style={{ color: c.accent }}>{name}</span>
        </nav>

        <div className="mb-7">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-x-1"
            style={{
              backgroundColor: c.card,
              color: c.text,
              borderColor: c.border,
            }}
          >
            <span className="text-lg" aria-hidden="true">
              ←
            </span>
            Back to Products
          </button>
        </div>

        <section className="grid gap-7 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border p-6 sm:p-10"
              style={{
                backgroundColor: c.image,
                borderColor: c.border,
              }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <p className="text-sm" style={{ color: c.muted }}>
                  Product image unavailable
                </p>
              )}

              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: c.card,
                  color: c.accent,
                }}
              >
                ShopKart Collection
              </span>
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border p-2 transition"
                    style={{
                      backgroundColor: c.image,
                      borderColor:
                        selectedImage === image
                          ? c.accent
                          : c.border,
                    }}
                  >
                    <img
                      src={image}
                      alt={`${name} view ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col py-1 sm:py-3">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ color: c.accent }}
            >
              {category || 'SHOPKART SELECT'}
            </p>

            <h1
              className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {name}
            </h1>

            <div
              className="mt-5 flex flex-wrap items-center gap-3 border-b pb-5"
              style={{ borderColor: c.border }}
            >
              <span className="text-3xl font-bold">
                ₹{price.toLocaleString('en-IN')}
              </span>

              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: c.soft,
                  color: c.accent,
                }}
              >
                ShopKart selection
              </span>
            </div>

            <p
              className="mt-5 text-sm leading-7 sm:text-base"
              style={{ color: c.muted }}
            >
              {description}
            </p>

            <div
              className="mt-6 grid grid-cols-2 gap-3 rounded-xl border p-4"
              style={{
                borderColor: c.border,
                backgroundColor: c.card,
              }}
            >
              <div>
                <p className="text-xs" style={{ color: c.muted }}>
                  Collection
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {category || 'Everyday essentials'}
                </p>
              </div>

              <div>
                <p className="text-xs" style={{ color: c.muted }}>
                  Availability
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {product.stock === undefined
                    ? 'Check at checkout'
                    : Number(product.stock) > 0
                      ? 'In stock'
                      : 'Out of stock'}
                </p>
              </div>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold">Quantity</p>

              <div
                className="inline-flex items-center overflow-hidden rounded-lg border"
                style={{
                  borderColor: c.border,
                  backgroundColor: c.card,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  disabled={quantity <= 1}
                  className="h-11 w-12 text-lg disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-11 w-12 text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  product.stock !== undefined &&
                  Number(product.stock) <= 0
                }
                className="rounded-lg px-5 py-4 text-sm font-bold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  backgroundColor: c.button,
                  color: c.buttonText,
                }}
              >
                Add to Cart · ₹
                {(price * quantity).toLocaleString('en-IN')}
              </button>

              <button
                type="button"
                onClick={toggleWishlist}
                disabled={wishlistLoading}
                className="rounded-lg border px-5 py-4 text-sm font-semibold transition"
                style={{
                  backgroundColor: c.card,
                  borderColor: c.border,
                  color: c.text,
                }}
              >
                {wishlisted ? '♥ Wishlisted' : '♡ Wishlist'}
              </button>
            </div>

            {cartMessage && (
              <div
                role="status"
                className="mt-4 rounded-lg px-4 py-3 text-sm"
                style={{
                  backgroundColor: c.soft,
                  color: c.accent,
                }}
              >
                ✓ {cartMessage}
                <Link to="/cart" className="ml-2 font-bold underline">
                  View Cart
                </Link>
              </div>
            )}

            <div
              className="mt-7 space-y-4 border-t pt-5"
              style={{ borderColor: c.border }}
            >
              {[
                [
                  '✓',
                  'Carefully selected',
                  'Discover products for everyday living.',
                ],
                [
                  '↻',
                  'Easy order access',
                  'Review your purchases in your account.',
                ],
                [
                  '♡',
                  'Save your favourites',
                  'Add products to your wishlist for later.',
                ],
              ].map(([icon, title, subtitle]) => (
                <div key={title} className="flex items-start gap-3">
                  <span style={{ color: c.accent }}>{icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p
                      className="mt-1 text-xs leading-5"
                      style={{ color: c.muted }}
                    >
                      {subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mt-12 overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: c.card,
            borderColor: c.border,
          }}
        >
          <div
            className="flex flex-wrap gap-6 border-b px-5 sm:px-8"
            style={{ borderColor: c.border }}
          >
            {[
              ['description', 'Description'],
              ['details', 'Product Details'],
            ].map(([tab, label]) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="border-b-2 py-4 text-sm font-semibold transition"
                style={{
                  borderColor:
                    activeTab === tab ? c.accent : 'transparent',
                  color: activeTab === tab ? c.accent : c.muted,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-8">
            {activeTab === 'description' ? (
              <>
                <h2
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                >
                  About this product
                </h2>

                <p
                  className="mt-4 max-w-3xl text-sm leading-7"
                  style={{ color: c.muted }}
                >
                  {description}
                </p>
              </>
            ) : (
              <div className="max-w-2xl space-y-4">
                {[
                  ['Product', name],
                  ['Category', category || 'Not specified'],
                  ['Price', `₹${price.toLocaleString('en-IN')}`],
                  ['Product ID', String(product._id ?? product.id)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-wrap justify-between gap-3 border-b pb-3 text-sm"
                    style={{ borderColor: c.border }}
                  >
                    <span style={{ color: c.muted }}>{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section
          className="mt-8 rounded-2xl border p-5 sm:p-8"
          style={{
            backgroundColor: c.card,
            borderColor: c.border,
          }}
        >
          <h2
            className="text-2xl font-bold"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Customer Reviews
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold">{averageRating}</span>

            <div>
              <p className="text-lg" style={{ color: '#F59E0B' }}>
                {'★'.repeat(Math.round(Number(averageRating)))}
                {'☆'.repeat(5 - Math.round(Number(averageRating)))}
              </p>

              <p className="text-xs" style={{ color: c.muted }}>
                Based on {reviews.length}{' '}
                {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>

          <div
            className="mt-6 border-t pt-6"
            style={{ borderColor: c.border }}
          >
            <h3 className="text-lg font-semibold">Write a Review</h3>

            {!isAuthenticated && (
              <p className="mt-2 text-sm" style={{ color: c.muted }}>
                Please log in to submit a review.
                {' '}
                <Link
                  to="/login"
                  className="font-semibold underline"
                  style={{ color: c.accent }}
                >
                  Login
                </Link>
              </p>
            )}

            <p className="mt-4 text-sm" style={{ color: c.muted }}>
              Select your rating
            </p>

            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} out of 5`}
                  aria-pressed={rating === star}
                  className="text-3xl transition hover:scale-110"
                  style={{
                    color:
                      star <= rating ? '#F59E0B' : c.border,
                  }}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience with this product..."
              maxLength={500}
              rows={4}
              className="mt-4 w-full rounded-xl border p-4 text-sm outline-none"
              style={{
                backgroundColor: c.page,
                color: c.text,
                borderColor: c.border,
              }}
            />

            <p
              className="mt-1 text-right text-xs"
              style={{ color: c.muted }}
            >
              {comment.length}/500
            </p>

            {reviewError && (
              <p role="alert" className="mt-3 text-sm text-red-500">
                {reviewError}
              </p>
            )}

            {reviewMessage && (
              <p
                role="status"
                className="mt-3 text-sm text-green-600"
              >
                {reviewMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmitReview}
              disabled={reviewLoading}
              className="mt-4 rounded-lg px-6 py-3 text-sm font-bold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: c.button,
                color: c.buttonText,
              }}
            >
              {reviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>

          <div
            className="mt-8 border-t pt-6"
            style={{ borderColor: c.border }}
          >
            <h3 className="text-lg font-semibold">
              What customers say
            </h3>

            {reviewsLoading ? (
              <p className="mt-4 text-sm" style={{ color: c.muted }}>
                Loading reviews...
              </p>
            ) : reviews.length === 0 ? (
              <p className="mt-4 text-sm" style={{ color: c.muted }}>
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              <div className="mt-5 space-y-5">
                {reviews.map((review) => {
                  const stars = Math.max(
                    0,
                    Math.min(5, Number(review.rating) || 0)
                  )

                  return (
                    <article
                      key={review._id ?? `${review.user?._id}-${review.createdAt}`}
                      className="border-b pb-5 last:border-b-0"
                      style={{ borderColor: c.border }}
                    >
                      <p className="font-semibold">
                        {review.user?.name ??
                          review.userName ??
                          'Customer'}
                      </p>

                      <p
                        className="mt-1 text-lg"
                        style={{ color: '#F59E0B' }}
                      >
                        {'★'.repeat(stars)}
                        {'☆'.repeat(5 - stars)}
                      </p>

                      <p
                        className="mt-2 whitespace-pre-wrap text-sm leading-6"
                        style={{ color: c.muted }}
                      >
                        {review.comment}
                      </p>

                      {review.createdAt && (
                        <p
                          className="mt-2 text-xs"
                          style={{ color: c.muted }}
                        >
                          {new Date(
                            review.createdAt
                          ).toLocaleDateString('en-IN')}
                        </p>
                      )}
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <div className="mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            style={{ color: c.accent }}
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails