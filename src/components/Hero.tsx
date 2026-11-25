import { ArrowDown } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { DishImage } from './DishImage';

export function Hero() {
  const handleExploreClick = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#0B0B0B]"
    >
      {/* Subtle warm radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[#E59B3B]/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 sm:pt-10 sm:pb-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-12">
          {/* Copy Column */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <h1 className="font-display text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Good food.
              <br />
              <span className="text-[#F5C16C]">Good mood.</span>
            </h1>

            <p className="mt-3.5 max-w-md text-sm leading-relaxed text-[#B8B8B8] sm:mt-5 sm:text-base">
              Discover your favourites, freshly prepared with flavour and passion.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-7">
              <button
                type="button"
                onClick={handleExploreClick}
                className="inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E59B3B] px-6 py-3 text-sm font-semibold text-[#0B0B0B] shadow-[0_8px_24px_rgba(229,155,59,0.22)] transition-all duration-150 hover:bg-[#F5C16C] active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <span>Explore Menu</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>

              <span className="text-xs text-[#B8B8B8] whitespace-nowrap">
                {restaurantConfig.openingHours}
              </span>
            </div>
          </div>

          {/* Signature Food Photography */}
          <div className="lg:col-span-7">
            <div className="relative h-48 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#171717] shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:h-72 lg:h-full lg:min-h-[340px]">
              <DishImage
                src={restaurantConfig.heroImage}
                alt="EMBER & SPICE signature tandoor feast with butter chicken, chicken tikka, garlic naan, and saffron biryani"
                className="h-full w-full"
                priority
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent"
              />
              <div className="pointer-events-none absolute right-4 bottom-3 left-4 flex items-center justify-between text-xs text-white/90 sm:right-5 sm:bottom-4 sm:left-5">
                <span className="font-medium tracking-wide">
                  Tandoor · Curries · Dum Biryani
                </span>
                <span className="hidden text-[#F5C16C] sm:inline">
                  Made fresh to order
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
