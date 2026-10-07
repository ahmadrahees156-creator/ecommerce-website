import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, getCategories } from '../services/productApi'
import { useTheme } from '../context/ThemeContext'

function Home() {
  const { darkMode } = useTheme()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true)
        setError('')

        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts({
            page: 1,
            limit: 6,
            sort: 'newest',
          }),
          getCategories(),
        ])

        setProducts(productsResponse?.data || [])
        setCategories(categoriesResponse || [])
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Unable to load products. Please make sure the backend is running.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadHomeData()
  }, [])

  const getProductImage = (imageUrl) => {
    if (imageUrl) {
      return imageUrl
    }

    return 'https://via.placeholder.com/600x400?text=No+Image'
  }

  const theme = {
    page: darkMode
      ? 'bg-[#050505] text-[#F5F5F5]'
      : 'bg-[#F7F8F6] text-[#171717]',

    card: darkMode
      ? 'border-[#262626] bg-[#111111]'
      : 'border-[#E5E7EB] bg-white',

    muted: darkMode
      ? 'text-[#A3A3A3]'
      : 'text-[#525252]',

    secondary: darkMode
      ? 'bg-[#111111]'
      : 'bg-white',

    soft: darkMode
      ? 'bg-[#0B0B0B]'
      : 'bg-[#F7F8F6]',

    border: darkMode
      ? 'border-[#262626]'
      : 'border-[#E5E7EB]',

    green: darkMode
      ? 'text-[#22C55E]'
      : 'text-[#15803D]',

    greenBg: darkMode
      ? 'bg-[#052E16]'
      : 'bg-[#DCFCE7]',

    greenButton: darkMode
      ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
      : 'bg-[#15803D] text-white hover:bg-[#166534]',
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${theme.page}`}
    >
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden border-b transition-colors duration-300 ${theme.border} ${
          darkMode ? 'bg-[#050505]' : 'bg-[#F7F8F6]'
        }`}
      >
        <div
          className={`absolute -right-40 -top-40 h-96 w-96 rounded-full blur-3xl ${
            darkMode ? 'bg-[#22C55E]/10' : 'bg-[#15803D]/8'
          }`}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm ${theme.card} ${theme.green}`}
              >
                <span>✨</span>
                Welcome to ShopKart
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find what you need.
                <span className={`block ${theme.green}`}>
                  Shop with ease.
                </span>
              </h1>

              <p
                className={`mt-6 max-w-xl text-lg leading-8 ${theme.muted}`}
              >
                Explore quality products, discover great deals and enjoy a
                simple shopping experience made for you.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className={`rounded-xl px-7 py-3.5 font-semibold shadow-lg transition hover:-translate-y-0.5 ${theme.greenButton}`}
                >
                  Shop Now →
                </Link>

                <Link
                  to="/products"
                  className={`rounded-xl border px-7 py-3.5 font-semibold transition ${
                    darkMode
                      ? 'border-[#262626] bg-[#111111] text-[#F5F5F5] hover:border-[#22C55E] hover:text-[#22C55E]'
                      : 'border-[#D1D5DB] bg-white text-[#171717] hover:border-[#15803D] hover:text-[#15803D]'
                  }`}
                >
                  Explore Products
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap gap-6 text-sm">
                <div className={`flex items-center gap-2 ${theme.muted}`}>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${theme.greenBg} ${theme.green}`}
                  >
                    ✓
                  </span>
                  Quality Products
                </div>

                <div className={`flex items-center gap-2 ${theme.muted}`}>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${theme.greenBg} ${theme.green}`}
                  >
                    ✓
                  </span>
                  Secure Shopping
                </div>

                <div className={`flex items-center gap-2 ${theme.muted}`}>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${theme.greenBg} ${theme.green}`}
                  >
                    ✓
                  </span>
                  Easy Checkout
                </div>
              </div>
            </div>

            {/* Database Product */}
            <div className="relative">
              {loading ? (
                <div
                  className={`flex h-96 items-center justify-center rounded-3xl border shadow-xl ${theme.card}`}
                >
                  <p className={theme.muted}>Loading products...</p>
                </div>
              ) : products.length > 0 ? (
                <div
                  className={`rounded-3xl border p-5 shadow-xl transition-colors duration-300 sm:p-7 ${theme.card}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider ${theme.muted}`}
                      >
                        Featured Product
                      </p>

                      <h2 className="mt-1 text-2xl font-bold">
                        {products[0].name}
                      </h2>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${theme.greenBg} ${theme.green}`}
                    >
                      {products[0].stock > 0
                        ? 'In Stock'
                        : 'Out of Stock'}
                    </span>
                  </div>

                  <div
                    className={`mt-6 flex h-72 items-center justify-center rounded-2xl p-8 sm:h-80 ${theme.soft}`}
                  >
                    <img
                      src={getProductImage(products[0].imageUrl)}
                      alt={products[0].name}
                      className="h-full w-full object-contain transition duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <p className={`text-sm ${theme.muted}`}>
                        Price
                      </p>

                      <p className="mt-1 text-2xl font-black">
                        ₹
                        {Number(products[0].price).toLocaleString(
                          'en-IN',
                        )}
                      </p>
                    </div>

                    <Link
                      to={`/products/${products[0]._id}`}
                      className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${theme.greenButton}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex h-96 items-center justify-center rounded-3xl border shadow-xl ${theme.card}`}
                >
                  <p className={theme.muted}>
                    No products available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9">
            <p
              className={`text-sm font-semibold uppercase tracking-wider ${theme.green}`}
            >
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Shop by Category
            </h2>

            <p className={`mt-2 ${theme.muted}`}>
              Browse products based on what you're looking for.
            </p>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  to={`/products?category=${encodeURIComponent(category)}`}
                  key={category}
                  className={`group rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${theme.card} ${
                    darkMode
                      ? 'hover:border-[#22C55E]/60'
                      : 'hover:border-[#15803D]/60'
                  }`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${theme.greenBg}`}
                  >
                    🛍️
                  </div>

                  <h3
                    className={`mt-5 text-lg font-bold transition ${darkMode ? 'group-hover:text-[#22C55E]' : 'group-hover:text-[#15803D]'}`}
                  >
                    {category}
                  </h3>

                  <p className={`mt-2 text-sm ${theme.muted}`}>
                    Explore products in this category.
                  </p>

                  <p className={`mt-4 text-sm font-semibold ${theme.green}`}>
                    Explore →
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className={theme.muted}>
              No categories available.
            </p>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section
        className={`border-y py-16 transition-colors duration-300 ${theme.border} ${theme.secondary}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <p
                className={`text-sm font-semibold uppercase tracking-wider ${theme.green}`}
              >
                Popular Picks
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Featured Products
              </h2>

              <p className={`mt-2 ${theme.muted}`}>
                Take a look at some of our latest products.
              </p>
            </div>

            <Link
              to="/products"
              className={`hidden font-semibold sm:block ${theme.green}`}
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className={`py-12 text-center ${theme.muted}`}>
              Loading products...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-300 bg-red-50 p-6 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className={`py-12 text-center ${theme.muted}`}>
              No products available.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <div
                  key={product._id}
                  className={`group overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.card}`}
                >
                  <Link
                    to={`/products/${product._id}`}
                    className={`flex h-60 items-center justify-center p-8 ${theme.soft}`}
                  >
                    <img
                      src={getProductImage(product.imageUrl)}
                      alt={product.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="p-5">
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${theme.green}`}
                    >
                      {product.category}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      {product.name}
                    </h3>

                    <p
                      className={`mt-2 line-clamp-2 text-sm leading-6 ${theme.muted}`}
                    >
                      {product.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <p className="text-xl font-bold">
                        ₹
                        {Number(product.price).toLocaleString(
                          'en-IN',
                        )}
                      </p>

                      <Link
                        to={`/products/${product._id}`}
                        className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${theme.greenButton}`}
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 text-center">
            <p
              className={`text-sm font-semibold uppercase tracking-wider ${theme.green}`}
            >
              Our Promise
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Why Shop With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div
              className={`rounded-2xl border p-7 text-center shadow-sm ${theme.card}`}
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${theme.greenBg}`}
              >
                🚚
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Fast Delivery
              </h3>

              <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>
                Get your products delivered quickly and safely.
              </p>
            </div>

            <div
              className={`rounded-2xl border p-7 text-center shadow-sm ${theme.card}`}
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${theme.greenBg}`}
              >
                🔒
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Secure Shopping
              </h3>

              <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>
                Shop confidently with a secure shopping experience.
              </p>
            </div>

            <div
              className={`rounded-2xl border p-7 text-center shadow-sm ${theme.card}`}
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${theme.greenBg}`}
              >
                💬
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Customer Support
              </h3>

              <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>
                Get help whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl border px-6 py-12 text-center shadow-xl sm:px-12 ${
              darkMode
                ? 'border-[#166534] bg-[#0B3D20]'
                : 'border-[#15803D] bg-[#15803D]'
            } text-white`}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to find your next product?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-green-100">
              Explore our collection and start shopping today.
            </p>

            <Link
              to="/products"
              className={`mt-7 inline-block rounded-xl px-7 py-3.5 font-semibold transition ${
                darkMode
                  ? 'bg-white text-[#15803D] hover:bg-[#F0FDF4]'
                  : 'bg-white text-[#15803D] hover:bg-[#F0FDF4]'
              }`}
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home