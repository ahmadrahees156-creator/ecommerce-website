import { useState } from 'react'
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
  const [added, setAdded] = useState(false)

  const product = { id, name, description, price, image }

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

      <Link
        to={`/products/${id}`}
        className="flex h-56 items-center justify-center bg-slate-100 p-6 dark:bg-slate-800 sm:h-64"
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {name}
        </h2>

        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            ₹{Number(price).toLocaleString('en-IN')}
          </p>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/50 dark:text-green-400">
            In Stock
          </span>
        </div>

        {added && (
          <p
            role="status"
            className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400"
          >
            ✓ {name} added to cart successfully!
          </p>
        )}

        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <Link
            to={`/products/${id}`}
            className="rounded-xl border border-slate-300 px-3 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            View Details
          </Link>

          <button
            onClick={handleAddToCart}
            className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200'
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
