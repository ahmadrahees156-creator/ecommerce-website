import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cancelOrder, getMyOrders } from '../services/orderApi'
import { useTheme } from '../context/ThemeContext'

function Orders() {
  const { darkMode } = useTheme()

  const [orders, setOrders] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError('')
      setOrders(await getMyOrders(status))
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load orders.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [status])

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this order?')) return

    try {
      await cancelOrder(id)
      await loadOrders()
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

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors sm:px-6 lg:px-8 ${
        darkMode
          ? 'bg-[#050505] text-[#F5F5F5]'
          : 'bg-[#F7F8F6] text-[#171717]'
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              My Orders
            </h1>

            <p className={`mt-2 ${muted}`}>
              Track your ShopKart orders.
            </p>
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`rounded-xl border px-4 py-3 outline-none ${
              darkMode
                ? 'border-[#262626] bg-[#111111]'
                : 'border-[#E5E7EB] bg-white'
            }`}
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading && (
          <p className="mt-8 text-center">
            Loading orders...
          </p>
        )}

        {error && (
          <p className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && orders.length === 0 && (
          <div
            className={`mt-8 rounded-2xl border p-10 text-center ${card}`}
          >
            No orders found.
          </div>
        )}

        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className={`rounded-2xl border p-5 shadow-sm ${card}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={`text-sm ${muted}`}>
                    Order #{order._id.slice(-8)}
                  </p>

                  <p className="mt-1 font-semibold">
                    {new Date(
                      order.createdAt
                    ).toLocaleString('en-IN')}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                    darkMode
                      ? 'bg-[#052E16] text-[#4ADE80]'
                      : 'bg-[#DCFCE7] text-[#15803D]'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div
                className={`mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${
                  darkMode
                    ? 'border-[#262626]'
                    : 'border-[#E5E7EB]'
                }`}
              >
                <p className="text-lg font-bold">
                  ₹
                  {Number(
                    order.totalAmount
                  ).toLocaleString('en-IN')}
                </p>

                <div className="flex gap-2">
                  <Link
                    to={`/orders/${order._id}`}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                      darkMode
                        ? 'border-[#262626] hover:bg-[#050505]'
                        : 'border-[#E5E7EB] hover:bg-[#F7F8F6]'
                    }`}
                  >
                    View Details
                  </Link>

                  {order.status === 'pending' && (
                    <button
                      onClick={() =>
                        handleCancel(order._id)
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Orders