import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({
  id,
  name,
  description,
  price,
  image,
}) {
  const { addToCart } = useCart()

  const product = {
    id,
    name,
    description,
    price,
    image,
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

      <div className="flex h-64 items-center justify-center bg-slate-100 p-6 dark:bg-slate-800">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {name}
        </h2>

        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            ₹{price}
          </p>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/50 dark:text-green-400">
            In Stock
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">

          <Link
            to={`/products/${id}`}
            className="rounded-xl border border-slate-300 px-3 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View Details
          </Link>

          <button
            onClick={() => addToCart(product)}
            className="rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  )
}

export default ProductCard