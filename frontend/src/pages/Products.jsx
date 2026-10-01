import ProductCard from '../components/ProductCard'

import laptop from '../assets/laptop.jpg'
import headphones from '../assets/headphone.jpg'
import smartwatch from '../assets/smartwatch.jpg'

function Products() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
        id ="1"
          name="Laptop"
          description="Powerful laptop for everyday use"
          price="59999"
          image={laptop}
        />

        <ProductCard
        id="2"
          name="Headphones"
          description="Wireless headphones with clear sound"
          price="1999"
          image={headphones}
        />

        <ProductCard
        id="3"
          name="Smart Watch"
          description="Smart watch with fitness tracking"
          price="2999"
          image={smartwatch}
        />
      </div>
    </main>
  )
}

export default Products