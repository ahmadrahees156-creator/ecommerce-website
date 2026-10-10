
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getMyOrders } from '../services/orderApi';

function Orders() {
  const { darkMode } = useTheme();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getMyOrders();
      const data = response?.data ?? response;

      setOrders(
        Array.isArray(data)
          ? data
          : data?.orders ?? data?.items ?? []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load your orders. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const page = darkMode
    ? 'bg-[#101010] text-[#F5F5F5]'
    : 'bg-[#F8F5EC] text-[#173D30]';

  const card = darkMode
    ? 'border-[#383838] bg-[#1A1A1A]'
    : 'border-[#E4E9DF] bg-white';

  const muted = darkMode
    ? 'text-[#B5B5B5]'
    : 'text-[#68786D]';

  const accent = darkMode
    ? 'text-[#D6B887]'
    : 'text-[#047857]';

  const button = darkMode
    ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
    : 'bg-[#064E3B] text-white hover:bg-[#047857]';

  const border = darkMode
    ? 'border-[#383838]'
    : 'border-[#E4E9DF]';

  const getOrderId = (order) =>
    order._id ?? order.id ?? order.orderId;

  const getOrderTotal = (order) =>
    Number(order.totalAmount ?? order.total ?? order.amount ?? 0);

  const getOrderStatus = (order) =>
    order.orderStatus ?? order.status ?? 'Pending';

  const getStatusStyle = (status) => {
    const value = String(status || 'pending').toLowerCase();

    if (value.includes('deliver')) {
      return darkMode
        ? 'bg-emerald-400/10 text-emerald-300'
        : 'bg-emerald-50 text-emerald-700';
    }

    if (
      value.includes('cancel') ||
      value.includes('fail') ||
      value.includes('refund')
    ) {
      return darkMode
        ? 'bg-red-400/10 text-red-300'
        : 'bg-red-50 text-red-700';
    }

    if (
      value.includes('ship') ||
      value.includes('confirm') ||
      value.includes('process')
    ) {
      return darkMode
        ? 'bg-amber-300/10 text-amber-200'
        : 'bg-amber-50 text-amber-700';
    }

    return darkMode
      ? 'bg-[#303030] text-[#D0D0D0]'
      : 'bg-[#F0EEE5] text-[#68786D]';
  };

  const formatDate = (date) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return 'Date unavailable';

    return parsed.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <main className={`min-h-screen px-4 py-10 sm:px-6 lg:px-10 ${page}`}>
        <div className="mx-auto max-w-5xl">
          <div className={`mb-8 h-10 w-60 animate-pulse rounded ${darkMode ? 'bg-[#292929]' : 'bg-[#E4E9DF]'}`} />

          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`animate-pulse rounded-xl border p-6 ${card}`}
              >
                <div className={`h-4 w-32 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E4E9DF]'}`} />
                <div className={`mt-4 h-5 w-48 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E4E9DF]'}`} />
                <div className={`mt-6 h-12 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E4E9DF]'}`} />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen px-4 py-8 transition-colors duration-300 sm:px-6 sm:py-12 lg:px-10 ${page}`}>
      <div className="mx-auto max-w-5xl">

        <header className={`mb-8 border-b pb-7 ${border}`}>
          <p className={`mb-3 text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
            YOUR PURCHASE HISTORY
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
                My Orders
              </h1>

              <p className={`mt-3 max-w-xl text-sm leading-6 ${muted}`}>
                Every order, all in one place. Check your purchases,
                review order details and keep track of their status.
              </p>
            </div>

            <div className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm ${border}`}>
              <span className={accent} aria-hidden="true">▤</span>
              <span className="font-semibold">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              </span>
            </div>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={loadOrders}
              className="font-bold underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        )}

        {!error && orders.length === 0 ? (
          <section className={`rounded-xl border px-5 py-16 text-center sm:py-24 ${card}`}>
            <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl ${darkMode ? 'bg-[#242424]' : 'bg-[#EEF2E9]'}`}>
              <span aria-hidden="true">▤</span>
            </div>

            <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${accent}`}>
              YOUR SHOPPING JOURNEY
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl">
              No orders just yet
            </h2>

            <p className={`mx-auto mt-4 max-w-md text-sm leading-7 ${muted}`}>
              Once you place an order, it will appear here. Explore the
              collection to find something you love.
            </p>

            <Link
              to="/products"
              className={`mt-8 inline-flex items-center justify-center rounded-md px-7 py-3.5 text-sm font-semibold transition ${button}`}
            >
              Explore the collection →
            </Link>
          </section>
        ) : (
          <div className="space-y-5">
            {orders.map((order, index) => {
              const id = getOrderId(order);
              const status = getOrderStatus(order);
              const items = order.items ?? order.orderItems ?? order.products ?? [];
              const safeItems = Array.isArray(items) ? items : [];
              const date = order.createdAt ?? order.orderDate ?? order.date;

              return (
                <article
                  key={id ?? index}
                  className={`overflow-hidden rounded-xl border transition-colors duration-300 ${card}`}
                >
                  <div className="p-5 sm:p-7">

                    <div className={`flex flex-col justify-between gap-5 border-b pb-5 sm:flex-row sm:items-center ${border}`}>
                      <div className="min-w-0">
                        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${muted}`}>
                          ORDER REFERENCE
                        </p>

                        <p className="mt-2 break-all font-semibold">
                          #{String(id ?? 'N/A').slice(-12)}
                        </p>

                        {date && (
                          <p className={`mt-2 text-sm ${muted}`}>
                            Placed on {formatDate(date)}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(status)}`}>
                          {String(status).replace(/[_-]/g, ' ')}
                        </span>

                        <div className="sm:text-right">
                          <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${muted}`}>
                            ORDER TOTAL
                          </p>

                          <p className={`mt-1 text-xl font-semibold ${accent}`}>
                            ₹{getOrderTotal(order).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="font-serif text-xl">
                          Order summary
                        </h2>

                        <span className={`text-xs ${muted}`}>
                          {safeItems.length} {safeItems.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>

                      {safeItems.length === 0 ? (
                        <p className={`text-sm ${muted}`}>
                          Item details are not available for this order.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {safeItems.slice(0, 3).map((item, itemIndex) => {
                            const product = item.product ?? item;
                            const itemName =
                              product.name ?? product.title ?? 'Product';
                            const quantity =
                              item.quantity ?? item.qty ?? 1;

                            return (
                              <div
                                key={item._id ?? item.id ?? itemIndex}
                                className="flex items-center justify-between gap-4"
                              >
                                <div className="flex min-w-0 items-center gap-3">
                                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm ${darkMode ? 'bg-[#242424]' : 'bg-[#F0EEE5]'}`}>
                                    <span aria-hidden="true">□</span>
                                  </div>

                                  <p className="truncate text-sm font-medium">
                                    {itemName}
                                  </p>
                                </div>

                                <span className={`shrink-0 text-xs ${muted}`}>
                                  Qty: {quantity}
                                </span>
                              </div>
                            );
                          })}

                          {safeItems.length > 3 && (
                            <p className={`pl-1 text-xs ${muted}`}>
                              +{safeItems.length - 3} more {safeItems.length - 3 === 1 ? 'item' : 'items'}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={`flex flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:items-center ${border}`}>
                      <p className={`text-xs leading-5 ${muted}`}>
                        Need to review this purchase? Open the full order details.
                      </p>

                      <Link
                        to={`/orders/${id}`}
                        className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${button}`}
                      >
                        View order details
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className={`mt-8 flex flex-col items-start justify-between gap-3 rounded-xl border p-5 sm:flex-row sm:items-center ${card}`}>
          <div>
            <h3 className="font-serif text-lg">Looking for something else?</h3>
            <p className={`mt-1 text-sm ${muted}`}>
              Browse the collection and discover your next favourite.
            </p>
          </div>

          <Link
            to="/products"
            className={`inline-flex items-center gap-2 text-sm font-semibold ${accent}`}
          >
            Continue shopping →
          </Link>
        </div>

      </div>
    </main>
  );
}

export default Orders;
