import { useParams, Link } from 'react-router-dom'

function ProductDetails() {
  const { id } = useParams()

  const products = {
    1: {
      name: 'Laptop',
      description: 'Powerful laptop for everyday use',
      price: '59999',
      image: '/src/assets/laptop.jpg',
    },
    2: {
      name: 'Headphones',
      description: 'Wireless headphones with clear sound',
      price: '1999',
      image: '/src/assets/headphones.jpg',
    },
    3: {
      name: 'Smart Watch',
      description: 'Smart watch with fitness tracking',
      price: '2999',
      image: '/src/assets/smartwatch.jpg',
    },
  }

  const product = products[id]

  if (!product) {
    return (
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

        <Link
          to="/products"
          className="inline-block mt-4 border px-4 py-2 rounded-md"
        >
          Back to Products
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/products"
          className="text-gray-600"
        >
          ← Back to Products
        </Link>

        <div className="mt-6 border rounded-lg p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-64 h-64 object-contain mx-auto"
          />

          <h1 className="text-3xl font-bold mt-6">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-3">
            {product.description}
          </p>

          <p className="text-2xl font-bold mt-4">
            ₹{product.price}
          </p>

          <button className="mt-6 w-full bg-black text-white py-3 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails