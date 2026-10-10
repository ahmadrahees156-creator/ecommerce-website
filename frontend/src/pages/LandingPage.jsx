
import { Link } from 'react-router-dom';

const categories = [
  {
    number: '01',
    title: 'Tech that',
    secondLine: 'moves you.',
    label: 'TECHNOLOGY',
    symbol: '⌘',
    bg: 'bg-[#DCEDE1]',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '02',
    title: 'Everyday,',
    secondLine: 'reimagined.',
    label: 'LIFESTYLE',
    symbol: '✳',
    bg: 'bg-[#E9E1D3]',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '03',
    title: 'Wear your',
    secondLine: 'own story.',
    label: 'STYLE',
    symbol: '✦',
    bg: 'bg-[#E5E1F0]',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  },
];

function LandingPage() {
  return (
    <main className="overflow-hidden bg-[#F8F5EC] text-[#0B211B]">

      {/* EDITORIAL HERO */}
      <section className="px-5 pb-16 pt-8 sm:px-8 md:px-12 md:pb-24 lg:px-20">
        <div className="mx-auto max-w-[1440px]">

          <div className="mb-10 flex items-center justify-between border-b border-[#0B211B]/20 pb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] sm:text-xs">
              SHOPKART® / DISCOVER MORE
            </p>

            <p className="hidden text-xs font-medium uppercase tracking-[0.2em] text-[#52635A] sm:block">
              Objects for everyday living
            </p>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#064E3B] text-lg text-white">
              ↘
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-5">

            {/* LEFT TYPOGRAPHY */}
            <div className="relative z-10 lg:col-span-7">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#047857]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#047857]">
                  A fresh perspective on shopping
                </p>
              </div>

              <h1 className="text-[clamp(3.6rem,10vw,8.8rem)] font-black leading-[0.78] tracking-[-0.085em]">
                FIND
                <br />
                YOUR
                <br />
                <span className="font-serif font-normal italic text-[#047857]">
                  everyday
                </span>
                <br />
                <span className="flex items-center gap-3">
                  <span>ICON.</span>
                  <span className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#DCEDE1] text-xl tracking-normal sm:h-16 sm:w-16 sm:text-3xl">
                    ✳
                  </span>
                </span>
              </h1>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:items-end">
                <p className="max-w-sm text-sm leading-7 text-[#52635A] sm:text-base">
                  Good design. Useful things. Unexpected finds.
                  Explore a collection built around the way you
                  actually live.
                </p>

                <div className="flex flex-wrap gap-3 sm:justify-start">
                  <Link
                    to="/products"
                    className="group inline-flex items-center gap-4 rounded-full bg-[#064E3B] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-[#047857]"
                  >
                    Explore collection
                    <span className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </Link>

                  <Link
                    to="/home"
                    className="inline-flex items-center gap-2 rounded-full border border-[#064E3B]/25 px-5 py-4 text-xs font-bold uppercase tracking-wider transition hover:bg-white"
                  >
                    Shop <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT ART DIRECTION */}
            <div className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:ml-auto lg:max-w-none">

              <div className="absolute -right-4 top-0 h-28 w-28 rounded-full bg-[#DCEDE1] sm:-right-7 sm:h-40 sm:w-40" />

              <div className="relative z-10 grid grid-cols-5 grid-rows-[100px_140px_125px] gap-2 sm:grid-rows-[130px_190px_160px]">

                <div className="col-span-3 row-span-2 overflow-hidden rounded-t-[100px] rounded-b-[1.5rem] bg-[#DCEDE1]">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"
                    alt="Statement sneakers"
                    className="h-full w-full object-cover transition duration-700 hover:scale-110"
                  />
                </div>

                <div className="col-span-2 flex flex-col justify-between rounded-[1.5rem] bg-[#064E3B] p-4 text-white sm:p-5">
                  <span className="text-xl">✳</span>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                      Curated for you
                    </p>
                    <p className="mt-2 text-lg font-black leading-tight sm:text-2xl">
                      Less ordinary.
                    </p>
                  </div>
                </div>

                <div className="col-span-2 overflow-hidden rounded-[1.5rem] bg-[#E9E1D3]">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85"
                    alt="Minimal wristwatch"
                    className="h-full w-full object-cover transition duration-700 hover:scale-110"
                  />
                </div>

                <div className="col-span-3 flex items-center justify-between rounded-[1.5rem] bg-[#D9C9AC] px-4 sm:px-6">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em]">
                      The new edit
                    </p>
                    <p className="mt-2 text-lg font-black sm:text-2xl">
                      Your kind of good.
                    </p>
                  </div>
                  <span className="text-3xl sm:text-4xl">↗</span>
                </div>

                <div className="col-span-2 flex items-center justify-center rounded-[1.5rem] bg-[#E5E1F0]">
                  <span className="text-5xl sm:text-6xl">✦</span>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-3 z-20 rotate-[-5deg] rounded-full border border-[#064E3B]/15 bg-[#F8F5EC] px-5 py-3 shadow-lg sm:-left-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Your next favourite ↗
                </p>
              </div>

              <p className="mt-10 text-right text-[9px] font-bold uppercase tracking-[0.3em] text-[#52635A]">
                FIG. 001 — THE DAILY EDIT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RUNNING STRIP */}
      <div className="overflow-hidden bg-[#064E3B] py-4 text-white">
        <div className="flex min-w-max animate-[marquee_24s_linear_infinite] items-center gap-8">
          {Array.from({ length: 4 }, (_, i) => (
            <p
              key={i}
              className="flex items-center gap-8 text-xs font-black uppercase tracking-[0.2em] sm:text-sm"
            >
              GOOD FINDS ONLY
              <span className="text-[#B7D9C2]">✳</span>
              DISCOVER YOUR NEXT FAVOURITE
              <span className="text-[#B7D9C2]">✳</span>
              SHOP DIFFERENT
              <span className="text-[#B7D9C2]">✳</span>
            </p>
          ))}
        </div>
      </div>

      {/* BENTO DISCOVERY SECTION */}
      <section className="px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1440px]">

          <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#047857]">
                01 / THE COLLECTION
              </p>

              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl md:text-7xl">
                NOT JUST
                <br />
                <span className="font-serif font-normal italic text-[#047857]">
                  another shop.
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-5 md:items-end">
              <p className="max-w-sm text-sm leading-7 text-[#52635A] md:text-right">
                From little everyday upgrades to things you never
                knew you needed. Find your next favourite in
                our curated collections.
              </p>

              <Link
                to="/products"
                className="group inline-flex items-center gap-3 self-start text-xs font-black uppercase tracking-[0.15em] md:self-end"
              >
                See everything
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#064E3B]/25 transition group-hover:bg-[#064E3B] group-hover:text-white">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-12">

            {/* LARGE FEATURE */}
            <Link
              to="/products"
              className="group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#DCEDE1] p-6 sm:min-h-[440px] sm:p-9 md:col-span-7"
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85"
                alt="Headphones collection"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B211B]/75 via-transparent to-[#0B211B]/10" />

              <div className="relative flex h-full min-h-[310px] flex-col justify-between text-white sm:min-h-[380px]">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-white/40 bg-black/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur">
                    THE TECH EDIT
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F5EC] text-xl text-[#064E3B] transition duration-300 group-hover:rotate-45">
                    ↗
                  </span>
                </div>

                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/75">
                    Made for your everyday
                  </p>
                  <h3 className="max-w-lg text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                    TECH THAT
                    <br />
                    FEELS RIGHT.
                  </h3>
                  <p className="mt-4 text-sm text-white/80">
                    Discover the things that keep you connected.
                  </p>
                </div>
              </div>
            </Link>

            {/* STACKED CARDS */}
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">

              <Link
                to="/products"
                className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#E9E1D3] p-6 sm:min-h-[300px] md:min-h-0 md:flex-1 md:p-8"
              >
                <div className="absolute -right-6 -top-7 h-36 w-36 rounded-full border-[22px] border-white/30 transition duration-500 group-hover:scale-125" />

                <div className="relative flex items-start justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    02 / LIFESTYLE
                  </span>
                  <span className="text-xl transition group-hover:rotate-45">
                    ↗
                  </span>
                </div>

                <div className="relative mt-16 sm:mt-20 md:mt-8">
                  <h3 className="text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl">
                    LITTLE THINGS.
                    <br />
                    BIG FEELING.
                  </h3>
                  <p className="mt-3 text-sm text-[#52635A]">
                    Give your everyday a fresh perspective.
                  </p>
                </div>
              </Link>

              <Link
                to="/products"
                className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#DCEDE1] p-6 sm:min-h-[300px] md:min-h-0 md:flex-1 md:p-8"
              >
                <div className="absolute -bottom-12 -right-5 h-40 w-40 rounded-full bg-[#047857]/10 transition duration-500 group-hover:scale-125" />

                <div className="relative flex items-start justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    03 / YOUR STYLE
                  </span>
                  <span className="text-xl transition group-hover:rotate-45">
                    ↗
                  </span>
                </div>

                <div className="relative mt-16 sm:mt-20 md:mt-8">
                  <h3 className="text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl">
                    WEAR WHAT
                    <br />
                    FEELS YOU.
                  </h3>
                  <p className="mt-3 text-sm text-[#52635A]">
                    Make room for your own kind of style.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ASYMMETRIC CATEGORY EDIT */}
      <section className="bg-[#EDE8DC] px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1440px]">

          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#047857]">
                02 / EXPLORE BY MOOD
              </p>
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">
                YOUR WORLD.
                <br />
                <span className="font-serif font-normal italic text-[#047857]">
                  Your choices.
                </span>
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-7 text-[#52635A]">
              Three different moods. Endless possibilities.
              Find the things that feel like you.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                to="/products"
                key={category.number}
                className={`${category.bg} group relative flex min-h-[350px] flex-col justify-between overflow-hidden rounded-[2rem] p-6 transition duration-300 hover:-translate-y-2 sm:min-h-[420px] sm:p-8`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-[0.2em]">
                    {category.number} / {category.label}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 transition duration-300 group-hover:rotate-45 group-hover:bg-[#064E3B] group-hover:text-white">
                    ↗
                  </span>
                </div>

                <div className="relative mt-8 flex flex-1 items-center justify-center py-5">
                  <div className="absolute h-48 w-48 rounded-full bg-white/50 transition duration-500 group-hover:scale-110 sm:h-56 sm:w-56" />

                  <img
                    src={category.image}
                    alt={category.label}
                    loading="lazy"
                    className="relative z-10 h-48 w-full rounded-2xl object-cover shadow-xl transition duration-500 group-hover:rotate-2 group-hover:scale-105 sm:h-56"
                  />

                  <span className="absolute -bottom-1 right-0 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#064E3B] text-2xl text-white shadow-lg">
                    {category.symbol}
                  </span>
                </div>

                <div className="mt-8 flex items-end justify-between gap-3">
                  <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] sm:text-3xl">
                    {category.title}
                    <br />
                    <span className="font-serif font-normal italic">
                      {category.secondLine}
                    </span>
                  </h3>

                  <span className="pb-1 text-xs font-bold uppercase tracking-wider">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING STATEMENT */}
      <section className="px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#047857]">
                03 / YOUR NEXT CHAPTER
              </p>

              <h2 className="text-5xl font-black leading-[0.85] tracking-[-0.075em] sm:text-7xl md:text-8xl">
                THE GOOD
                <br />
                <span className="font-serif font-normal italic text-[#047857]">
                  stuff
                </span>{' '}
                IS
                <br />
                OUT THERE.
              </h2>
            </div>

            <div className="md:col-span-4 md:pb-2">
              <p className="max-w-sm text-sm leading-7 text-[#52635A]">
                You bring your taste. We bring the discoveries.
                Start exploring and make the everyday a little
                less ordinary.
              </p>

              <Link
                to="/products"
                className="group mt-7 inline-flex items-center gap-4 rounded-full bg-[#064E3B] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-[#047857]"
              >
                Find your next favourite
                <span className="transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-[#0B211B]/20 pt-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">
              SHOPKART®
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#52635A]">
              Discover more. Shop differently.
            </p>
            <Link
              to="/home"
              className="text-xs font-bold transition hover:text-[#047857]"
            >
              Enter the shop ↗
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

export default LandingPage;