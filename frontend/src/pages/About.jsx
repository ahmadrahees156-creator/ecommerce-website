import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function About() {
  const { darkMode } = useTheme()

  const cardClass = `rounded-xl border p-6 ${
    darkMode
      ? 'border-gray-700 bg-gray-800'
      : 'border-gray-200 bg-white'
  }`

  return (
    <div
      className={`min-h-screen px-4 py-12 sm:px-8 ${
        darkMode
          ? 'bg-gray-950 text-white'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold text-blue-500">
            ABOUT SHOPKART
          </p>

          <h1 className="mb-4 text-3xl font-bold sm:text-5xl">
            Shopping Made Simple
          </h1>

          <p
            className={`mx-auto max-w-2xl text-base sm:text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            ShopKart is a team-built e-commerce project designed to
            make browsing products and managing your cart simple
            and convenient.
          </p>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className={cardClass}>
            <div className="mb-4 text-3xl">🛍️</div>
            <h2 className="mb-2 text-xl font-semibold">
              Explore Products
            </h2>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Browse products, search by name, and use filters to
              find what you need.
            </p>
          </div>

          <div className={cardClass}>
            <div className="mb-4 text-3xl">🛒</div>
            <h2 className="mb-2 text-xl font-semibold">
              Easy Cart
            </h2>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Add products, update quantities, and review your
              order summary before checkout.
            </p>
          </div>

          <div className={cardClass}>
            <div className="mb-4 text-3xl">💻</div>
            <h2 className="mb-2 text-xl font-semibold">
              Our Technology
            </h2>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Built with React and Tailwind CSS, with API
              integration as part of the project.
            </p>
          </div>
        </div>

        <div className={`${cardClass} text-center`}>
          <h2 className="mb-3 text-2xl font-bold">
            Start Exploring
          </h2>

          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover products and enjoy a simple shopping experience.
          </p>

          <Link
            to="/products"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Products →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
