import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

function Cart() {
  const { darkMode } = useTheme()
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  const total = cart.reduce(
    (sum, product) => sum + Number(product.price) * product.quantity,
    0
  )

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString('en-IN')}`

  const card = darkMode
    ? 'border-[#262626] bg-[#111111]'
    : 'border-[#E5E7EB] bg-white'

  const muted = darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors sm:px-6 lg:px-8 ${
        darkMode
          ? 'bg-[#050505] text-[#F5F5F5]'
          : 'bg-[#F7F8F6] text-[#171717]'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Cart
          </h1>

          <p className={`mt-2 ${muted}`}>
            Review your items before checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <div
            className={`rounded-2xl border px-6 py-16 text-center shadow-sm ${card}`}
          >
            <div className="text-6xl" aria-hidden="true">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Your cart is empty
            </h2>

            <p className={`mt-2 ${muted}`}>
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/products"
              className={`mt-6 inline-block rounded-xl px-6 py-3 font-semibold transition ${
                darkMode
                  ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                  : 'bg-[#15803D] text-white hover:bg-[#166534]'
              }`}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className={`flex flex-col gap-4 rounded-2xl border p-4 shadow-sm transition sm:flex-row sm:items-center ${card}`}
                >
                  <Link
                    to={`/products/${product.id}`}
                    className={`flex h-36 shrink-0 items-center justify-center rounded-xl p-4 sm:w-36 ${
                      darkMode ? 'bg-[#0B0B0B]' : 'bg-[#F7F8F6]'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold">
                      {product.name}
                    </h2>

                    <p className={`mt-1 text-sm leading-6 ${muted}`}>
                      {product.description}
                    </p>

                    <p className="mt-3 font-semibold">
                      {formatPrice(product.price)} each
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div
                        className={`flex items-center rounded-lg border ${
                          darkMode
                            ? 'border-[#262626]'
                            : 'border-[#E5E7EB]'
                        }`}
                      >
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className={`px-3 py-2 transition ${
                            darkMode
                              ? 'hover:bg-[#050505]'
                              : 'hover:bg-[#F7F8F6]'
                          }`}
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center text-sm font-semibold">
                          {product.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(product.id)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className={`px-3 py-2 transition ${
                            darkMode
                              ? 'hover:bg-[#050505]'
                              : 'hover:bg-[#F7F8F6]'
                          }`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500/10"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className={`text-xs ${muted}`}>
                      Subtotal
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {formatPrice(
                        Number(product.price) * product.quantity
                      )}
                    </p>
                  </div>
                </div>
              ))}

              <Link
                to="/products"
                className={`inline-flex items-center gap-2 py-2 text-sm font-semibold transition ${
                  darkMode
                    ? 'text-[#A3A3A3] hover:text-[#22C55E]'
                    : 'text-[#525252] hover:text-[#15803D]'
                }`}
              >
                <span aria-hidden="true">←</span>
                Continue Shopping
              </Link>
            </div>

            <aside
              className={`rounded-2xl border p-6 shadow-sm lg:sticky lg:top-24 ${card}`}
            >
              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4">
                <div className={`flex justify-between gap-3 text-sm ${muted}`}>
                  <span>Items</span>
                  <span>
                    {cart.reduce(
                      (sum, product) => sum + product.quantity,
                      0
                    )}
                  </span>
                </div>

                <div className={`flex justify-between gap-3 text-sm ${muted}`}>
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>

                <div
                  className={`border-t pt-4 ${
                    darkMode
                      ? 'border-[#262626]'
                      : 'border-[#E5E7EB]'
                  }`}
                >
                  <div className="flex justify-between gap-3 text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className={`mt-6 block w-full rounded-xl px-4 py-3 text-center font-semibold transition ${
                  darkMode
                    ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                    : 'bg-[#15803D] text-white hover:bg-[#166534]'
                }`}
              >
                Proceed to Checkout
              </Link>

              <p className={`mt-4 text-center text-xs ${muted}`}>
                Your order total updates automatically.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

export default Cart