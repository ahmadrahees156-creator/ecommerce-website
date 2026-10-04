import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/productApi'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(false)
        setProduct(null)

        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: product._id || product.id,
      image: product.imageUrl || product.image,
    })

    setAdded(true)
  }

  if (loading) {
    return (
      <main className="min-h-screen p-6">
        <p className="text-center text-lg">Loading product...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          Unable to load this product. Please try again later.
        </p>

        <Link
          to="/products"
          className="inline-block mt-4 border px-4 py-2 rounded-md hover:bg-gray-100"
        >
          Back to Products
        </Link>
      </main>
    )
  }

  const image = product.imageUrl || product.image

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/products"
          className="text-gray-600 hover:text-black"
        >
          ← Back to Products
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-xl p-6 md:p-8">
          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
            <img
              src={image}
              alt={product.name}
              className="w-full max-w-sm h-72 object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold">
              {product.name}
            </h1>

            <p className="text-gray-600 mt-4 leading-7">
              {product.description}
            </p>

            <p className="text-2xl font-bold mt-5">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>

            {product.category && (
              <p className="mt-3 text-sm text-gray-500">
                Category: {product.category}
              </p>
            )}

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>

            {added && (
              <Link
                to="/cart"
                className="mt-3 text-center border py-3 rounded-md hover:bg-gray-100"
              >
                View Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails
