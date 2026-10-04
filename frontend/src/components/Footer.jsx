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
    darkMode ? 'text-white' : 'text-slate-900'
  }`

  const linkClass = `text-sm leading-6 transition hover:underline hover:text-blue-500 ${
    darkMode ? 'text-slate-300' : 'text-slate-600'
  }`

  return (
    <footer
      className={`transition-colors duration-300 ${
        darkMode
          ? 'bg-[#131921] text-slate-300'
          : 'bg-slate-100 text-slate-700'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className={`w-full py-4 text-center text-sm font-medium transition ${
          darkMode
            ? 'bg-[#232f3e] text-white hover:bg-[#314158]'
            : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
        }`}
      >
        Back to top ↑
      </button>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-12 lg:px-10">
        <div>
          <h2 className={headingClass}>Get to Know Us</h2>
          <div className="flex flex-col items-start gap-2">
            <Link to="/" className={linkClass}>About ShopKart</Link>
            <Link to="/products" className={linkClass}>Our Products</Link>
            <Link to="/register" className={linkClass}>Join ShopKart</Link>
          </div>
        </div>

        <div>
          <h2 className={headingClass}>Shop with Us</h2>
          <div className="flex flex-col items-start gap-2">
            <Link to="/products" className={linkClass}>Browse Products</Link>
            <Link to="/cart" className={linkClass}>Your Cart</Link>
            <Link to="/checkout" className={linkClass}>Checkout</Link>
          </div>
        </div>

        <div>
          <h2 className={headingClass}>Your Account</h2>
          <div className="flex flex-col items-start gap-2">
            <Link to="/login" className={linkClass}>Sign In</Link>
            <Link to="/register" className={linkClass}>Create Account</Link>
            <Link to="/cart" className={linkClass}>Manage Cart</Link>
          </div>
        </div>

        <div>
          <h2 className={headingClass}>Need Help?</h2>
          <p className="max-w-xs text-sm leading-6">
            Browse our collection and review your order details before checkout.
          </p>
          <Link
            to="/products"
            className="mt-3 inline-block text-sm font-semibold text-blue-500 hover:underline"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>

      <div
        className={`border-t px-6 py-6 text-center ${
          darkMode
            ? 'border-slate-700 bg-[#131921]'
            : 'border-slate-300 bg-slate-100'
        }`}
      >
        <Link
          to="/"
          className={`text-2xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Shop<span className="text-blue-500">Kart</span>
        </Link>

        <p className="mt-3 text-xs">
          © 2026 ShopKart. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
