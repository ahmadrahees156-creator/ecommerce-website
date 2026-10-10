
import { Link } from 'react-router-dom';

function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#064e3b]/10 bg-[#f8f5ec]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">

        <Link
          to="/"
          className="shrink-0 text-2xl font-black tracking-tight text-[#064e3b]"
        >
          ShopKart<span className="text-[#047857]">.</span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-[#064e3b] md:flex">
          <a href="#story" className="transition hover:text-[#047857]">
            Our Story
          </a>
          <a href="#collections" className="transition hover:text-[#047857]">
            Collections
          </a>
          <Link to="/about" className="transition hover:text-[#047857]">
            About
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-semibold text-[#064e3b] transition hover:text-[#047857] sm:block"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hidden rounded-full border border-[#064e3b]/20 px-4 py-2.5 text-sm font-semibold text-[#064e3b] transition hover:bg-[#dceDE1] sm:block"
          >
            Register
          </Link>

          <Link
            to="/home"
            className="rounded-full bg-[#064e3b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#047857] sm:px-5"
          >
            Enter Shop <span className="ml-1">↗</span>
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default LandingNavbar;
