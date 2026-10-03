import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price) * product.quantity,
    0
  )

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

            <Link
              to="/products"
              className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-md"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {cart.map((product) => (
                <div
                  key={product.id}
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

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className="border px-3 py-1 rounded-md"
                      >
                        −
                      </button>

                      <span>
                        {product.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(product.id)}
                        className="border px-3 py-1 rounded-md"
                      >
                        +
                      </button>
                    </div>
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

            <div className="border rounded-lg p-6 mt-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-black text-white text-center py-3 rounded-md mt-6"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Cart