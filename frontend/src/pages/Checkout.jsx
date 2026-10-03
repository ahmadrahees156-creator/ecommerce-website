import { useCart } from '../context/CartContext'

function Checkout() {
  const { cart } = useCart()

  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price) * product.quantity,
    0
  )

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Delivery Details
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-md px-4 py-2 mb-4"
            />

            <input
              type="text"
              placeholder="Address"
              className="w-full border rounded-md px-4 py-2 mb-4"
            />

            <input
              type="text"
              placeholder="City"
              className="w-full border rounded-md px-4 py-2 mb-4"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            {cart.map((product) => (
              <div
                key={product.id}
                className="flex justify-between mb-3"
              >
                <span>
                  {product.name} × {product.quantity}
                </span>

                <span>
                  ₹{Number(product.price) * product.quantity}
                </span>
              </div>
            ))}

            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="w-full bg-black text-white py-3 rounded-md mt-6"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout