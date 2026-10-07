import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Footer() {
  const { darkMode } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const headingClass = `mb-3 text-base font-bold ${
    darkMode ? 'text-[#F5F5F5]' : 'text-[#171717]'
  }`

  const linkClass = `text-sm leading-6 transition hover:underline ${
    darkMode
      ? 'text-[#A3A3A3] hover:text-[#22C55E]'
      : 'text-[#525252] hover:text-[#15803D]'
  }`

  return (
    <footer
      className={`transition-colors duration-300 ${
        darkMode
          ? 'bg-[#050505] text-[#A3A3A3]'
          : 'bg-[#F7F8F6] text-[#525252]'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className={`w-full border-b py-4 text-center text-sm font-medium transition ${
          darkMode
            ? 'border-[#262626] bg-[#111111] text-[#F5F5F5] hover:bg-[#1A1A1A]'
            : 'border-[#E5E7EB] bg-[#EDEEEB] text-[#171717] hover:bg-[#E5E6E3]'
        }`}
      >
        Back to top ↑
      </button>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-12 lg:px-10">
        <div>
          <h2 className={headingClass}>Get to Know Us</h2>

          <div className="flex flex-col items-start gap-2">
            <Link to="/about" className={linkClass}>
              About ShopKart
            </Link>

            <Link to="/products" className={linkClass}>
              Our Products
            </Link>

            <Link to="/register" className={linkClass}>
              Join ShopKart
            </Link>
          </div>
        </div>

        <div>
          <h2 className={headingClass}>Shop with Us</h2>

          <div className="flex flex-col items-start gap-2">
            <Link to="/products" className={linkClass}>
              Browse Products
            </Link>

            <Link to="/cart" className={linkClass}>
              Your Cart
            </Link>

            <Link to="/checkout" className={linkClass}>
              Checkout
            </Link>
          </div>
        </div>

        <div>
          <h2 className={headingClass}>Your Account</h2>

          <div className="flex flex-col items-start gap-2">
            <Link to="/login" className={linkClass}>
              Sign In
            </Link>

            <Link to="/register" className={linkClass}>
              Create Account
            </Link>

            <Link to="/cart" className={linkClass}>
              Manage Cart
            </Link>
          </div>
        </div>

        <div>
          <h2 className={headingClass}>Need Help?</h2>

          <p className="max-w-xs text-sm leading-6">
            Browse our collection and review your order details
            before checkout.
          </p>

          <Link
            to="/products"
            className={`mt-3 inline-block text-sm font-semibold hover:underline ${
              darkMode ? 'text-[#22C55E]' : 'text-[#15803D]'
            }`}
          >
            Continue Shopping →
          </Link>
        </div>
      </div>

      <div
        className={`border-t px-6 py-6 text-center ${
          darkMode
            ? 'border-[#262626] bg-[#050505]'
            : 'border-[#E5E7EB] bg-[#F7F8F6]'
        }`}
      >
        <Link
          to="/"
          className={`text-2xl font-extrabold tracking-tight ${
            darkMode ? 'text-[#F5F5F5]' : 'text-[#171717]'
          }`}
        >
          Shop
          <span
            className={
              darkMode ? 'text-[#22C55E]' : 'text-[#15803D]'
            }
          >
            Kart
          </span>
        </Link>

        <p className="mt-3 text-xs">
          © 2026 ShopKart. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer