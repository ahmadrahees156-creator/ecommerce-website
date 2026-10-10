
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import {
  getWishlist,
  removeFromWishlist,
} from '../services/wishlistApi';

function Wishlist() {
  const { darkMode } = useTheme();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingId, setRemovingId] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [notice, setNotice] = useState('');

  const loadWishlist = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getWishlist();
      const data = response?.data ?? response;
      const wishlistItems =
        data?.products ?? data?.wishlist ?? data?.items ?? [];

      setProducts(
        Array.isArray(wishlistItems)
          ? wishlistItems.map((item) => item.product ?? item)
          : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load your wishlist. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);
      setError('');
      setNotice('');

      await removeFromWishlist(productId);

      setProducts((current) =>
        current.filter(
          (product) => (product._id ?? product.id) !== productId
        )
      );

      setNotice('Product removed from your wishlist.');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to remove this product. Please try again.'
      );
    } finally {
      setRemovingId(null);
    }
  };

  const handleAddToCart = async (product) => {
    const id = product._id ?? product.id;

    try {
      setAddingId(id);
      setError('');
      setNotice('');

      await addToCart({
        ...product,
        id,
        image: product.imageUrl ?? product.image,
      });

      setNotice(`${product.name ?? product.title ?? 'Product'} added to your cart.`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to add this product to your cart.'
      );
    } finally {
      setAddingId(null);
    }
  };

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

  const button = darkMode
    ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
    : 'bg-[#064E3B] text-white hover:bg-[#047857]';

  const getCategory = (category) => {
    if (!category) return '';

    if (typeof category === 'object') {
      return category.name ?? category.title ?? '';
    }

    return category;
  };

  if (loading) {
    return (
      <main className={`min-h-screen px-4 py-12 sm:px-6 lg:px-10 ${page}`}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 animate-pulse">
            <div className={`mb-4 h-3 w-32 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E2E7DC]'}`} />
            <div className={`h-10 w-64 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E2E7DC]'}`} />
            <div className={`mt-4 h-4 w-48 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E2E7DC]'}`} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`animate-pulse overflow-hidden rounded-xl border ${card}`}>
                <div className={`h-60 ${darkMode ? 'bg-[#242424]' : 'bg-[#F0EEE5]'}`} />
                <div className="space-y-3 p-5">
                  <div className={`h-4 w-3/4 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E2E7DC]'}`} />
                  <div className={`h-5 w-1/3 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E2E7DC]'}`} />
                  <div className={`h-10 rounded ${darkMode ? 'bg-[#303030]' : 'bg-[#E2E7DC]'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen px-4 py-8 transition-colors duration-300 sm:px-6 sm:py-12 lg:px-10 ${page}`}
    >
      <div className="mx-auto max-w-7xl">

        <header className={`mb-8 border-b pb-7 ${darkMode ? 'border-[#383838]' : 'border-[#E4E9DF]'}`}>
          <p className={`mb-3 text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
            YOUR PERSONAL COLLECTION
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
                My Wishlist
              </h1>

              <p className={`mt-3 max-w-xl text-sm leading-6 ${muted}`}>
                The pieces you love, all in one place. Keep your favourites
                close and add them to your bag whenever you're ready.
              </p>
            </div>

            <div className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm ${darkMode ? 'border-[#383838]' : 'border-[#E4E9DF'}`}>
              <span className={`text-lg ${accent}`} aria-hidden="true">♡</span>
              <span className="font-semibold">
                {products.length} {products.length === 1 ? 'saved item' : 'saved items'}
              </span>
            </div>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={loadWishlist}
              className="font-bold underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className={`mb-5 rounded-md border p-4 text-sm ${
              darkMode
                ? 'border-[#D6B887]/30 bg-[#D6B887]/10 text-[#D6B887]'
                : 'border-[#047857]/20 bg-[#047857]/5 text-[#047857]'
            }`}
          >
            {notice}
          </div>
        )}

        {products.length === 0 ? (
          <section className={`rounded-xl border px-5 py-16 text-center sm:py-24 ${card}`}>
            <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl ${
              darkMode ? 'bg-[#242424]' : 'bg-[#EEF2E9]'
            }`}>
              <span aria-hidden="true">♡</span>
            </div>

            <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${accent}`}>
              SAVED FOR LATER
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl">
              Your wishlist is waiting
            </h2>

            <p className={`mx-auto mt-4 max-w-md text-sm leading-7 ${muted}`}>
              You haven't saved any favourites yet. Browse our collection
              and add the products you'd love to come back to.
            </p>

            <Link
              to="/products"
              className={`mt-8 inline-flex items-center justify-center rounded-md px-7 py-3.5 text-sm font-semibold transition ${button}`}
            >
              Discover products →
            </Link>
          </section>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className={`text-sm ${muted}`}>
                Your saved favourites
              </p>

              <Link
                to="/products"
                className={`text-sm font-semibold transition hover:opacity-70 ${accent}`}
              >
                Continue exploring →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => {
                const id = product._id ?? product.id;
                const image = product.imageUrl ?? product.image ?? '';
                const name = product.name ?? product.title ?? 'Product';
                const price = Number(product.price ?? 0);
                const category = getCategory(product.category);

                return (
                  <article
                    key={id ?? index}
                    className={`group overflow-hidden rounded-xl border transition duration-300 hover:-translate-y-1 ${
                      darkMode
                        ? 'border-[#383838] bg-[#1A1A1A] hover:border-[#D6B887]/50'
                        : 'border-[#E4E9DF] bg-white hover:border-[#A8BBA9]'
                    }`}
                  >
                    <div className={`relative flex h-60 items-center justify-center overflow-hidden ${
                      darkMode ? 'bg-[#202020]' : 'bg-[#F5F3EC]'
                    }`}>
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          loading="lazy"
                          className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-5xl" aria-hidden="true">
                          📦
                        </span>
                      )}

                      <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                        darkMode
                          ? 'bg-[#D6B887] text-[#171717]'
                          : 'bg-[#064E3B] text-white'
                      }`}>
                        Saved
                      </span>

                      <button
                        type="button"
                        disabled={removingId === id}
                        onClick={() => handleRemove(id)}
                        aria-label={`Remove ${name} from wishlist`}
                        title="Remove from wishlist"
                        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border text-xl transition disabled:opacity-50 ${
                          darkMode
                            ? 'border-[#454545] bg-[#1A1A1A] text-[#D6B887] hover:bg-[#333333]'
                            : 'border-[#E4E9DF] bg-white text-[#064E3B] hover:bg-[#EEF2E9]'
                        }`}
                      >
                        {removingId === id ? '…' : '×'}
                      </button>
                    </div>

                    <div className="p-5">
                      {category && (
                        <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.16em] ${muted}`}>
                          {category}
                        </p>
                      )}

                      <Link to={`/products/${id}`}>
                        <h2 className="line-clamp-2 min-h-12 font-serif text-lg leading-snug transition hover:underline">
                          {name}
                        </h2>
                      </Link>

                      <p className={`mt-3 text-xl font-semibold ${accent}`}>
                        ₹{price.toLocaleString('en-IN')}
                      </p>

                      <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
                        <button
                          type="button"
                          disabled={addingId === id || removingId === id}
                          onClick={() => handleAddToCart(product)}
                          className={`rounded-md px-3 py-3 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm ${button}`}
                        >
                          {addingId === id ? 'Adding...' : 'Add to cart'}
                        </button>

                        <Link
                          to={`/products/${id}`}
                          aria-label={`View ${name}`}
                          className={`flex h-full min-w-11 items-center justify-center rounded-md border px-3 transition ${
                            darkMode
                              ? 'border-[#383838] hover:border-[#D6B887]'
                              : 'border-[#E4E9DF] hover:border-[#047857]'
                          }`}
                        >
                          →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Wishlist;