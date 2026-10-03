
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
    (sum, product) => sum + Number(product.price) * product.quantity,
    0
  )

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString('en-IN')}`

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Cart
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Review your items before checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-6xl" aria-hidden="true">
              🛒
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
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
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center"
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="flex h-36 shrink-0 items-center justify-center rounded-xl bg-slate-100 p-4 dark:bg-slate-800 sm:w-36"
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

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {product.description}
                    </p>

                    <p className="mt-3 font-semibold">
                      {formatPrice(product.price)} each
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700">
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center text-sm font-semibold">
                          {product.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(product.id)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
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
                className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                <span aria-hidden="true">←</span>
                Continue Shopping
              </Link>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span>Items</span>
                  <span>
                    {cart.reduce(
                      (sum, product) => sum + product.quantity,
                      0
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="flex justify-between gap-3 text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 block w-full rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Proceed to Checkout
              </Link>

              <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
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
