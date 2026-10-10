
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

function Checkout() {
  const { darkMode } = useTheme();
  const { cart } = useCart();

  const items = Array.isArray(cart) ? cart : [];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getPrice = (item) =>
    Number(item.price ?? item.product?.price ?? 0);

  const getQuantity = (item) =>
    Number(item.quantity ?? 1);

  const getName = (item) =>
    item.name ?? item.title ?? item.product?.name ?? 'Product';

  const getImage = (item) =>
    item.imageUrl ??
    item.image ??
    item.product?.imageUrl ??
    item.product?.image ??
    '';

  const subtotal = items.reduce(
    (sum, item) => sum + getPrice(item) * getQuantity(item),
    0
  );

  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  const page = darkMode
    ? 'bg-[#101010] text-[#F5F5F5]'
    : 'bg-[#F8F5EC] text-[#173D30]';

  const card = darkMode
    ? 'bg-[#1A1A1A] border-[#383838]'
    : 'bg-white border-[#E4E9DF]';

  const muted = darkMode
    ? 'text-[#B5B5B5]'
    : 'text-[#68786D]';

  const accent = darkMode
    ? 'text-[#D6B887]'
    : 'text-[#047857]';

  const field = darkMode
    ? 'bg-[#242424] border-[#383838] text-white placeholder:text-[#888] focus:border-[#D6B887] focus:ring-[#D6B887]/10'
    : 'bg-[#FCFBF7] border-[#E4E9DF] text-[#173D30] placeholder:text-[#8A978D] focus:border-[#047857] focus:ring-[#047857]/10';

  const divider = darkMode
    ? 'border-[#383838]'
    : 'border-[#E4E9DF]';

  const button = darkMode
    ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
    : 'bg-[#064E3B] text-white hover:bg-[#047857]';

  const inputClass = `w-full rounded-md border px-4 py-3 text-sm outline-none transition focus:ring-4 ${field}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('Your cart is empty. Please add products first.');
      return;
    }

    const {
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pincode,
    } = formData;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      setError('Please fill in all delivery details.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode.trim())) {
      setError('Please enter a valid 6-digit PIN code.');
      return;
    }

    setLoading(true);

    try {
      // Order creation API is not connected yet.
      // Do not show success or clear the cart without a real API response.
      setError(
        'Order placement is not connected yet. Please connect your existing order API before placing an order.'
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to place your order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      name: 'fullName',
      label: 'Full name',
      placeholder: 'Enter your full name',
      autoComplete: 'name',
      span: true,
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      placeholder: 'you@example.com',
      autoComplete: 'email',
    },
    {
      name: 'phone',
      label: 'Phone number',
      type: 'tel',
      placeholder: '10-digit mobile number',
      autoComplete: 'tel',
      inputMode: 'numeric',
      maxLength: 10,
    },
    {
      name: 'address',
      label: 'Street address',
      placeholder: 'House number, street and area',
      autoComplete: 'street-address',
      span: true,
      multiline: true,
    },
    {
      name: 'city',
      label: 'City',
      placeholder: 'Enter your city',
      autoComplete: 'address-level2',
    },
    {
      name: 'state',
      label: 'State',
      placeholder: 'Enter your state',
      autoComplete: 'address-level1',
    },
    {
      name: 'pincode',
      label: 'PIN code',
      placeholder: '6-digit PIN code',
      autoComplete: 'postal-code',
      inputMode: 'numeric',
      maxLength: 6,
      span: true,
    },
  ];

  if (items.length === 0) {
    return (
      <main className={`min-h-screen px-4 py-16 ${page}`}>
        <div
          className={`mx-auto max-w-lg rounded-xl border p-8 text-center sm:p-12 ${card}`}
        >
          <p className={`mb-4 text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
            SHOPKART
          </p>

          <div className="mb-5 text-4xl" aria-hidden="true">
            🛍
          </div>

          <h1 className="font-serif text-3xl">
            Your cart is empty
          </h1>

          <p className={`mt-3 text-sm leading-6 ${muted}`}>
            Add some products to your bag before continuing to checkout.
          </p>

          <Link
            to="/products"
            className={`mt-7 inline-flex rounded-md px-6 py-3.5 text-sm font-semibold transition ${button}`}
          >
            Explore the collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors duration-300 sm:px-6 sm:py-12 lg:px-10 ${page}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className={`mb-8 border-b pb-7 ${divider}`}>
          <p className={`mb-3 text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
            ALMOST YOURS
          </p>

          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Checkout
          </h1>

          <p className={`mt-3 max-w-xl text-sm leading-6 ${muted}`}>
            Confirm your delivery details and review your order before
            completing your purchase.
          </p>

          <div className={`mt-6 flex flex-wrap items-center gap-3 text-xs ${muted}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-full font-bold ${
              darkMode ? 'bg-[#D6B887] text-[#171717]' : 'bg-[#064E3B] text-white'
            }`}>
              1
            </span>
            <span className="font-semibold">Delivery details</span>
            <span aria-hidden="true">—</span>
            <span>Order review</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px]"
        >
          <section className={`rounded-xl border p-5 sm:p-8 ${card}`}>
            <div className={`mb-7 flex items-start gap-4 border-b pb-6 ${divider}`}>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold ${
                darkMode ? 'bg-[#29251E] text-[#D6B887]' : 'bg-[#EEF2E9] text-[#064E3B]'
              }`}>
                01
              </div>

              <div>
                <h2 className="font-serif text-2xl">
                  Delivery information
                </h2>
                <p className={`mt-2 text-sm leading-6 ${muted}`}>
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              {inputFields.map((input) => (
                <div
                  key={input.name}
                  className={input.span ? 'sm:col-span-2' : ''}
                >
                  <label
                    htmlFor={input.name}
                    className="mb-2 block text-sm font-semibold"
                  >
                    {input.label}
                    <span className={`ml-1 ${accent}`}>*</span>
                  </label>

                  {input.multiline ? (
                    <textarea
                      id={input.name}
                      name={input.name}
                      rows={3}
                      value={formData[input.name]}
                      onChange={handleChange}
                      placeholder={input.placeholder}
                      autoComplete={input.autoComplete}
                      required
                      className={`${inputClass} resize-y`}
                    />
                  ) : (
                    <input
                      id={input.name}
                      name={input.name}
                      type={input.type || 'text'}
                      value={formData[input.name]}
                      onChange={handleChange}
                      placeholder={input.placeholder}
                      autoComplete={input.autoComplete}
                      inputMode={input.inputMode}
                      maxLength={input.maxLength}
                      required
                      className={inputClass}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-500"
              >
                {error}
              </div>
            )}

            <div className={`mt-8 border-t pt-6 ${divider}`}>
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-md px-5 py-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${button}`}
              >
                {loading ? 'Processing...' : 'Place Order →'}
              </button>

              <p className={`mt-3 text-xs leading-5 ${muted}`}>
                Your order can only be confirmed after the backend successfully
                creates it.
              </p>
            </div>
          </section>

          <aside className={`rounded-xl border p-5 sm:p-6 lg:sticky lg:top-24 ${card}`}>
            <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${accent}`}>
              YOUR SELECTION
            </p>

            <h2 className="mt-2 font-serif text-2xl">
              Order summary
            </h2>

            <div className={`mt-6 max-h-80 space-y-4 overflow-y-auto border-b pb-5 ${divider}`}>
              {items.map((item, index) => {
                const image = getImage(item);
                const quantity = getQuantity(item);

                return (
                  <div
                    key={item._id ?? item.id ?? index}
                    className="flex items-center gap-3"
                  >
                    <div className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-md ${
                      darkMode ? 'bg-[#242424]' : 'bg-[#F5F3EC]'
                    }`}>
                      {image ? (
                        <img
                          src={image}
                          alt={getName(item)}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-2xl" aria-hidden="true">
                          📦
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-semibold">
                        {getName(item)}
                      </p>
                      <p className={`mt-1 text-xs ${muted}`}>
                        Quantity: {quantity}
                      </p>
                      <p className={`mt-1 text-xs ${muted}`}>
                        ₹{getPrice(item).toLocaleString('en-IN')} each
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold">
                      ₹{(getPrice(item) * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={`space-y-4 border-b py-5 ${divider}`}>
              <div className={`flex justify-between gap-4 text-sm ${muted}`}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className={`flex justify-between gap-4 text-sm ${muted}`}>
                <span>Shipping</span>
                <span>
                  {shipping === 0
                    ? 'Free'
                    : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>

              {subtotal > 0 && subtotal < 999 && (
                <p className={`text-xs leading-5 ${muted}`}>
                  Add ₹{(999 - subtotal).toLocaleString('en-IN')} more
                  for free shipping.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 py-5">
              <span className="font-semibold">Estimated total</span>

              <span className={`font-serif text-2xl font-bold ${
                darkMode ? 'text-[#D6B887]' : 'text-[#064E3B]'
              }`}>
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>

            <Link
              to="/cart"
              className={`block text-center text-sm font-semibold transition hover:opacity-70 ${accent}`}
            >
              ← Return to cart
            </Link>

            <div className={`mt-6 border-t pt-5 ${divider}`}>
              <p className={`text-xs leading-6 ${muted}`}>
                The displayed total is an estimate. The backend should validate
                product prices and shipping before creating the order.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
