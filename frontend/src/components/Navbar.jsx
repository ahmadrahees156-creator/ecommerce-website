
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const cartCount = (cart ?? []).reduce(
    (total, item) => total + Number(item.quantity ?? 1),
    0
  );

  const page = darkMode
    ? 'bg-[#181B19] text-[#F5F5F5] border-[#D6B887]/60 shadow-[0_2px_12px_rgba(214,184,135,0.08)]'
    : 'bg-[#F0EEE3] text-[#173D30] border-[#8FA995] shadow-[0_2px_12px_rgba(6,78,59,0.06)]';

  const muted = darkMode
    ? 'text-[#B5B5B5]'
    : 'text-[#68786D]';

  const accent = darkMode
    ? 'text-[#D6B887]'
    : 'text-[#047857]';

  const inputStyle = darkMode
    ? 'bg-[#242724] border-[#414640] text-white placeholder:text-[#999999] focus:border-[#D6B887]'
    : 'bg-[#FAF9F4] border-[#D5DED2] text-[#173D30] placeholder:text-[#879188] focus:border-[#047857]';

  const activeLink = darkMode
    ? 'text-[#D6B887]'
    : 'text-[#047857]';

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 transition-colors duration-300 ${page}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center justify-between gap-4">

          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="shrink-0 text-2xl font-extrabold tracking-tight sm:text-3xl"
            aria-label="ShopKart home"
          >
            <span className={accent}>Shop</span>
            <span>Kart</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold transition hover:opacity-75 ${
                    isActive ? activeLink : muted
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <form
            onSubmit={handleSearch}
            className="hidden max-w-sm flex-1 md:flex"
          >
            <div className="relative w-full">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className={`w-full rounded-xl border py-2.5 pl-4 pr-11 text-sm outline-none transition ${inputStyle}`}
              />

              <button
                type="submit"
                aria-label="Search"
                className={`absolute right-0 top-0 flex h-full w-11 items-center justify-center ${muted}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>
              </button>
            </div>
          </form>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              title="Wishlist"
              className={`hidden text-xl transition hover:scale-110 sm:block ${muted}`}
            >
              ♡
            </Link>

            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              title="Cart"
              className={`relative text-xl transition hover:scale-110 ${muted}`}
            >
              🛒

              {cartCount > 0 && (
                <span
                  className={`absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                    darkMode
                      ? 'bg-[#D6B887] text-[#171717]'
                      : 'bg-[#064E3B] text-white'
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Light mode' : 'Dark mode'}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition ${
                darkMode
                  ? 'border-[#414640] hover:bg-[#29251E]'
                  : 'border-[#D5DED2] hover:bg-[#E4E9DF]'
              }`}
            >
              {darkMode ? '☀' : '☾'}
            </button>

            <div className="hidden items-center gap-3 lg:flex">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/orders"
                    className={`text-sm font-semibold ${muted}`}
                  >
                    My Orders
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      darkMode
                        ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
                        : 'bg-[#064E3B] text-white hover:bg-[#047857]'
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-sm font-semibold ${muted}`}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      darkMode
                        ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
                        : 'bg-[#064E3B] text-white hover:bg-[#047857]'
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-xl md:hidden ${
                darkMode ? 'border-[#414640]' : 'border-[#D5DED2]'
              }`}
            >
              {menuOpen ? '×' : '☰'}
            </button>
          </div>
        </div>

        <div className="pb-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className={`w-full rounded-xl border py-3 pl-4 pr-12 text-sm outline-none ${inputStyle}`}
            />

            <button
              type="submit"
              aria-label="Search"
              className={`absolute right-0 top-0 flex h-full w-12 items-center justify-center ${muted}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>
            </button>
          </form>
        </div>

        {menuOpen && (
          <nav
            className={`space-y-1 border-t py-4 md:hidden ${
              darkMode ? 'border-[#414640]' : 'border-[#D5DED2]'
            }`}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? darkMode
                        ? 'bg-[#29251E] text-[#D6B887]'
                        : 'bg-[#E4E9DF] text-[#047857]'
                      : muted
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-semibold ${muted}`}
            >
              Wishlist
            </Link>

            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-semibold ${muted}`}
            >
              My Orders
            </Link>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold ${muted}`}
              >
                Logout {user?.name ? `(${user.name})` : ''}
              </button>
            ) : (
              <div className="flex gap-3 px-4 py-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-semibold ${accent}`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm font-semibold ${accent}`}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
