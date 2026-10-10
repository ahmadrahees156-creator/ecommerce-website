
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../services/productApi'
import { useTheme } from '../context/ThemeContext'

const formatPrice = (price) =>
  `₹${Number(price || 0).toLocaleString('en-IN')}`

function Products() {
  const { darkMode } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBrands, setSelectedBrands] = useState([])
  const [maxPrice, setMaxPrice] = useState(100000)
  const [sort, setSort] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const c = darkMode
    ? {
        page: '#101010',
        card: '#1A1A1A',
        image: '#222222',
        text: '#F5F5F5',
        muted: '#B5B5B5',
        border: '#383838',
        accent: '#D6B887',
        accentText: '#171717',
        button: '#E5E2DC',
        buttonText: '#171717',
        soft: '#242424',
      }
    : {
        page: '#F8F5EC',
        card: '#FFFFFF',
        image: '#F0F2EB',
        text: '#173D30',
        muted: '#68786D',
        border: '#E4E9DF',
        accent: '#064E3B',
        accentText: '#FFFFFF',
        button: '#064E3B',
        buttonText: '#FFFFFF',
        soft: '#EAF0E7',
      }

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
  }, [searchParams])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError('')

        const [productResponse, categoryResponse] = await Promise.all([
          getProducts({ page: 1, limit: 100 }),
          getCategories(),
        ])

        const productData = productResponse?.data ?? productResponse
        const categoryData = categoryResponse?.data ?? categoryResponse

        setProducts(
          Array.isArray(productData)
            ? productData
            : productData?.products ?? productData?.items ?? []
        )

        setCategories(
          Array.isArray(categoryData)
            ? categoryData
            : categoryData?.categories ?? categoryData?.items ?? []
        )
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Products could not be loaded. Please check your connection.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const categoryName = (category) => {
    if (typeof category === 'string') return category
    return category?.name ?? category?.title ?? category?.categoryName ?? ''
  }

  const getProductName = (product) =>
    product.name ?? product.title ?? 'Unnamed product'

  const getProductPrice = (product) =>
    Number(product.price ?? 0)

  const getProductImage = (product) =>
    product.imageUrl ?? product.image ?? product.images?.[0] ?? ''

  const getBrand = (product) =>
    product.brand?.name ?? product.brand ?? product.manufacturer ?? ''

  const brands = useMemo(() => {
    return [...new Set(products.map(getBrand).filter(Boolean))].sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const name = getProductName(product).toLowerCase()
      const description = (product.description ?? '').toLowerCase()
      const query = search.trim().toLowerCase()

      const matchesSearch =
        !query || name.includes(query) || description.includes(query)

      const productCategory =
        typeof product.category === 'object'
          ? categoryName(product.category)
          : product.category ?? ''

      const matchesCategory =
        selectedCategory === 'All' ||
        productCategory.toLowerCase() ===
          categoryName(selectedCategory).toLowerCase()

      const matchesPrice = getProductPrice(product) <= maxPrice

      const brand = getBrand(product)
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(brand)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesBrand
      )
    })

    if (sort === 'price-asc') {
      result.sort((a, b) => getProductPrice(a) - getProductPrice(b))
    } else if (sort === 'price-desc') {
      result.sort((a, b) => getProductPrice(b) - getProductPrice(a))
    } else if (sort === 'name-asc') {
      result.sort((a, b) =>
        getProductName(a).localeCompare(getProductName(b))
      )
    } else if (sort === 'newest') {
      result.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      )
    }

    return result
  }, [products, search, selectedCategory, maxPrice, selectedBrands, sort])

  const updateSearch = (value) => {
    setSearch(value)

    const nextParams = new URLSearchParams(searchParams)

    if (value.trim()) {
      nextParams.set('search', value)
    } else {
      nextParams.delete('search')
    }

    setSearchParams(nextParams, { replace: true })
  }

  const toggleBrand = (brand) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    )
  }

  const resetFilters = () => {
    setSelectedCategory('All')
    setSelectedBrands([])
    setMaxPrice(100000)
    setSort('popular')
    updateSearch('')
  }

  const FilterSidebar = () => (
    <aside
      className="h-fit rounded-xl border p-4 sm:p-5"
      style={{ backgroundColor: c.card, borderColor: c.border }}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Filters</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-semibold underline underline-offset-4"
          style={{ color: c.accent }}
        >
          Clear all
        </button>
      </div>

      <div className="border-b pb-5" style={{ borderColor: c.border }}>
        <h3 className="mb-3 text-sm font-bold">Categories</h3>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm"
            style={{
              backgroundColor:
                selectedCategory === 'All' ? c.accent : 'transparent',
              color: selectedCategory === 'All' ? c.accentText : c.text,
            }}
          >
            <span>All Categories</span>
            {selectedCategory === 'All' && <span>✓</span>}
          </button>

          {categories.map((category, index) => {
            const name = categoryName(category)
            const active = categoryName(selectedCategory) === name &&
              selectedCategory !== 'All'

            return (
              <button
                type="button"
                key={category._id ?? category.id ?? name ?? index}
                onClick={() => setSelectedCategory(category)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition"
                style={{
                  backgroundColor: active ? c.accent : 'transparent',
                  color: active ? c.accentText : c.muted,
                }}
              >
                <span>{name}</span>
                {active && <span>✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="border-b py-5" style={{ borderColor: c.border }}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold">Price Range</h3>
          <span className="text-xs" style={{ color: c.muted }}>
            {formatPrice(maxPrice)}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum product price"
          className="w-full cursor-pointer accent-emerald-800"
        />

        <div className="mt-2 flex justify-between text-xs" style={{ color: c.muted }}>
          <span>₹0</span>
          <span>₹1,00,000</span>
        </div>
      </div>

      {brands.length > 0 && (
        <div className="border-b py-5" style={{ borderColor: c.border }}>
          <h3 className="mb-3 text-sm font-bold">Brand</h3>

          <div className="space-y-3">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-3 text-sm"
                style={{ color: c.muted }}
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 accent-emerald-800"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="pt-5">
        <h3 className="mb-3 text-sm font-bold">Quick Picks</h3>

        {[
          { label: 'Under ₹1,000', price: 1000 },
          { label: 'Under ₹5,000', price: 5000 },
          { label: 'Under ₹10,000', price: 10000 },
          { label: 'Under ₹25,000', price: 25000 },
        ].map((item) => (
          <button
            type="button"
            key={item.price}
            onClick={() => setMaxPrice(item.price)}
            className="mr-2 mb-2 rounded-full border px-3 py-2 text-xs transition"
            style={{
              borderColor: c.border,
              color: c.text,
              backgroundColor: maxPrice === item.price ? c.soft : 'transparent',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  )

  return (
    <main
      className="min-h-screen px-3 py-5 transition-colors duration-300 sm:px-6 sm:py-8 lg:px-10"
      style={{ backgroundColor: c.page, color: c.text }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          className="mb-5 flex flex-wrap items-center gap-2 text-xs"
          style={{ color: c.muted }}
        >
          <Link to="/home" className="hover:underline">Home</Link>
          <span>/</span>
          <span style={{ color: c.accent }}>Shop</span>
        </div>

        <section
          className="relative mb-7 overflow-hidden rounded-2xl p-6 sm:p-10 lg:p-12"
          style={{
            background: darkMode
              ? 'linear-gradient(115deg, #20231F, #30352C 60%, #27231D)'
              : 'linear-gradient(115deg, #DDEADF, #F0F2E5 60%, #D6E6D8)',
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <p
              className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] sm:text-xs"
              style={{ color: c.accent }}
            >
              SHOPKART · BETTER CHOICES, BRIGHTER DAYS
            </p>

            <h1
              className="max-w-xl text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: darkMode ? '#F5F5F5' : '#173D30',
              }}
            >
              Find your next
              <br />
              everyday favourite.
            </h1>

            <p
              className="mt-4 max-w-md text-sm leading-6 sm:text-base"
              style={{ color: c.muted }}
            >
              Thoughtfully selected products for your everyday life.
              Discover something worth bringing home.
            </p>

            <a
              href="#product-list"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{ backgroundColor: c.button, color: c.buttonText }}
            >
              Explore Collection <span>→</span>
            </a>
          </div>

          <div
            className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[35px] opacity-30 sm:right-10 sm:top-0 sm:h-80 sm:w-80"
            style={{ borderColor: darkMode ? '#D6B887' : '#60977B' }}
          />

          <div
            className="pointer-events-none absolute bottom-0 right-12 hidden text-8xl opacity-30 lg:block"
            aria-hidden="true"
          >
            ✳
          </div>
        </section>

        <section className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['♧', 'Quality Picks', 'Made for everyday'],
            ['↗', 'Great Finds', 'Explore more'],
            ['♡', 'Customer Favourites', 'Loved by shoppers'],
            ['✓', 'Easy Shopping', 'A smoother experience'],
          ].map(([icon, title, subtitle]) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-xl border p-3 sm:p-4"
              style={{ backgroundColor: c.card, borderColor: c.border }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg"
                style={{ backgroundColor: c.soft, color: c.accent }}
              >
                {icon}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold sm:text-sm">{title}</p>
                <p className="mt-1 truncate text-[10px] sm:text-xs" style={{ color: c.muted }}>
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </section>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ color: c.accent }}
            >
              CURATED FOR YOU
            </p>
            <h2
              className="text-3xl font-bold sm:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Shop the collection
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-lg border px-4 py-2.5 text-sm font-semibold lg:hidden"
            style={{ borderColor: c.border, backgroundColor: c.card }}
          >
            ☷ {showFilters ? 'Hide Filters' : 'Filters'}
          </button>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar />
          </div>

          <section id="product-list" className="min-w-0">
            <div
              className="mb-5 rounded-xl border p-3 sm:p-4"
              style={{ backgroundColor: c.card, borderColor: c.border }}
            >
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px]">
                <label className="relative block">
                  <span className="sr-only">Search products</span>
                  <span
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: c.muted }}
                  >
                    ⌕
                  </span>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => updateSearch(e.target.value)}
                    placeholder="Search products, brands..."
                    className="w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none focus:ring-2"
                    style={{
                      backgroundColor: c.page,
                      color: c.text,
                      borderColor: c.border,
                    }}
                  />
                </label>

                <label className="flex items-center gap-2">
                  <span className="shrink-0 text-xs" style={{ color: c.muted }}>
                    Sort by
                  </span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border px-3 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: c.page,
                      color: c.text,
                      borderColor: c.border,
                    }}
                  >
                    <option value="popular">Recommended</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold">Featured Products</h3>
                <p className="mt-1 text-xs" style={{ color: c.muted }}>
                  {loading ? 'Loading your collection...' : `${filteredProducts.length} products found`}
                </p>
              </div>

              {(search || selectedCategory !== 'All' || selectedBrands.length > 0 || maxPrice < 100000) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold underline underline-offset-4"
                  style={{ color: c.accent }}
                >
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse overflow-hidden rounded-xl border"
                    style={{ backgroundColor: c.card, borderColor: c.border }}
                  >
                    <div className="aspect-square" style={{ backgroundColor: c.soft }} />
                    <div className="space-y-3 p-4">
                      <div className="h-3 rounded" style={{ backgroundColor: c.soft }} />
                      <div className="h-3 w-2/3 rounded" style={{ backgroundColor: c.soft }} />
                      <div className="h-8 rounded" style={{ backgroundColor: c.soft }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                className="rounded-xl border p-8 text-center"
                style={{ backgroundColor: c.card, borderColor: c.border }}
              >
                <p className="font-semibold">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold"
                  style={{ backgroundColor: c.button, color: c.buttonText }}
                >
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div
                className="rounded-xl border px-5 py-16 text-center"
                style={{ backgroundColor: c.card, borderColor: c.border }}
              >
                <div className="mb-3 text-4xl" aria-hidden="true">⌕</div>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  No products found
                </h3>
                <p className="mt-2 text-sm" style={{ color: c.muted }}>
                  Try another search term or clear your filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg px-5 py-3 text-sm font-semibold"
                  style={{ backgroundColor: c.button, color: c.buttonText }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
                {filteredProducts.map((product) => {
                  const id = product._id ?? product.id
                  const name = getProductName(product)
                  const image = getProductImage(product)
                  const category =
                    typeof product.category === 'object'
                      ? categoryName(product.category)
                      : product.category ?? 'Featured'

                  return (
                    <Link
                      key={id}
                      to={`/products/${id}`}
                      className="group min-w-0 overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      style={{
                        backgroundColor: c.card,
                        borderColor: c.border,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = c.accent
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = c.border
                      }}
                    >
                      <div
                        className="relative aspect-square overflow-hidden p-3 sm:p-4"
                        style={{ backgroundColor: c.image }}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="flex h-full items-center justify-center text-xs"
                            style={{ color: c.muted }}
                          >
                            Image unavailable
                          </div>
                        )}

                        <span
                          className="absolute left-2 top-2 rounded-md px-2 py-1 text-[9px] font-semibold uppercase tracking-wide"
                          style={{
                            backgroundColor: c.card,
                            color: c.accent,
                          }}
                        >
                          {category || 'Featured'}
                        </span>

                        <span
                          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-lg opacity-0 shadow transition group-hover:opacity-100"
                          style={{ backgroundColor: c.card, color: c.accent }}
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </div>

                      <div className="p-3 sm:p-4">
                        <h3
                          className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 sm:text-base"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                        >
                          {name}
                        </h3>

                        <p className="mt-2 text-lg font-bold" style={{ color: c.accent }}>
                          {formatPrice(product.price)}
                        </p>

                        <div
                          className="mt-3 rounded-lg py-2.5 text-center text-xs font-semibold transition group-hover:opacity-90 sm:text-sm"
                          style={{
                            backgroundColor: c.button,
                            color: c.buttonText,
                          }}
                        >
                          View Product →
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
        </div>

        <section
          className="mt-10 flex flex-col justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8"
          style={{
            backgroundColor: darkMode ? '#202820' : '#E2EBDD',
          }}
        >
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: c.accent }}
            >
              A BETTER WAY TO SHOP
            </p>
            <h2
              className="mt-2 text-2xl font-bold sm:text-3xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Find something you love.
            </h2>
            <p className="mt-2 text-sm" style={{ color: c.muted }}>
              Explore our collection and discover your next favourite.
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="shrink-0 rounded-full px-5 py-3 text-sm font-semibold"
            style={{ backgroundColor: c.button, color: c.buttonText }}
          >
            Explore All Products →
          </button>
        </section>
      </div>
    </main>
  )
}

export default Products