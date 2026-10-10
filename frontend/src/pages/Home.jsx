
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
    let active = true

    const loadHomeData = async () => {
      try {
        setLoading(true)
        setError('')

        const [productsResponse, categoriesResponse] = await Promise.all([
          getProducts({ page: 1, limit: 6, sort: 'newest' }),
          getCategories(),
        ])

        if (!active) return

        const productData =
          productsResponse?.data?.products ??
          productsResponse?.data?.items ??
          productsResponse?.data ??
          productsResponse?.products ??
          productsResponse?.items ??
          []

        setProducts(Array.isArray(productData) ? productData : [])
        setCategories(Array.isArray(categoriesResponse) ? categoriesResponse : [])
      } catch (err) {
        if (!active) return

        setError(
          err.response?.data?.message ||
            'Unable to load products. Please check the backend connection.'
        )
      } finally {
        if (active) setLoading(false)
      }
    }

    loadHomeData()

    return () => {
      active = false
    }
  }, [])

  const theme = {
    page: darkMode
      ? 'bg-[#101010] text-[#F5F5F5]'
      : 'bg-[#F8F5EC] text-[#173D30]',
    card: darkMode
      ? 'border-[#383838] bg-[#1A1A1A]'
      : 'border-[#E4E9DF] bg-white',
    muted: darkMode ? 'text-[#B5B5B5]' : 'text-[#68786D]',
    surface: darkMode ? 'bg-[#202020]' : 'bg-[#F1F0E8]',
    border: darkMode ? 'border-[#383838]' : 'border-[#E4E9DF]',
    accent: darkMode ? 'text-[#D6B887]' : 'text-[#047857]',
    button: darkMode
      ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
      : 'bg-[#064E3B] text-white hover:bg-[#047857]',
  }

  const getImage = (product) =>
    product?.imageUrl ||
    product?.image ||
    product?.images?.[0] ||
    'https://placehold.co/600x500/F1F0E8/173D30?text=ShopKart'

  const getId = (product) => product?._id ?? product?.id

  const getName = (product) =>
    product?.name ?? product?.title ?? 'Product'

  const getCategoryName = (category) =>
    typeof category === 'string'
      ? category
      : category?.name ?? category?.title ?? category?.categoryName ?? 'Category'

  const featuredProducts = products.slice(0, 6)

  return (
    <main className={`min-h-screen transition-colors duration-300 ${theme.page}`}>
      {/* Hero */}
      <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
        <div
          className={`relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border ${theme.border} ${
            darkMode ? 'bg-[#181B19]' : 'bg-[#E8EDE2]'
          } lg:grid-cols-2`}
        >
          <div className="relative z-10 flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <p
              className={`mb-5 text-xs font-semibold uppercase tracking-[0.25em] ${theme.accent}`}
            >
              Discover something special
            </p>

            <h1 className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Everyday essentials.
              <span className={`mt-1 block ${theme.accent}`}>
                Exceptional finds.
              </span>
            </h1>

            <p className={`mt-6 max-w-lg text-base leading-7 sm:text-lg ${theme.muted}`}>
              Find products you'll love, explore new favourites and enjoy a
              simpler way to shop with ShopKart.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className={`rounded-full px-7 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${theme.button}`}
              >
                Explore collection <span aria-hidden="true">↗</span>
              </Link>

              <Link
                to="/products"
                className={`rounded-full border px-7 py-3.5 text-sm font-semibold transition ${
                  darkMode
                    ? 'border-[#555B55] hover:border-[#D6B887]'
                    : 'border-[#C6D0C2] hover:border-[#047857]'
                }`}
              >
                Browse products
              </Link>
            </div>

            <div className={`mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm ${theme.muted}`}>
              <span>✓ Curated collection</span>
              <span>✓ Easy browsing</span>
              <span>✓ Simple checkout</span>
            </div>
          </div>

          <div className={`relative flex min-h-[330px] items-center justify-center p-6 sm:min-h-[430px] sm:p-10 lg:min-h-[570px] ${theme.surface}`}>
            <div
              className={`absolute h-64 w-64 rounded-full border sm:h-80 sm:w-80 ${
                darkMode ? 'border-[#D6B887]/20' : 'border-[#064E3B]/15'
              }`}
            />
            <div
              className={`absolute h-48 w-48 rounded-full sm:h-60 sm:w-60 ${
                darkMode ? 'bg-[#D6B887]/5' : 'bg-[#064E3B]/5'
              }`}
            />

            {loading ? (
              <div className={`relative z-10 text-sm ${theme.muted}`}>
                Discovering products...
              </div>
            ) : featuredProducts.length > 0 ? (
              <Link
                to={`/products/${getId(featuredProducts[0])}`}
                className={`relative z-10 w-full max-w-sm rounded-3xl border p-5 shadow-xl transition duration-300 hover:-translate-y-1 ${theme.card}`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.accent}`}>
                    Featured find
                  </span>
                  <span className={`text-xs ${theme.muted}`}>01 / 06</span>
                </div>

                <div className={`flex h-64 items-center justify-center rounded-2xl p-5 sm:h-72 ${theme.surface}`}>
                  <img
                    src={getImage(featuredProducts[0])}
                    alt={getName(featuredProducts[0])}
                    className="h-full w-full object-contain transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className={`text-xs ${theme.muted}`}>A favourite to explore</p>
                    <h2 className="mt-1 truncate text-lg font-semibold">
                      {getName(featuredProducts[0])}
                    </h2>
                  </div>

                  <span className={`shrink-0 text-lg font-semibold ${theme.accent}`}>
                    ₹{Number(featuredProducts[0].price ?? 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </Link>
            ) : (
              <div className={`relative z-10 max-w-xs text-center ${theme.muted}`}>
                Your next favourite find is waiting to be discovered.
                <Link to="/products" className={`mt-4 block font-semibold ${theme.accent}`}>
                  Browse products →
                </Link>
              </div>
            )}

            <span className={`absolute bottom-5 right-5 text-xs tracking-widest ${theme.muted}`}>
              SHOPKART · YOUR EVERYDAY EDIT
            </span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>
              Find your style
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Shop by category
            </h2>
            <p className={`mt-3 max-w-lg text-sm leading-6 ${theme.muted}`}>
              Start with a category and discover products picked for your needs.
            </p>
          </div>

          <Link
            to="/products"
            className={`hidden shrink-0 text-sm font-semibold sm:block ${theme.accent}`}
          >
            All products ↗
          </Link>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categories.slice(0, 8).map((category, index) => {
              const name = getCategoryName(category)

              return (
                <Link
                  key={category?._id ?? category?.id ?? name}
                  to={`/products?category=${encodeURIComponent(name)}`}
                  className={`group rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 sm:p-6 ${theme.card} ${
                    darkMode ? 'hover:border-[#D6B887]/60' : 'hover:border-[#047857]/50'
                  }`}
                >
                  <span className={`text-xs tracking-widest ${theme.muted}`}>
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 break-words text-base font-semibold sm:text-lg">
                    {name}
                  </h3>

                  <span className={`mt-3 inline-block text-sm transition group-hover:translate-x-1 ${theme.accent}`}>
                    Explore →
                  </span>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className={`rounded-2xl border p-6 text-sm ${theme.border} ${theme.muted}`}>
            Categories will appear here when available.
          </p>
        )}
      </section>

      {/* Products */}
      <section className={`border-y py-14 sm:py-16 ${theme.border} ${darkMode ? 'bg-[#151515]' : 'bg-[#F1F0E8]'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>
                The latest edit
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                Products to discover
              </h2>
              <p className={`mt-3 text-sm ${theme.muted}`}>
                Explore the latest additions to our collection.
              </p>
            </div>

            <Link
              to="/products"
              className={`hidden shrink-0 text-sm font-semibold sm:block ${theme.accent}`}
            >
              View all ↗
            </Link>
          </div>

          {error ? (
            <div className={`rounded-2xl border p-6 text-sm ${theme.card} ${theme.muted}`}>
              {error}
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className={`animate-pulse overflow-hidden rounded-2xl border p-3 sm:p-4 ${theme.card}`}
                >
                  <div className={`h-36 rounded-xl sm:h-52 ${theme.surface}`} />
                  <div className={`mt-4 h-4 w-3/4 rounded ${theme.surface}`} />
                  <div className={`mt-3 h-4 w-1/3 rounded ${theme.surface}`} />
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {featuredProducts.map((product) => {
                const id = getId(product)

                return (
                  <article
                    key={id}
                    className={`group overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.card} ${
                      darkMode ? 'hover:border-[#D6B887]/40' : 'hover:border-[#047857]/30'
                    }`}
                  >
                    <Link
                      to={`/products/${id}`}
                      className={`relative flex h-40 items-center justify-center p-4 sm:h-64 sm:p-7 ${theme.surface}`}
                    >
                      <img
                        src={getImage(product)}
                        alt={getName(product)}
                        loading="lazy"
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                      />
                    </Link>

                    <div className="p-3 sm:p-5">
                      <p className={`truncate text-xs ${theme.muted}`}>
                        {typeof product.category === 'string'
                          ? product.category
                          : getCategoryName(product.category)}
                      </p>

                      <Link to={`/products/${id}`}>
                        <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold sm:text-base">
                          {getName(product)}
                        </h3>
                      </Link>

                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-base font-semibold sm:text-lg">
                          ₹{Number(product.price ?? 0).toLocaleString('en-IN')}
                        </p>

                        <Link
                          to={`/products/${id}`}
                          className={`inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${theme.button}`}
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className={`rounded-2xl border p-8 text-center ${theme.card}`}>
              <p className={theme.muted}>No products are available right now.</p>
              <Link to="/products" className={`mt-4 inline-block text-sm font-semibold ${theme.accent}`}>
                Browse collection →
              </Link>
            </div>
          )}

          <Link
            to="/products"
            className={`mt-7 inline-block text-sm font-semibold sm:hidden ${theme.accent}`}
          >
            View all products →
          </Link>
        </div>
      </section>

      {/* Brand promise */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-9 text-center">
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>
            The ShopKart difference
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            A little more care in every detail.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {[
            {
              number: '01',
              title: 'Easy discovery',
              description: 'Find products and browse categories without the clutter.',
            },
            {
              number: '02',
              title: 'A simpler journey',
              description: 'Move from product details to your cart with ease.',
            },
            {
              number: '03',
              title: 'Your shopping, organised',
              description: 'Keep your shopping experience together in one place.',
            },
          ].map((item) => (
            <div key={item.number} className={`rounded-2xl border p-6 sm:p-7 ${theme.card}`}>
              <span className={`text-xs font-semibold tracking-[0.2em] ${theme.accent}`}>
                {item.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className={`mt-3 text-sm leading-6 ${theme.muted}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing banner */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-7xl rounded-[2rem] px-6 py-12 text-center sm:px-12 sm:py-16 ${
            darkMode ? 'bg-[#202720]' : 'bg-[#E8EDE2]'
          }`}
        >
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${theme.accent}`}>
            Your next find awaits
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-5xl">
            Good things are just a click away.
          </h2>

          <p className={`mx-auto mt-4 max-w-xl text-sm leading-6 ${theme.muted}`}>
            Explore the collection and find something that feels just right.
          </p>

          <Link
            to="/products"
            className={`mt-7 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 ${theme.button}`}
          >
            Start exploring ↗
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Home
