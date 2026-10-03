import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="px-6 py-4 border-b flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        E-Commerce
      </h1>

      <Link
        to="/cart"
        className="border px-4 py-2 rounded-md"
      >
        Cart
      </Link>
    </nav>
  )
}

export default Navbar