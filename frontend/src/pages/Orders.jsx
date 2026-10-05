import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cancelOrder, getMyOrders } from '../services/orderApi'

function Orders() {
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
      setError(err.response?.data?.message || 'Unable to load orders.')
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
      setError(err.response?.data?.message || 'Unable to cancel order.')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">My Orders</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Track your ShopKart orders.</p>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading && <p className="mt-8 text-center">Loading orders...</p>}
        {error && <p className="mt-8 rounded-xl bg-red-50 p-4 text-red-600 dark:bg-red-950/30 dark:text-red-400">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div className="mt-8 rounded-2xl border bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            No orders found.
          </div>
        )}

        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Order #{order._id.slice(-8)}</p>
                  <p className="mt-1 font-semibold">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold capitalize text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 dark:border-slate-800">
                <p className="text-lg font-bold">₹{Number(order.totalAmount).toLocaleString('en-IN')}</p>
                <div className="flex gap-2">
                  <Link to={`/orders/${order._id}`} className="rounded-lg border px-4 py-2 text-sm font-semibold dark:border-slate-700">
                    View Details
                  </Link>
                  {order.status === 'pending' && (
                    <button onClick={() => handleCancel(order._id)} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
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