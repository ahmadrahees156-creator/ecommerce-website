import ProductCard from '../components/ProductCard'

function Products() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard 
        name ="Laptop"
        description ="Powerful Laptop for everyday use"
        price ="99999" 
        />
          <ProductCard 
        name ="Headphones"
        description ="Wireless headphones with clear sound"
        price ="2999" 
        /> 
         <ProductCard 
        name ="Smart Watch"
        description ="Smart watch with fitness tracking"
        price ="3999" 
        />
      </div>
    </main>
  )
}

export default Products