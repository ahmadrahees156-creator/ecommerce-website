import { useState } from 'react'
import ProductCard from '../components/ProductCard'

import laptop from '../assets/laptop.jpg'
import headphones from '../assets/headphones.jpg'
import smartwatch from '../assets/smartwatch.jpg'

function Products() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const products = [
    {
      id: '1',
      name: 'Laptop',
      description: 'Powerful laptop for everyday use',
      price: '59999',
      image: laptop,
    },
    {
      id: '2',
      name: 'Headphones',
      description: 'Wireless headphones with clear sound',
      price: '1999',
      image: headphones,
    },
    {
      id: '3',
      name: 'Smart Watch',
      description: 'Smart watch with fitness tracking',
      price: '2999',
      image: smartwatch,
    },
  ]

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md px-4 py-2 w-full max-w-md mb-6"
      />

      {loading && (
        <p className="text-gray-600 mb-6">
          Loading products...
        </p>
      )}

      {error && (
        <p className="text-red-500 mb-6">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-gray-600">
              No products found.
            </p>
          )}
        </>
      )}
    </main>
  )
}

export default Products