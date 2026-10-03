function Cart() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Your Cart
        </h1>

        <div className="border rounded-lg p-6">
          <p className="text-gray-600">
            Your cart is empty.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Cart