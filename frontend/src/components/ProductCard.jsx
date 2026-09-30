function ProductCard( { name ,description,price}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="h-48 bg-gray-200 rounded-md mb-4"></div>

      <h2 className="text-xl font-semibold">
        {name}
      </h2>

      <p className="text-gray-600 mt-2">
        {description}
      </p>

      <p className="text-lg font-bold mt-3">
        {price}
      </p>

      <button className="mt-4 w-full bg-black text-white py-2 rounded-md">
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard