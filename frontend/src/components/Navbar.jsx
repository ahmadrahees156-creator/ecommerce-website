import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/90">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center gap-4">

          <Link
            to="/"
            className="text-2xl font-black tracking-tight whitespace-nowrap"
          >
            <span className="text-blue-600">Shop</span>
            <span className="dark:text-white">Kart</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition"
            >
              Products
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 pr-12 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">
                🔍
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="hidden sm:block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hidden sm:block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Register
            </Link>

            <button
              onClick={toggleTheme}
              className="h-10 w-10 rounded-full border border-slate-200 bg-slate-100 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <Link
              to="/cart"
              className="relative h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 transition"
              aria-label="Cart"
            >
              🛒
            </Link>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar