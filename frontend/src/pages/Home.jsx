import { Link } from 'react-router-dom'
import laptop from '../assets/laptop.jpg'
import headphones from '../assets/headphones.jpg'
import smartwatch from '../assets/smartwatch.jpg'

function Home() {
  const categories = [
    {
      name: 'Electronics',
      icon: '💻',
      description: 'Laptops, gadgets and more',
    },
    {
      name: 'Audio',
      icon: '🎧',
      description: 'Headphones and speakers',
    },
    {
      name: 'Wearables',
      icon: '⌚',
      description: 'Smart watches and fitness',
    },
    {
      name: 'Accessories',
      icon: '🎒',
      description: 'Useful everyday products',
    },
  ]

  const featuredProducts = [
    {
      id: '1',
      name: 'Laptop',
      description: 'Powerful laptop for everyday use',
      price: '59,999',
      image: laptop,
    },
    {
      id: '2',
      name: 'Headphones',
      description: 'Wireless headphones with clear sound',
      price: '1,999',
      image: headphones,
    },
    {
      id: '3',
      name: 'Smart Watch',
      description: 'Smart watch with fitness tracking',
      price: '2,999',
      image: smartwatch,
    },
  ]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Hero Content */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm dark:border-blue-900 dark:bg-slate-900 dark:text-blue-400">
                <span>✨</span>
                Welcome to ShopKart
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find what you need.
                <span className="block text-blue-600">
                  Shop with ease.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                Explore quality products, discover great deals and enjoy a
                simple shopping experience made for you.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/products"
                  className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Shop Now →
                </Link>

                <Link
                  to="/products"
                  className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Explore Products
                </Link>

              </div>

              {/* Trust Points */}
              <div className="mt-9 flex flex-wrap gap-6 text-sm">

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/50">
                    ✓
                  </span>
                  Quality Products
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/50">
                    ✓
                  </span>
                  Secure Shopping
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/50">
                    ✓
                  </span>
                  Easy Checkout
                </div>

              </div>

            </div>

            {/* Hero Product */}
            <div className="relative">

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-7">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Featured Product
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Premium Laptop
                    </h2>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-950/50 dark:text-green-400">
                    In Stock
                  </span>

                </div>

                <div className="mt-6 flex h-72 items-center justify-center rounded-2xl bg-slate-100 p-8 dark:bg-slate-800 sm:h-80">

                  <img
                    src={laptop}
                    alt="Laptop"
                    className="h-full w-full object-contain transition duration-300 hover:scale-105"
                  />

                </div>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Starting from
                    </p>

                    <p className="mt-1 text-2xl font-black">
                      ₹59,999
                    </p>
                  </div>

                  <Link
                    to="/products/1"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Categories */}
      <section className="py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-9">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Shop by Category
            </h2>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Browse products based on what you're looking for.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((category) => (
              <Link
                to="/products"
                key={category.name}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl dark:bg-blue-950/40">
                  {category.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold transition group-hover:text-blue-600">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {category.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-600">
                  Explore →
                </p>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* Featured Products */}
      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900/40">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-9 flex items-end justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Popular Picks
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Featured Products
              </h2>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Take a look at some of our popular products.
              </p>

            </div>

            <Link
              to="/products"
              className="hidden font-semibold text-blue-600 hover:text-blue-700 sm:block"
            >
              View All →
            </Link>

          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >

                <div className="flex h-60 items-center justify-center bg-slate-100 p-8 dark:bg-slate-800">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />

                </div>

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <p className="text-xl font-bold">
                      ₹{product.price}
                    </p>

                    <Link
                      to={`/products/${product.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Product
                    </Link>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Why Shop With Us */}
      <section className="py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-9 text-center">

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Promise
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Why Shop With Us?
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl dark:bg-blue-950/40">
                🚚
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Fast Delivery
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Get your products delivered quickly and safely.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl dark:bg-blue-950/40">
                🔒
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Secure Shopping
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Shop confidently with a secure shopping experience.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl dark:bg-blue-950/40">
                💬
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Customer Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Get help whenever you need it.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="pb-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl bg-blue-600 px-6 py-12 text-center text-white shadow-xl sm:px-12">

            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to find your next product?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Explore our collection and start shopping today.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50"
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