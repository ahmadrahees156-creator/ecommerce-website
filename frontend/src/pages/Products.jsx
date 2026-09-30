import ProductCard from '../components/ProductCard'

function Products() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  )
}

export default Products