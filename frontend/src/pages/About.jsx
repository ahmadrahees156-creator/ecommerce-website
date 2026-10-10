
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function About() {
  const { darkMode } = useTheme();

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

  const features = [
    {
      number: '01',
      icon: '✦',
      title: 'Quality First',
      description:
        'Discover thoughtfully selected products that balance quality, usefulness, and style.',
    },
    {
      number: '02',
      icon: '♡',
      title: 'Made for You',
      description:
        'Save your favourites, explore new finds, and make your shopping experience personal.',
    },
    {
      number: '03',
      icon: '↗',
      title: 'Simple Shopping',
      description:
        'Browse products, manage your cart, and check your orders in one convenient place.',
    },
  ];

  return (
    <main className={`min-h-screen overflow-hidden transition-colors duration-300 ${page}`}>

      {/* Hero */}
      <section className="px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20 lg:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          <div>
            <div className={`mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
              <span className={`h-px w-9 ${darkMode ? 'bg-[#D6B887]' : 'bg-[#047857]'}`} />
              The story of ShopKart
            </div>

            <h1 className="max-w-2xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Shopping should feel{' '}
              <span className={`italic ${accent}`}>simple.</span>
            </h1>

            <p className={`mt-7 max-w-lg text-base leading-8 sm:text-lg ${muted}`}>
              Welcome to ShopKart—a place to discover products,
              find your favourites, and enjoy a smoother online
              shopping experience.
            </p>

            <p className={`mt-4 max-w-lg text-sm leading-7 sm:text-base ${muted}`}>
              We believe shopping should be easy to explore,
              comfortable to use, and designed around the things
              that matter to you.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/products"
                className={`inline-flex items-center gap-3 rounded-md px-6 py-3.5 text-sm font-semibold transition duration-300 ${button}`}
              >
                Explore products
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/home"
                className={`inline-flex items-center rounded-md border px-6 py-3.5 text-sm font-semibold transition duration-300 ${
                  darkMode
                    ? 'border-[#383838] hover:border-[#D6B887]'
                    : 'border-[#D5DED2] hover:border-[#047857]'
                }`}
              >
                Back to home
              </Link>
            </div>
          </div>

          {/* Brand panel */}
          <div className={`relative min-h-[390px] overflow-hidden rounded-xl border p-7 sm:min-h-[480px] sm:p-10 ${card}`}>
            <div
              className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${
                darkMode ? 'bg-[#D6B887]/10' : 'bg-[#047857]/10'
              }`}
            />

            <div
              className={`absolute -bottom-20 -left-16 h-60 w-60 rounded-full blur-3xl ${
                darkMode ? 'bg-[#D6B887]/5' : 'bg-[#A8BBA9]/20'
              }`}
            />

            <div className="relative flex h-full min-h-[330px] flex-col justify-between sm:min-h-[400px]">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-[0.2em] ${accent}`}>
                  EST. WITH A SIMPLE IDEA
                </span>

                <span className={`text-xl ${accent}`} aria-hidden="true">
                  ✳
                </span>
              </div>

              <div className="py-12 text-center">
                <div className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border text-4xl ${
                  darkMode
                    ? 'border-[#D6B887]/40 bg-[#242424] text-[#D6B887]'
                    : 'border-[#D5DED2] bg-[#F0EEE5] text-[#064E3B]'
                }`}>
                  <span aria-hidden="true">S</span>
                </div>

                <p className={`text-xs font-bold uppercase tracking-[0.25em] ${muted}`}>
                  THE SHOPKART EXPERIENCE
                </p>

                <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
                  Find what you love.
                  <br />
                  <span className={`italic ${accent}`}>
                    Shop your way.
                  </span>
                </h2>

                <p className={`mx-auto mt-5 max-w-sm text-sm leading-7 ${muted}`}>
                  From product discovery to order details,
                  enjoy a shopping experience that keeps
                  everything within reach.
                </p>
              </div>

              <div className={`flex items-center justify-between border-t pt-5 ${darkMode ? 'border-[#383838]' : 'border-[#E4E9DF]'}`}>
                <span className={`text-xs ${muted}`}>
                  Thoughtful design
                </span>

                <span className={`text-xs font-semibold ${accent}`}>
                  Everyday discovery ↗
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand values */}
      <section className={`border-y px-5 py-16 sm:px-8 sm:py-24 ${
        darkMode
          ? 'border-[#383838] bg-[#151515]'
          : 'border-[#E4E9DF] bg-[#F1EFE5]'
      }`}>
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 grid gap-5 md:grid-cols-2 md:items-end">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
                What matters to us
              </p>

              <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">
                A better way to shop.
              </h2>
            </div>

            <p className={`max-w-md text-sm leading-7 md:justify-self-end ${muted}`}>
              The little things matter. We focus on making it
              easier to explore products, keep track of your
              favourites, and manage your shopping.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className={`group rounded-xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-8 ${
                  darkMode
                    ? 'border-[#383838] bg-[#1A1A1A] hover:border-[#D6B887]/50'
                    : 'border-[#E4E9DF] bg-white hover:border-[#A8BBA9]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold tracking-[0.15em] ${muted}`}>
                    {feature.number}
                  </span>

                  <span className={`flex h-11 w-11 items-center justify-center rounded-full text-xl transition duration-300 group-hover:scale-110 ${
                    darkMode
                      ? 'bg-[#29251E] text-[#D6B887]'
                      : 'bg-[#EEF2E9] text-[#047857]'
                  }`}>
                    {feature.icon}
                  </span>
                </div>

                <h3 className="mt-9 font-serif text-2xl">
                  {feature.title}
                </h3>

                <p className={`mt-4 text-sm leading-7 ${muted}`}>
                  {feature.description}
                </p>

                <div className={`mt-7 h-px w-10 transition-all duration-300 group-hover:w-16 ${
                  darkMode ? 'bg-[#D6B887]' : 'bg-[#047857]'
                }`} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className={`relative mx-auto max-w-6xl overflow-hidden rounded-xl border p-8 sm:p-12 lg:p-16 ${card}`}>
          <div className={`absolute -right-16 -top-20 h-64 w-64 rounded-full blur-3xl ${
            darkMode ? 'bg-[#D6B887]/10' : 'bg-[#047857]/10'
          }`} />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className={`text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
                YOUR NEXT DISCOVERY
              </p>

              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Your next favourite
                <br />
                is waiting.
              </h2>

              <p className={`mt-5 max-w-lg text-sm leading-7 ${muted}`}>
                Explore the collection, discover something new,
                and find the products that feel right for you.
              </p>
            </div>

            <Link
              to="/products"
              className={`inline-flex shrink-0 items-center gap-3 rounded-md px-7 py-4 text-sm font-semibold transition duration-300 ${button}`}
            >
              Start shopping
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default About;
