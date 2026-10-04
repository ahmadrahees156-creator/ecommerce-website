
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productApi'

import laptop from '../assets/laptop.jpg'
import headphones from '../assets/headphones.jpg'
import smartwatch from '../assets/smartwatch.jpg'

function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getProducts()

        const formattedProducts = data.map((product) => ({
          ...product,
          id: product._id,
          price: String(product.price),
          image:
            product.imageUrl ||
            (product.category === 'audio-headphones'
              ? headphones
              : product.category === 'smartwatches-wearables'
                ? smartwatch
                : laptop),
        }))

        setProducts(formattedProducts)
      } catch (err) {
        setError('Unable to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = [
    { label: 'All Products', value: 'all' },
    { label: 'Laptops & Computers', value: 'laptops-computers' },
    { label: 'Audio & Headphones', value: 'audio-headphones' },
    { label: 'Smartwatches & Wearables', value: 'smartwatches-wearables' },
    { label: 'Mobiles & Tablets', value: 'mobiles-tablets' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Cameras & Accessories', value: 'cameras-accessories' },
  ]

  const filteredProducts = products
    .filter((product) => {
      const searchText = search.trim().toLowerCase()

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText)

      const matchesCategory =
        category === 'all' || product.category === category

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') {
        return Number(a.price) - Number(b.price)
      }

      if (sortBy === 'price-high') {
        return Number(b.price) - Number(a.price)
      }

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }

      return 0
    })

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setSortBy('default')
  }

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

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">
              🔍
            </span>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
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
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              {(search || category !== 'all' || sortBy !== 'default') && (
                <button
                  onClick={clearFilters}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Clear Filters
                </button>
              )}
            </div>

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
                  Products will appear here when they are available.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default Products