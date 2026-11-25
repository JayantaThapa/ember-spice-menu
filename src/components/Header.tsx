import { Flame, ShoppingBag } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { formatCurrency } from '../utils/currency';

interface HeaderProps {
  totalItems: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export function Header({ totalItems, totalPrice, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0B0B0B]/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-16 md:gap-8 lg:px-8">
        {/* Zone 1: Brand Lockup */}
        <a
          href="#top"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:rounded-lg"
          aria-label={`${restaurantConfig.restaurantName} — ${restaurantConfig.subtitle}`}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#E59B3B]/30 bg-[#171717] text-[#E59B3B] transition-colors duration-200 group-hover:border-[#F5C16C]/60 group-hover:text-[#F5C16C]"
          >
            <Flame className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-wide text-white whitespace-nowrap sm:text-lg">
              {restaurantConfig.restaurantName}
            </span>
            <span className="mt-0.5 text-[11px] font-normal text-[#B8B8B8] whitespace-nowrap">
              {restaurantConfig.subtitle}
            </span>
          </span>
        </a>

        {/* Zone 2: Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          <a
            href="#menu"
            className="whitespace-nowrap shrink-0 py-1 text-sm font-medium text-[#B8B8B8] transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 hover:decoration-[#E59B3B]"
          >
            Menu
          </a>
          <a
            href="#about"
            className="whitespace-nowrap shrink-0 py-1 text-sm font-medium text-[#B8B8B8] transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 hover:decoration-[#E59B3B]"
          >
            About
          </a>
          <a
            href="#contact"
            className="whitespace-nowrap shrink-0 py-1 text-sm font-medium text-[#B8B8B8] transition-colors duration-150 hover:text-white hover:underline hover:underline-offset-8 hover:decoration-[#E59B3B]"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary Cart Trigger */}
        <button
          type="button"
          onClick={onOpenCart}
          aria-label={
            totalItems > 0
              ? `Open cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}, total ${formatCurrency(totalPrice)}`
              : 'Open empty shopping cart'
          }
          className="relative inline-flex min-h-[44px] min-w-[44px] shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-white/[0.1] bg-[#171717] px-3 py-2 text-sm font-semibold text-white transition-all duration-150 hover:border-[#E59B3B]/50 hover:bg-[#202020] active:scale-[0.98] sm:px-4"
        >
          <ShoppingBag className="h-4 w-4 text-[#E59B3B]" aria-hidden="true" />
          <span className="hidden whitespace-nowrap sm:inline">Cart</span>
          {totalItems > 0 && (
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-[#E59B3B] px-1.5 text-xs font-bold text-[#0B0B0B] tabular-nums">
                {totalItems}
              </span>
              <span className="hidden text-xs font-semibold text-[#F5C16C] tabular-nums md:inline">
                {formatCurrency(totalPrice)}
              </span>
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
