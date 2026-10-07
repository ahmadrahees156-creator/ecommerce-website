import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { darkMode, toggleTheme } = useTheme()
  const { cart } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const cartCount = cart.reduce((total, product) => total + product.quantity, 0)

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        darkMode
          ? 'border-[#262626] bg-[#050505]/95'
          : 'border-[#E5E7EB] bg-[#F7F8F6]/95'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3 sm:gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className={`whitespace-nowrap text-2xl font-black tracking-tight ${
              darkMode ? 'text-[#F5F5F5]' : 'text-[#171717]'
            }`}
          >
            <span className={darkMode ? 'text-[#22C55E]' : 'text-[#15803D]'}>
              Shop
            </span>
            Kart
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              to="/"
              className={`transition ${
                darkMode
                  ? 'text-[#A3A3A3] hover:text-[#22C55E]'
                  : 'text-[#525252] hover:text-[#15803D]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`transition ${
                darkMode
                  ? 'text-[#A3A3A3] hover:text-[#22C55E]'
                  : 'text-[#525252] hover:text-[#15803D]'
              }`}
            >
              Products
            </Link>

            {isAuthenticated && (
              <Link
                to="/wishlist"
                className={`transition ${
                  darkMode
                    ? 'text-[#A3A3A3] hover:text-[#22C55E]'
                    : 'text-[#525252] hover:text-[#15803D]'
                }`}
              >
                Wishlist
              </Link>
            )}

            {isAuthenticated && (
              <Link
                to="/orders"
                className={`transition ${
                  darkMode
                    ? 'text-[#A3A3A3] hover:text-[#22C55E]'
                    : 'text-[#525252] hover:text-[#15803D]'
                }`}
              >
                Orders
              </Link>
            )}
          </div>

          <div className="min-w-0 max-w-2xl flex-1 md:mx-auto">
            <Link to="/products" className="block">
              <div className="relative">
                <input
                  readOnly
                  type="text"
                  placeholder="Search for products..."
                  className={`w-full cursor-pointer rounded-full border px-3 py-2.5 pr-9 text-sm outline-none sm:px-5 sm:pr-12 ${
                    darkMode
                      ? 'border-[#262626] bg-[#111111] text-[#F5F5F5] placeholder:text-[#737373]'
                      : 'border-[#E5E7EB] bg-white text-[#171717] placeholder:text-[#737373]'
                  }`}
                />

                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-lg sm:right-4 ${
                    darkMode ? 'text-[#22C55E]' : 'text-[#15803D]'
                  }`}
                >
                  🔍
                </span>
              </div>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {isAuthenticated ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span
                  className={`max-w-28 truncate text-sm ${
                    darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'
                  }`}
                >
                  Hi, {user?.name || 'User'}
                </span>

                <button
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    darkMode
                      ? 'border-[#262626] text-[#F5F5F5] hover:bg-[#111111]'
                      : 'border-[#E5E7EB] text-[#171717] hover:bg-white'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`hidden px-3 py-2 text-sm font-medium sm:block ${
                    darkMode
                      ? 'text-[#F5F5F5] hover:text-[#22C55E]'
                      : 'text-[#171717] hover:text-[#15803D]'
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className={`hidden rounded-lg px-4 py-2 text-sm font-semibold text-white sm:block ${
                    darkMode
                      ? 'bg-[#22C55E] hover:bg-[#16A34A]'
                      : 'bg-[#15803D] hover:bg-[#166534]'
                  }`}
                >
                  Register
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className={`h-10 w-10 shrink-0 rounded-full border transition ${
                darkMode
                  ? 'border-[#262626] bg-[#111111] hover:border-[#22C55E]'
                  : 'border-[#E5E7EB] bg-white hover:border-[#15803D]'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <Link
              to="/cart"
              onClick={closeMenu}
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
                darkMode
                  ? 'border-[#262626] bg-[#111111] hover:border-[#22C55E]'
                  : 'border-[#E5E7EB] bg-white hover:border-[#15803D]'
              }`}
              aria-label={`Cart, ${cartCount} items`}
            >
              <span className="text-lg">🛒</span>

              {cartCount > 0 && (
                <span
                  className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold text-white ${
                    darkMode ? 'bg-[#16A34A]' : 'bg-[#15803D]'
                  }`}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xl md:hidden ${
                darkMode
                  ? 'border-[#262626] bg-[#111111]'
                  : 'border-[#E5E7EB] bg-white'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className={`border-t py-3 md:hidden ${
              darkMode ? 'border-[#262626]' : 'border-[#E5E7EB]'
            }`}
          >
            <div className="flex flex-col gap-1 text-sm font-medium">
              <Link
                to="/"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 ${
                  darkMode ? 'hover:bg-[#111111]' : 'hover:bg-white'
                }`}
              >
                🏠 Home
              </Link>

              <Link
                to="/products"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 ${
                  darkMode ? 'hover:bg-[#111111]' : 'hover:bg-white'
                }`}
              >
                🛍️ Products
              </Link>

              {isAuthenticated && (
                <Link
                  to="/wishlist"
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 ${
                    darkMode ? 'hover:bg-[#111111]' : 'hover:bg-white'
                  }`}
                >
                  ❤️ Wishlist
                </Link>
              )}

              {isAuthenticated && (
                <Link
                  to="/orders"
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 ${
                    darkMode ? 'hover:bg-[#111111]' : 'hover:bg-white'
                  }`}
                >
                  📦 My Orders
                </Link>
              )}

              <Link
                to="/cart"
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 ${
                  darkMode ? 'hover:bg-[#111111]' : 'hover:bg-white'
                }`}
              >
                🛒 Cart {cartCount > 0 ? `(${cartCount})` : ''}
              </Link>

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                  className={`rounded-lg px-4 py-3 text-left ${
                    darkMode ? 'hover:bg-[#111111]' : 'hover:bg-white'
                  }`}
                >
                  Logout ({user?.name || 'User'})
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={`rounded-lg px-4 py-3 ${
                      darkMode ? 'hover:bg-[#111111]' : 'hover:bg-white'
                    }`}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className={`rounded-lg px-4 py-3 ${
                      darkMode ? 'hover:bg-[#111111]' : 'hover:bg-white'
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar