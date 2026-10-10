
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getOrderById } from '../services/orderApi';

function OrderDetails() {
  const { id } = useParams();
  const { darkMode } = useTheme();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getOrderById(id);
      const data = response?.data ?? response;

      setOrder(data?.order ?? data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load this order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

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

  const getStatusStyle = (value) => {
    const status = String(value || 'pending').toLowerCase();

    if (status.includes('deliver')) {
      return darkMode
        ? 'bg-emerald-400/10 text-emerald-300'
        : 'bg-emerald-50 text-emerald-700';
    }

    if (
      status.includes('cancel') ||
      status.includes('fail') ||
      status.includes('refund')
    ) {
      return darkMode
        ? 'bg-red-400/10 text-red-300'
        : 'bg-red-50 text-red-700';
    }

    if (
      status.includes('ship') ||
      status.includes('process') ||
      status.includes('confirm')
    ) {
      return darkMode
        ? 'bg-amber-300/10 text-amber-200'
        : 'bg-amber-50 text-amber-700';
    }

    return darkMode
      ? 'bg-[#303030] text-[#D0D0D0]'
      : 'bg-[#F0EEE5] text-[#68786D]';
  };

  const formatDate = (value) => {
    if (!value) return '';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return '';

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatCurrency = (value) =>
    `₹${Number(value ?? 0).toLocaleString('en-IN')}`;

  if (loading) {
    return (
      <main className={`min-h-screen px-4 py-10 sm:px-6 lg:px-10 ${page}`}>
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className={`mb-8 h-4 w-36 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E4E9DF]'}`} />
          <div className={`mb-8 h-10 w-64 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E4E9DF]'}`} />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className={`h-80 rounded-xl border lg:col-span-2 ${card}`} />
            <div className={`h-72 rounded-xl border ${card}`} />
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className={`min-h-screen px-4 py-16 ${page}`}>
        <section className={`mx-auto max-w-xl rounded-xl border p-8 text-center sm:p-10 ${card}`}>
          <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${darkMode ? 'bg-[#242424]' : 'bg-[#EEF2E9]'}`}>
            !
          </div>

          <h1 className="font-serif text-3xl">
            Unable to find order
          </h1>

          <p className={`mt-3 text-sm leading-6 ${muted}`}>
            {error || 'The requested order could not be found.'}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={loadOrder}
              className={`rounded-md px-5 py-3 text-sm font-semibold transition ${button}`}
            >
              Try again
            </button>

            <Link
              to="/orders"
              className={`rounded-md border px-5 py-3 text-sm font-semibold ${border}`}
            >
              My orders
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const rawItems =
    order.items ?? order.orderItems ?? order.products ?? [];

  const items = Array.isArray(rawItems) ? rawItems : [];

  const rawAddress =
    order.shippingAddress ?? order.address ?? {};

  const shippingAddress =
    typeof rawAddress === 'object' && rawAddress !== null
      ? rawAddress
      : {};

  const total = Number(
    order.totalAmount ?? order.total ?? order.amount ?? 0
  );

  const subtotal = Number(
    order.subtotal ?? order.itemsPrice ?? total
  );

  const shipping = Number(
    order.shippingCost ?? order.shippingPrice ?? order.shipping ?? 0
  );

  const status =
    order.orderStatus ?? order.status ?? 'Pending';

  const orderDate =
    order.createdAt ?? order.orderDate ?? order.date;

  const paymentMethod =
    order.paymentMethod ?? order.paymentType ?? 'Not specified';

  const paymentStatus =
    order.paymentStatus ?? order.paymentInfo?.status ?? 'Not specified';

  const customerName =
    shippingAddress.fullName ??
    shippingAddress.name ??
    order.fullName ??
    order.customerName;

  const addressLine =
    shippingAddress.address ??
    shippingAddress.street ??
    shippingAddress.addressLine1;

  const addressLine2 =
    shippingAddress.addressLine2 ??
    shippingAddress.landmark;

  const city = shippingAddress.city ?? order.city;
  const state = shippingAddress.state ?? order.state;

  const pincode =
    shippingAddress.pincode ??
    shippingAddress.zipCode ??
    order.pincode;

  const phone = shippingAddress.phone ?? order.phone;

  const displayAddress = [
    city,
    state,
    pincode,
  ].filter(Boolean).join(', ');

  return (
    <main className={`min-h-screen px-4 py-8 transition-colors duration-300 sm:px-6 sm:py-12 lg:px-10 ${page}`}>
      <div className="mx-auto max-w-5xl">

        <Link
          to="/orders"
          className={`mb-7 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-70 ${accent}`}
        >
          <span aria-hidden="true">←</span>
          Back to my orders
        </Link>

        <header className={`mb-8 border-b pb-7 ${border}`}>
          <p className={`mb-3 text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
            YOUR PURCHASE
          </p>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
                Order Details
              </h1>

              <p className={`mt-3 break-all text-sm ${muted}`}>
                Order ID: {order._id ?? order.id ?? order.orderId ?? id}
              </p>

              {orderDate && (
                <p className={`mt-2 text-sm ${muted}`}>
                  Placed on {formatDate(orderDate) || 'Date unavailable'}
                </p>
              )}
            </div>

            <div className={`w-fit min-w-44 rounded-lg border p-4 ${card}`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${muted}`}>
                ORDER STATUS
              </p>

              <span className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(status)}`}>
                {String(status).replace(/[_-]/g, ' ')}
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          <section className="space-y-6 lg:col-span-2">

            <div className={`overflow-hidden rounded-xl border ${card}`}>
              <div className={`border-b px-5 py-5 sm:px-6 ${border}`}>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${accent}`}>
                  YOUR PURCHASE
                </p>

                <h2 className="mt-2 font-serif text-2xl">
                  Ordered products
                </h2>

                <p className={`mt-1 text-sm ${muted}`}>
                  {items.length} {items.length === 1 ? 'item' : 'items'} in this order
                </p>
              </div>

              {items.length === 0 ? (
                <p className={`p-6 text-sm ${muted}`}>
                  No product information is available for this order.
                </p>
              ) : (
                <div className="divide-y divide-current/10 px-5 sm:px-6">
                  {items.map((item, index) => {
                    const product = item.product ?? item;

                    const name =
                      product.name ?? product.title ?? 'Product';

                    const image =
                      product.imageUrl ??
                      product.image ??
                      product.images?.[0] ??
                      '';

                    const quantity = Number(
                      item.quantity ?? item.qty ?? 1
                    );

                    const price = Number(
                      item.price ?? product.price ?? 0
                    );

                    return (
                      <div
                        key={item._id ?? item.id ?? index}
                        className="flex gap-4 py-5"
                      >
                        <div className={`flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-28 sm:w-28 ${darkMode ? 'bg-[#242424]' : 'bg-[#F5F3EC]'}`}>
                          {image ? (
                            <img
                              src={image}
                              alt={name}
                              loading="lazy"
                              className="h-full w-full object-contain p-3"
                            />
                          ) : (
                            <span className="text-3xl" aria-hidden="true">
                              📦
                            </span>
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <h3 className="line-clamp-2 font-serif text-lg leading-snug">
                            {name}
                          </h3>

                          <p className={`mt-2 text-sm ${muted}`}>
                            Quantity: {quantity}
                          </p>

                          <p className={`mt-3 font-semibold ${accent}`}>
                            {formatCurrency(price * quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <section className={`rounded-xl border p-5 sm:p-6 ${card}`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${accent}`}>
                DELIVERY INFORMATION
              </p>

              <h2 className="mt-2 font-serif text-2xl">
                Shipping address
              </h2>

              <div className={`mt-5 space-y-2 text-sm leading-6 ${muted}`}>
                <p className="text-base font-semibold text-current">
                  {customerName || 'Customer'}
                </p>

                <p>
                  {addressLine ??
                    (typeof rawAddress === 'string' ? rawAddress : '') ??
                    'Address not available'}
                </p>

                {addressLine2 && <p>{addressLine2}</p>}

                {displayAddress && <p>{displayAddress}</p>}

                {phone && <p>Phone: {phone}</p>}

                {!addressLine &&
                  typeof rawAddress !== 'string' &&
                  !city &&
                  !state &&
                  !pincode && (
                    <p>Full delivery address is not available.</p>
                  )}
              </div>
            </section>

          </section>

          <aside className="space-y-6">

            <section className={`rounded-xl border p-5 sm:p-6 ${card}`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${accent}`}>
                ORDER BREAKDOWN
              </p>

              <h2 className="mt-2 font-serif text-2xl">
                Payment details
              </h2>

              <div className={`mt-6 space-y-4 text-sm ${muted}`}>
                <div className="flex items-start justify-between gap-4">
                  <span>Payment method</span>
                  <span className="max-w-[55%] text-right font-medium capitalize text-current">
                    {typeof paymentMethod === 'object'
                      ? paymentMethod.name ?? paymentMethod.type ?? 'Not specified'
                      : String(paymentMethod).replace(/[_-]/g, ' ')}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Payment status</span>
                  <span className="max-w-[55%] text-right font-medium capitalize text-current">
                    {typeof paymentStatus === 'object'
                      ? paymentStatus.status ?? 'Not specified'
                      : String(paymentStatus).replace(/[_-]/g, ' ')}
                  </span>
                </div>

                <div className={`border-t pt-4 ${border}`}>
                  <div className="flex justify-between gap-3">
                    <span>Subtotal</span>
                    <span className="text-current">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between gap-3">
                    <span>Shipping</span>
                    <span className="text-current">
                      {formatCurrency(shipping)}
                    </span>
                  </div>
                </div>

                <div className={`flex items-center justify-between gap-3 border-t pt-4 ${border}`}>
                  <span className="font-semibold text-current">
                    Total
                  </span>

                  <span className={`text-xl font-semibold ${accent}`}>
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <p className={`mt-5 border-t pt-4 text-xs leading-5 ${muted} ${border}`}>
                Payment and order information is displayed as returned by your existing order API.
              </p>
            </section>

            <Link
              to="/products"
              className={`flex w-full items-center justify-center gap-2 rounded-md px-5 py-3.5 text-sm font-semibold transition ${button}`}
            >
              Continue shopping
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/orders"
              className={`flex w-full items-center justify-center rounded-md border px-5 py-3.5 text-sm font-semibold transition hover:opacity-70 ${border}`}
            >
              View all orders
            </Link>

          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;
