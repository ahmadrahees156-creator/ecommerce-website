import { useParams } from 'react-router-dom'

function ProductDetails() {
  const { id } = useParams()

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">
        Product Details
      </h1>

      <p className="mt-4">
        Product ID: {id}
      </p>
    </main>
  )
}

export default ProductDetails