
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

        const categoryData =
          categoriesResponse?.data?.categories ??
          categoriesResponse?.data?.items ??
          categoriesResponse?.data ??
          categoriesResponse?.categories ??
          categoriesResponse?.items ??
          categoriesResponse ??
          []

        setProducts(Array.isArray(productData) ? productData : [])
        setCategories(Array.isArray(categoryData) ? categoryData : [])
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
      : category?.name ??
        category?.title ??
        category?.categoryName ??
        'Category'

  // Category-specific Unsplash images
  const getCategoryImage = (category, index) => {
    const name = getCategoryName(category).toLowerCase().trim()

    const categoryImages = [
      {
        keywords: ['bag', 'luggage', 'backpack', 'purse'],
        image:
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85',
      },
      {
        keywords: ['beauty', 'makeup', 'cosmetic', 'skincare'],
        image:
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85',
      },
      {
        keywords: ['camera', 'photography'],
        image:
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85',
      },
      {
        keywords: ['cloth', 'apparel', 'men', 'women', 'wear'],
        image:
          'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=85',
      },
      {
        keywords: ['computer', 'laptop', 'notebook', 'pc'],
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=85',
      },
      {
        keywords: ['electronic', 'gadget', 'headphone', 'audio'],
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85',
      },
      {
        keywords: ['fashion', 'style', 'accessor', 'watch', 'jewel'],
        image:
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85',
      },
      {
        keywords: ['home', 'living', 'decor', 'furniture', 'interior'],
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85',
      },
    ]

    const match = categoryImages.find(({ keywords }) =>
      keywords.some((keyword) => name.includes(keyword))
    )

    if (match) return match.image

    const fallbackImages = categoryImages.map(({ image }) => image)
    return fallbackImages[index % fallbackImages.length]
  }

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
            <p className={`mb-5 text-xs font-semibold uppercase tracking-[0.25em] ${theme.accent}`}>
              ShopKart · Better choices, brighter days
            </p>

            <h1 className="max-w-xl font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Find your next
              <span className={`mt-1 block ${theme.accent}`}>
                everyday favourite.
              </span>
            </h1>

            <p className={`mt-6 max-w-lg text-base leading-7 sm:text-lg ${theme.muted}`}>
              Thoughtfully selected products for your everyday life. Discover
              something worth bringing home.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 ${theme.button}`}
              >
                Explore Collection <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div
            className={`relative flex min-h-[300px] items-center justify-center overflow-hidden p-5 sm:min-h-[420px] sm:p-8 lg:min-h-[520px] ${
              darkMode ? 'bg-[#202720]' : 'bg-[#E8EDE2]'
            }`}
          >
            <div className="relative z-10 flex w-full max-w-[540px] items-center justify-center">
              <img
                src="/homepage.png"
                alt="ShopKart everyday essentials collection"
                className="h-auto max-h-[440px] w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categories.slice(0, 8).map((category, index) => {
              const name = getCategoryName(category)
              const image = getCategoryImage(category, index)

              return (
                <Link
                  key={category?._id ?? category?.id ?? name}
                  to={`/products?category=${encodeURIComponent(name)}`}
                  className={`group overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-xl ${theme.card} ${
                    darkMode
                      ? 'hover:border-[#D6B887]/60'
                      : 'hover:border-[#047857]/50'
                  }`}
                >
                  <div className={`relative h-36 overflow-hidden sm:h-48 ${theme.surface}`}>
                    <img
                      src={image}
                      alt={name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src =
                          'https://placehold.co/800x500/F1F0E8/173D30?text=' +
                          encodeURIComponent(name)
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                    <span className="absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      Explore →
                    </span>
                  </div>

                  <div className="p-3 sm:p-5">
                    <span className={`text-xs tracking-widest ${theme.muted}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="mt-2 break-words text-base font-semibold transition group-hover:translate-x-1 sm:text-lg">
                      {name}
                    </h3>
                  </div>
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
      <section
        className={`border-y py-14 sm:py-16 ${theme.border} ${
          darkMode ? 'bg-[#151515]' : 'bg-[#F1F0E8]'
        }`}
      >
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
                      darkMode
                        ? 'hover:border-[#D6B887]/40'
                        : 'hover:border-[#047857]/30'
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
              <Link
                to="/products"
                className={`mt-4 inline-block text-sm font-semibold ${theme.accent}`}
              >
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
              description:
                'Find products and browse categories without the clutter.',
            },
            {
              number: '02',
              title: 'A simpler journey',
              description:
                'Move from product details to your cart with ease.',
            },
            {
              number: '03',
              title: 'Your shopping, organised',
              description:
                'Keep your shopping experience together in one place.',
            },
          ].map((item) => (
            <div
              key={item.number}
              className={`rounded-2xl border p-6 sm:p-7 ${theme.card}`}
            >
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
