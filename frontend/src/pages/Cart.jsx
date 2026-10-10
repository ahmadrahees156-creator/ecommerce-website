
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

function Cart() {
  const { darkMode } = useTheme();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const items = Array.isArray(cart) ? cart : [];

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

  const getId = (item) =>
    item._id ?? item.id ?? item.product?._id ?? item.product?.id;

  const subtotal = items.reduce(
    (total, item) => total + getPrice(item) * getQuantity(item),
    0
  );

  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;
  const itemCount = items.reduce(
    (count, item) => count + getQuantity(item),
    0
  );

  const page = darkMode
    ? 'bg-[#101010] text-[#F5F5F5]'
    : 'bg-[#F8F5EC] text-[#173D30]';

  const card = darkMode
    ? 'border-[#383838] bg-[#1A1A1A]'
    : 'border-[#E4E9DF] bg-white';

  const muted = darkMode
    ? 'text-[#B5B5B5]'
    : 'text-[#68786D]';

  const divider = darkMode
    ? 'border-[#383838]'
    : 'border-[#E4E9DF]';

  const accent = darkMode
    ? 'text-[#D6B887]'
    : 'text-[#047857]';

  const button = darkMode
    ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
    : 'bg-[#064E3B] text-white hover:bg-[#047857]';

  const quantityButton = darkMode
    ? 'border-[#454545] hover:bg-[#333333]'
    : 'border-[#DCE5DA] hover:bg-[#EEF4EC]';

  const handleDecrease = (item) => {
    if (getQuantity(item) > 1) {
      decreaseQuantity(getId(item));
    } else {
      removeFromCart(getId(item));
    }
  };

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors duration-300 sm:px-6 sm:py-12 lg:px-10 ${page}`}
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-9 flex flex-col justify-between gap-5 border-b pb-7 sm:flex-row sm:items-end">
          <div>
            <p
              className={`mb-3 text-xs font-bold uppercase tracking-[0.28em] ${accent}`}
            >
              YOUR SHOPPING BAG
            </p>

            <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
              Shopping Cart
            </h1>

            <p className={`mt-3 text-sm ${muted}`}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'} selected for you
            </p>
          </div>

          <Link
            to="/products"
            className={`inline-flex w-fit items-center gap-2 text-sm font-semibold transition hover:opacity-70 ${accent}`}
          >
            <span aria-hidden="true">←</span>
            Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <section
            className={`rounded-2xl border px-5 py-16 text-center sm:py-24 ${card}`}
          >
            <div
              className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl ${
                darkMode ? 'bg-[#242424]' : 'bg-[#EEF2E9]'
              }`}
            >
              <span aria-hidden="true">🛍</span>
            </div>

            <p className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${accent}`}>
              A LITTLE SOMETHING FOR YOU
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl">
              Your cart is waiting
            </h2>

            <p className={`mx-auto mt-4 max-w-md text-sm leading-7 ${muted}`}>
              You haven't added anything just yet. Explore our collection
              and discover pieces that feel right for you.
            </p>

            <Link
              to="/products"
              className={`mt-8 inline-flex items-center justify-center rounded-md px-7 py-3.5 text-sm font-semibold transition ${button}`}
            >
              Explore the collection
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_350px]">

            <section className={`overflow-hidden rounded-xl border ${card}`}>
              <div
                className={`hidden grid-cols-[minmax(0,1fr)_125px_110px] gap-4 border-b px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] sm:grid ${divider} ${muted}`}
              >
                <span>Product details</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div className={`divide-y ${divider}`}>
                {items.map((item, index) => {
                  const id = getId(item);
                  const image = getImage(item);
                  const quantity = getQuantity(item);
                  const price = getPrice(item);
                  const name = getName(item);

                  return (
                    <article
                      key={id ?? index}
                      className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-[minmax(0,1fr)_125px_110px] sm:items-center sm:gap-4 sm:p-6"
                    >
                      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                        <div
                          className={`flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-28 sm:w-28 ${
                            darkMode ? 'bg-[#242424]' : 'bg-[#F5F3EC]'
                          }`}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={name}
                              className="h-full w-full object-contain p-2.5"
                            />
                          ) : (
                            <span className="text-3xl" aria-hidden="true">
                              📦
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="break-words font-serif text-lg leading-snug sm:text-xl">
                            {name}
                          </h3>

                          <p className={`mt-2 text-sm ${muted}`}>
                            ₹{price.toLocaleString('en-IN')} each
                          </p>

                          <button
                            type="button"
                            onClick={() => removeFromCart(id)}
                            className={`mt-3 text-xs font-semibold underline-offset-4 transition hover:underline ${accent}`}
                          >
                            Remove item
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-center">
                        <span className={`text-xs sm:hidden ${muted}`}>
                          Quantity
                        </span>

                        <div
                          className={`flex items-center rounded-md border ${divider}`}
                        >
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${name}`}
                            onClick={() => handleDecrease(item)}
                            className={`flex h-9 w-9 items-center justify-center rounded-l-md border-r text-lg transition ${divider} ${quantityButton}`}
                          >
                            −
                          </button>

                          <span className="min-w-10 px-2 text-center text-sm font-medium">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase quantity of ${name}`}
                            onClick={() => increaseQuantity(id)}
                            className={`flex h-9 w-9 items-center justify-center rounded-r-md border-l text-lg transition ${divider} ${quantityButton}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end">
                        <span className={`text-xs sm:hidden ${muted}`}>
                          Subtotal
                        </span>

                        <span className="font-semibold tabular-nums">
                          ₹{(price * quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className={`border-t p-5 sm:px-6 sm:py-5 ${divider}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to="/products"
                    className={`text-sm font-semibold transition hover:opacity-70 ${accent}`}
                  >
                    ← Continue shopping
                  </Link>

                  <span className={`text-xs ${muted}`}>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} in your bag
                  </span>
                </div>
              </div>
            </section>

            <aside
              className={`rounded-xl border p-5 sm:p-6 lg:sticky lg:top-24 ${card}`}
            >
              <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${accent}`}>
                YOUR ORDER
              </p>

              <h2 className="mt-2 font-serif text-2xl">
                Order Summary
              </h2>

              <div className={`mt-6 space-y-4 border-b pb-5 ${divider}`}>
                <div className={`flex justify-between gap-4 text-sm ${muted}`}>
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-medium text-inherit">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className={`flex justify-between gap-4 text-sm ${muted}`}>
                  <span>Shipping</span>
                  <span className="font-medium text-inherit">
                    {shipping === 0
                      ? 'Free'
                      : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 999 && (
                  <div
                    className={`rounded-lg p-3 text-xs leading-5 ${
                      darkMode ? 'bg-[#242424]' : 'bg-[#F1F3E9]'
                    }`}
                  >
                    <p className="font-semibold">
                      You're close to free shipping!
                    </p>

                    <p className={`mt-1 ${muted}`}>
                      Add ₹{(999 - subtotal).toLocaleString('en-IN')} more
                      to qualify.
                    </p>

                    <div
                      className={`mt-3 h-1.5 overflow-hidden rounded-full ${
                        darkMode ? 'bg-[#383838]' : 'bg-[#DDE5D9]'
                      }`}
                    >
                      <div
                        className={`h-full rounded-full ${
                          darkMode ? 'bg-[#D6B887]' : 'bg-[#047857]'
                        }`}
                        style={{
                          width: `${Math.min((subtotal / 999) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {subtotal >= 999 && (
                  <p className={`text-xs ${accent}`}>
                    ✓ Your order qualifies for free shipping.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 py-5">
                <span className="font-semibold">Estimated total</span>

                <span
                  className={`font-serif text-2xl font-bold tabular-nums ${
                    darkMode ? 'text-[#D6B887]' : 'text-[#064E3B]'
                  }`}
                >
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              <Link
                to="/checkout"
                className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-4 text-sm font-bold transition ${button}`}
              >
                Proceed to checkout
                <span aria-hidden="true">→</span>
              </Link>

              <div className={`mt-5 flex items-start gap-3 text-xs leading-5 ${muted}`}>
                <span className="text-base" aria-hidden="true">♧</span>
                <p>
                  Your order total is calculated from the items currently
                  in your cart.
                </p>
              </div>

              <div className={`mt-5 border-t pt-4 text-center text-[10px] uppercase tracking-[0.15em] ${divider} ${muted}`}>
                Thank you for shopping with ShopKart
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
