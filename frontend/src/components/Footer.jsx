
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Footer() {
  const { darkMode } = useTheme();

  const headingColor = darkMode ? '#F5F5F5' : '#173D30';
  const textColor = darkMode ? '#B5B5B5' : '#68786D';
  const accentColor = darkMode ? '#D6B887' : '#047857';
  const borderColor = darkMode ? '#303030' : '#E4E9DF';

  const linkClass = 'text-sm leading-7 transition hover:underline';

  return (
    <footer
      style={{
        backgroundColor: darkMode ? '#101010' : '#F8F5EC',
        color: textColor,
      }}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full border-b py-4 text-center text-sm font-medium transition"
        style={{
          borderColor,
          backgroundColor: darkMode ? '#1A1A1A' : '#EDEFE7',
          color: headingColor,
        }}
      >
        Back to top ↑
      </button>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 sm:grid-cols-3 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="text-2xl font-extrabold tracking-tight" style={{ color: headingColor }}>
            Shop<span style={{ color: accentColor }}>Kart</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7">
            Thoughtfully selected products for your everyday life.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-bold" style={{ color: headingColor }}>
            Explore
          </h3>
          <div className="flex flex-col items-start">
            <Link to="/" className={linkClass}>Home</Link>
            <Link to="/products" className={linkClass}>All products</Link>
            <Link to="/about" className={linkClass}>About us</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold" style={{ color: headingColor }}>
            Your account
          </h3>
          <div className="flex flex-col items-start">
            <Link to="/login" className={linkClass}>Login</Link>
            <Link to="/register" className={linkClass}>Create account</Link>
            <Link to="/wishlist" className={linkClass}>Wishlist</Link>
            <Link to="/orders" className={linkClass}>My orders</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold" style={{ color: headingColor }}>
            Shopping
          </h3>
          <div className="flex flex-col items-start">
            <Link to="/cart" className={linkClass}>Shopping cart</Link>
            <Link to="/checkout" className={linkClass}>Checkout</Link>
            <Link to="/products" className={linkClass}>Discover products →</Link>
          </div>
        </div>
      </div>

      <div
        className="border-t px-5 py-6 text-center text-xs"
        style={{ borderColor, color: textColor }}
      >
        © 2026 ShopKart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
