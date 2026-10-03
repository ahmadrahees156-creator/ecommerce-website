import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ id, name, description, price, image }) {
  const { addToCart } = useCart()

  const product = {
    id,
    name,
    description,
    price,
    image,
  }

  return (
    <div className="border rounded-lg p-4">
      <img
        src={image}
        alt={name}
        style={{
          width: '120px',
          height: '120px',
          objectFit: 'contain',
        }}
        className="mb-4"
      />

      <h2 className="text-xl font-semibold">
        {name}
      </h2>

      <p className="text-gray-600 mt-2">
        {description}
      </p>

      <p className="text-lg font-bold mt-3">
        ₹{price}
      </p>

      <Link
        to={`/products/${id}`}
        className="block mt-4 w-full bg-black text-white py-2 rounded-md text-center"
      >
        View Details
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="mt-2 w-full border py-2 rounded-md"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard