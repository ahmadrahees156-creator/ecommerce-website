import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { darkMode, toggleTheme } = useTheme()
  const { cart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/90">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3 sm:gap-4">

          <Link
            to="/"
            onClick={closeMenu}
            className="whitespace-nowrap text-2xl font-black tracking-tight"
          >
            <span className="text-blue-600">Shop</span>
            <span className="dark:text-white">Kart</span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              to="/"
              className="text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Products
            </Link>
          </div>

          <div className="min-w-0 max-w-2xl flex-1 md:mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-3 py-2.5 pr-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 sm:px-5 sm:pr-12"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg sm:right-4">
                🔍
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">

            <Link
              to="/login"
              onClick={closeMenu}
              className="hidden px-3 py-2 text-sm font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 sm:block"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 sm:block"
            >
              Register
            </Link>

            <button
              onClick={toggleTheme}
              className="h-10 w-10 shrink-0 rounded-full border border-slate-200 bg-slate-100 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              aria-label={`Cart, ${cartCount} items`}
            >
              <span className="text-lg">🛒</span>

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white ring-2 ring-white dark:ring-slate-950">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xl dark:border-slate-700 dark:bg-slate-900 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>

          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 py-3 dark:border-slate-800 md:hidden">
            <div className="flex flex-col gap-1 text-sm font-medium">

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                🏠 Home
              </Link>

              <Link
                to="/products"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                🛍️ Products
              </Link>

              <Link
                to="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span>🛒 Cart</span>

                {cartCount > 0 && (
                  <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Register
              </Link>

            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
