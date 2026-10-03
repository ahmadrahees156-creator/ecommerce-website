import { useCart } from '../context/CartContext'

function Cart() {
  const { cart, removeFromCart } = useCart()

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="border rounded-lg p-6">
            <p className="text-gray-600">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((product, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex items-center gap-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                  }}
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-gray-600">
                    {product.description}
                  </p>

                 <p className="font-bold mt-2">
                  ₹{product.price}
                 </p>

                 <p className="mt-2">
                 Quantity: {product.quantity}
                 </p>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Cart