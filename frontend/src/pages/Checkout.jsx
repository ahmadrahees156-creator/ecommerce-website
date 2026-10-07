import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/orderApi'
import { useTheme } from '../context/ThemeContext'

function Checkout() {
  const { darkMode } = useTheme()
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })

  const total = cart.reduce(
    (sum, product) => sum + Number(product.price) * product.quantity,
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

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

    try {
      setLoading(true)

      const order = await createOrder()

      await clearCart()

      navigate(`/orders/${order._id}`)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to place order. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const card = darkMode
    ? 'border-[#262626] bg-[#111111]'
    : 'border-[#E5E7EB] bg-white'

  const input = darkMode
    ? 'border-[#262626] bg-[#050505] text-[#F5F5F5] placeholder:text-[#737373] focus:border-[#22C55E]'
    : 'border-[#E5E7EB] bg-white text-[#171717] placeholder:text-[#737373] focus:border-[#15803D]'

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors sm:px-6 lg:px-8 ${
        darkMode
          ? 'bg-[#050505] text-[#F5F5F5]'
          : 'bg-[#F7F8F6] text-[#171717]'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Checkout
          </h1>

          <p
            className={`mt-2 ${
              darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'
            }`}
          >
            Enter your delivery details and review your order.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className={`rounded-2xl border p-8 text-center ${card}`}>
            <h2 className="text-xl font-bold">
              Your cart is empty
            </h2>

            <Link
              to="/products"
              className={`mt-5 inline-block rounded-xl px-5 py-3 font-semibold ${
                darkMode
                  ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                  : 'bg-[#15803D] text-white hover:bg-[#166534]'
              }`}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
              <section
                className={`rounded-2xl border p-6 shadow-sm sm:p-8 lg:col-span-3 ${card}`}
              >
                <h2 className="text-xl font-bold">
                  Delivery Details
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${input}`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${input}`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Mobile Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      maxLength={10}
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${input}`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Street Address
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${input}`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${input}`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="mb-2 block text-sm font-semibold"
                    >
                      PIN Code
                    </label>

                    <input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      maxLength={6}
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition ${input}`}
                    />
                  </div>
                </div>

                <p
                  className={`mt-5 text-xs ${
                    darkMode ? 'text-[#737373]' : 'text-[#737373]'
                  }`}
                >
                  The current backend order model stores products,
                  quantities, prices, total and status. Delivery fields
                  are validated here but are not stored by the current
                  backend.
                </p>

                {error && (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-7 w-full rounded-xl px-5 py-3 font-semibold transition disabled:opacity-50 ${
                    darkMode
                      ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                      : 'bg-[#15803D] text-white hover:bg-[#166534]'
                  }`}
                >
                  {loading
                    ? 'Placing Order...'
                    : `Place Order · ${formatPrice(total)}`}
                </button>
              </section>

              <aside
                className={`rounded-2xl border p-6 shadow-sm lg:sticky lg:top-24 lg:col-span-2 ${card}`}
              >
                <h2 className="text-xl font-bold">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4">
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`h-16 w-16 rounded-lg object-contain p-2 ${
                          darkMode
                            ? 'bg-[#050505]'
                            : 'bg-[#F7F8F6]'
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">
                          {product.name}
                        </p>

                        <p
                          className={`text-sm ${
                            darkMode
                              ? 'text-[#737373]'
                              : 'text-[#737373]'
                          }`}
                        >
                          Qty: {product.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        {formatPrice(
                          Number(product.price) * product.quantity
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-6 border-t pt-5 ${
                    darkMode
                      ? 'border-[#262626]'
                      : 'border-[#E5E7EB]'
                  }`}
                >
                  <div className="flex justify-between text-lg font-bold">
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