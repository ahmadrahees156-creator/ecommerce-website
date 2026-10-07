import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts, getCategories } from '../services/productApi'
import laptop from '../assets/laptop.jpg'
import headphones from '../assets/headphones.jpg'
import smartwatch from '../assets/smartwatch.jpg'
import { useTheme } from '../context/ThemeContext'

const sortMap = {
  default: 'newest',
  'price-low': 'price_asc',
  'price-high': 'price_desc',
  name: 'name_asc',
}

function Products() {
  const { darkMode } = useTheme()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(Array.isArray(data) ? data : [])
      } catch {
        setCategories([])
      }
    }

    loadCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await getProducts({
          search: search.trim() || undefined,
          category: category !== 'all' ? category : undefined,
          sort: sortMap[sortBy],
          page,
          limit: 9,
        })

        const formattedProducts = (response.data || []).map(
          (product) => ({
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
          })
        )

        setProducts(formattedProducts)
        setTotal(response.total || 0)
        setTotalPages(response.totalPages || 1)
      } catch (err) {
        setProducts([])
        setTotal(0)
        setTotalPages(1)

        setError(
          err.response?.data?.message ||
            'Unable to load products. Please make sure the backend is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search, category, sortBy, page])

  const clearFilters = () => {
    setSearch('')
    setCategory('all')
    setSortBy('default')
    setPage(1)
  }

  const handleCategoryChange = (value) => {
    setCategory(value)
    setPage(1)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    setPage(1)
  }

  const card = darkMode
    ? 'border-[#262626] bg-[#111111]'
    : 'border-[#E5E7EB] bg-white'

  const muted = darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'

  const input = darkMode
    ? 'border-[#262626] bg-[#111111] text-[#F5F5F5] placeholder:text-[#737373] focus:border-[#22C55E]'
    : 'border-[#E5E7EB] bg-white text-[#171717] placeholder:text-[#737373] focus:border-[#15803D]'

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors sm:px-6 lg:px-8 ${
        darkMode
          ? 'bg-[#050505] text-[#F5F5F5]'
          : 'bg-[#F7F8F6] text-[#171717]'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Products
          </h1>

          <p className={`mt-2 ${muted}`}>
            Explore our latest products and find what you need.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className={`w-full rounded-xl border px-5 py-3 pr-12 outline-none transition focus:ring-4 focus:ring-[#22C55E]/10 ${input}`}
            />

            <span
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg ${
                darkMode ? 'text-[#22C55E]' : 'text-[#15803D]'
              }`}
            >
              🔍
            </span>
          </div>

          <select
            value={category}
            onChange={(e) =>
              handleCategoryChange(e.target.value)
            }
            className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#22C55E]/20 ${input}`}
          >
            <option value="all">All Products</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#22C55E]/20 ${input}`}
          >
            <option value="default">Sort: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {loading && (
          <div className={`rounded-xl border p-6 text-center ${card}`}>
            Loading products...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className={`text-sm ${muted}`}>
                Showing {products.length} of {total} products · Page{' '}
                {page} of {totalPages}
              </p>

              {(search ||
                category !== 'all' ||
                sortBy !== 'default') && (
                <button
                  onClick={clearFilters}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    darkMode
                      ? 'border-[#262626] hover:bg-[#111111]'
                      : 'border-[#E5E7EB] hover:bg-white'
                  }`}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>
            ) : (
              <div
                className={`rounded-2xl border p-10 text-center ${card}`}
              >
                <p className="text-lg font-semibold">
                  No products found
                </p>

                <p className={`mt-2 ${muted}`}>
                  Try another search or category.
                </p>

                <button
                  onClick={clearFilters}
                  className={`mt-5 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    darkMode
                      ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                      : 'bg-[#15803D] text-white hover:bg-[#166534]'
                  }`}
                >
                  Clear Filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className={`rounded-lg border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    darkMode
                      ? 'border-[#262626] hover:bg-[#111111]'
                      : 'border-[#E5E7EB] hover:bg-white'
                  }`}
                >
                  Previous
                </button>

                <span className={`text-sm ${muted}`}>
                  Page {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className={`rounded-lg border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    darkMode
                      ? 'border-[#262626] hover:bg-[#111111]'
                      : 'border-[#E5E7EB] hover:bg-white'
                  }`}
                >
                  Next
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