import { useState } from 'react'
import ProductCard from '../components/ProductCard'

import laptop from '../assets/laptop.jpg'
import headphones from '../assets/headphones.jpg'
import smartwatch from '../assets/smartwatch.jpg'

function Products() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const products = [
    {
      id: '1',
      name: 'Laptop',
      description: 'Powerful laptop for everyday use',
      price: '59999',
      image: laptop,
    },
    {
      id: '2',
      name: 'Headphones',
      description: 'Wireless headphones with clear sound',
      price: '1999',
      image: headphones,
    },
    {
      id: '3',
      name: 'Smart Watch',
      description: 'Smart watch with fitness tracking',
      price: '2999',
      image: smartwatch,
    },
  ]

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Products
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Explore our latest products and find what you need.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 pr-12 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">
              🔍
            </span>
          </div>
        </div>

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Loading products...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  No products found
                </p>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Try searching with a different product name.
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  )
}

export default Products