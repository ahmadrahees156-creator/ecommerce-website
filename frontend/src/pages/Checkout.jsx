import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { cart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })

  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price) * product.quantity,
    0
  )

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString('en-IN')}`

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      setError('Your cart is empty. Add products before checkout.')
      return
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError('Please enter a valid 6-digit PIN code.')
      return
    }

    setError('')
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="text-6xl" aria-hidden="true">✓</div>

          <h1 className="mt-5 text-3xl font-bold">
            Order Confirmed!
          </h1>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
            Thank you, {formData.fullName}! Your order has been
            submitted successfully in this demo.
          </p>

          <p className="mt-3 text-xl font-bold">
            Order Total: {formatPrice(total)}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Enter your delivery details and review your order.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold">Your cart is empty</h2>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Add some products before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:col-span-3">
                <h2 className="text-xl font-bold">
                  Delivery Details
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="mb-2 block text-sm font-semibold">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                      Mobile Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="mb-2 block text-sm font-semibold">
                      Street Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      placeholder="House number, street, area"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="mb-2 block text-sm font-semibold">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>

                  <div>
                    <label htmlFor="pincode" className="mb-2 block text-sm font-semibold">
                      PIN Code
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={6}
                      placeholder="6-digit PIN code"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-500/10 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </div>
                </div>

                {error && (
                  <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-7 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Place Order · {formatPrice(total)}
                </button>
              </section>

              <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24 lg:col-span-2">
                <h2 className="text-xl font-bold">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4">
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{product.name}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          Qty: {product.quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-semibold">
                        {formatPrice(Number(product.price) * product.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                  <div className="flex justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span>Total Items</span>
                    <span>
                      {cart.reduce(
                        (sum, product) => sum + product.quantity,
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span>Delivery</span>
                    <span>Calculated later</span>
                  </div>

                  <div className="flex justify-between gap-3 border-t border-slate-200 pt-4 text-lg font-bold dark:border-slate-800">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </aside>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default Checkout

