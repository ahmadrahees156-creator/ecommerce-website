import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cancelOrder, getOrderById } from '../services/orderApi'

function OrderDetails() {
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
      setError(err.response?.data?.message || 'Unable to load order.')
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
      setError(err.response?.data?.message || 'Unable to cancel order.')
    }
  }

  if (loading) {
    return <main className="min-h-screen p-8 text-center">Loading order...</main>
  }

  if (error || !order) {
    return (
      <main className="min-h-screen p-8 text-center">
        <p className="text-red-600">{error || 'Order not found.'}</p>
        <Link to="/orders" className="mt-5 inline-block underline">
          Back to Orders
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button onClick={() => navigate(-1)} className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          ← Back
        </button>

        <div className="mt-5 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Order #{order._id.slice(-8)}</h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {new Date(order.createdAt).toLocaleString('en-IN')}
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold capitalize text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
              {order.status}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {order.items.map((item) => (
              <div key={item._id || item.product?._id} className="flex items-center gap-4 border-t py-4 dark:border-slate-800">
                <img src={item.product?.imageUrl} alt={item.product?.name} className="h-20 w-20 rounded-lg bg-slate-100 object-contain p-2 dark:bg-slate-800" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item.product?.name || 'Product unavailable'}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold dark:border-slate-800">
            <span>Total</span>
            <span>₹{Number(order.totalAmount).toLocaleString('en-IN')}</span>
          </div>

          {order.status === 'pending' && (
            <button onClick={handleCancel} className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700">
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default OrderDetails