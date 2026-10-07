import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cancelOrder, getOrderById } from '../services/orderApi'
import { useTheme } from '../context/ThemeContext'

function OrderDetails() {
  const { darkMode } = useTheme()
  const { id } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadOrder = async () => {
    try {
      setLoading(true)
      setOrder(await getOrderById(id))
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load order.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrder()
  }, [id])

  const handleCancel = async () => {
    try {
      await cancelOrder(id)
      await loadOrder()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to cancel order.'
      )
    }
  }

  const card = darkMode
    ? 'border-[#262626] bg-[#111111]'
    : 'border-[#E5E7EB] bg-white'

  const muted = darkMode
    ? 'text-[#A3A3A3]'
    : 'text-[#525252]'

  if (loading) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center ${
          darkMode
            ? 'bg-[#050505] text-[#F5F5F5]'
            : 'bg-[#F7F8F6] text-[#171717]'
        }`}
      >
        <p>Loading order...</p>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main
        className={`min-h-screen p-8 text-center ${
          darkMode
            ? 'bg-[#050505] text-[#F5F5F5]'
            : 'bg-[#F7F8F6] text-[#171717]'
        }`}
      >
        <p className="text-red-500">
          {error || 'Order not found.'}
        </p>

        <Link
          to="/orders"
          className={`mt-5 inline-block font-semibold ${
            darkMode
              ? 'text-[#22C55E]'
              : 'text-[#15803D]'
          }`}
        >
          Back to Orders
        </Link>
      </main>
    )
  }

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors sm:px-6 lg:px-8 ${
        darkMode
          ? 'bg-[#050505] text-[#F5F5F5]'
          : 'bg-[#F7F8F6] text-[#171717]'
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className={`text-sm font-semibold transition ${
            darkMode
              ? 'text-[#A3A3A3] hover:text-[#22C55E]'
              : 'text-[#525252] hover:text-[#15803D]'
          }`}
        >
          ← Back
        </button>

        <div
          className={`mt-5 rounded-2xl border p-6 shadow-sm sm:p-8 ${card}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">
                Order #{order._id.slice(-8)}
              </h1>

              <p className={`mt-1 text-sm ${muted}`}>
                {new Date(
                  order.createdAt
                ).toLocaleString('en-IN')}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                order.status === 'cancelled'
                  ? 'bg-red-500/10 text-red-500'
                  : darkMode
                    ? 'bg-[#052E16] text-[#4ADE80]'
                    : 'bg-[#DCFCE7] text-[#15803D]'
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {order.items.map((item) => (
              <div
                key={item._id || item.product?._id}
                className={`flex items-center gap-4 border-t py-4 ${
                  darkMode
                    ? 'border-[#262626]'
                    : 'border-[#E5E7EB]'
                }`}
              >
                <div
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-lg p-2 ${
                    darkMode
                      ? 'bg-[#0B0B0B]'
                      : 'bg-[#F7F8F6]'
                  }`}
                >
                  <img
                    src={item.product?.imageUrl}
                    alt={item.product?.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold">
                    {item.product?.name ||
                      'Product unavailable'}
                  </p>

                  <p className={`text-sm ${muted}`}>
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹
                  {Number(
                    item.price * item.quantity
                  ).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`mt-4 flex justify-between border-t pt-4 text-xl font-bold ${
              darkMode
                ? 'border-[#262626]'
                : 'border-[#E5E7EB]'
            }`}
          >
            <span>Total</span>

            <span>
              ₹
              {Number(order.totalAmount).toLocaleString(
                'en-IN'
              )}
            </span>
          </div>

          {order.status === 'pending' && (
            <button
              onClick={handleCancel}
              className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default OrderDetails