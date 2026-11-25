import { memo } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { MenuItem } from '../types/menu';
import { formatCurrency } from '../utils/currency';
import { DishImage } from './DishImage';

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: (item: MenuItem) => void;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
}

function DietaryMark({ isVeg }: { isVeg: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B8B8B8]">
      <span
        aria-hidden="true"
        className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
          isVeg ? 'border-emerald-400/90' : 'border-rose-400/90'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isVeg ? 'bg-emerald-400' : 'bg-rose-400'
          }`}
        />
      </span>
      <span>{isVeg ? 'Veg' : 'Non-Veg'}</span>
    </span>
  );
}

export const MenuCard = memo(function MenuCard({
  item,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: MenuCardProps) {
  const actionControl =
    quantity === 0 ? (
      <button
        type="button"
        onClick={() => onAdd(item)}
        aria-label={`Add ${item.name} to cart for ${formatCurrency(item.price)}`}
        className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#E59B3B]/45 bg-[#E59B3B]/12 px-4 py-2 text-sm font-semibold text-[#F5C16C] transition-all duration-150 hover:border-[#E59B3B] hover:bg-[#E59B3B] hover:text-[#0B0B0B] active:scale-[0.97] whitespace-nowrap sm:w-auto sm:min-w-[96px]"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        <span>Add</span>
      </button>
    ) : (
      <div
        role="group"
        aria-label={`Quantity for ${item.name}`}
        className="inline-flex min-h-[44px] w-full items-center justify-between rounded-xl border border-[#E59B3B]/60 bg-[#202020] p-0.5 sm:w-auto sm:min-w-[112px]"
      >
        <button
          type="button"
          onClick={() => onDecrease(item.id)}
          aria-label={`Decrease quantity of ${item.name}`}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#F5C16C] transition-colors duration-150 hover:bg-[#E59B3B]/15 active:scale-95"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span
          aria-live="polite"
          className="min-w-6 text-center text-sm font-semibold text-white tabular-nums"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => onIncrease(item.id)}
          aria-label={`Increase quantity of ${item.name}`}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#F5C16C] transition-colors duration-150 hover:bg-[#E59B3B]/15 active:scale-95"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );

  return (
    <article className="group flex flex-row gap-4 rounded-2xl border border-white/[0.08] bg-[#171717] p-4 transition-all duration-200 sm:flex-col sm:gap-0 sm:overflow-hidden sm:p-0 sm:hover:-translate-y-0.5 sm:hover:border-white/[0.15] sm:hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)]">
      {/* Desktop / Tablet Top Image */}
      <div className="hidden aspect-[4/3] w-full overflow-hidden sm:block">
        <DishImage
          src={item.image}
          alt={item.name}
          category={item.category}
          className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Main Dish Info */}
      <div className="flex min-w-0 flex-1 flex-col sm:p-5">
        {/* Clean Unboxed Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#B8B8B8]">
          <DietaryMark isVeg={item.isVeg} />
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <span>{item.category}</span>
          {item.isBestseller && (
            <>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="font-semibold text-[#F5C16C]">Bestseller</span>
            </>
          )}
        </div>

        <h3 className="mt-2 text-base font-semibold leading-snug text-white sm:text-[1.05rem]">
          {item.name}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-[#B8B8B8] line-clamp-2">
          {item.description}
        </p>

        {/* Price + Desktop Action Baseline */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="text-base font-semibold text-white tabular-nums sm:text-[1.05rem]">
            {formatCurrency(item.price)}
          </span>
          <div className="hidden sm:block">{actionControl}</div>
        </div>
      </div>

      {/* Mobile Right Thumbnail + Thumb-Friendly Action */}
      <div className="flex w-28 shrink-0 flex-col justify-between gap-2.5 sm:hidden">
        <DishImage
          src={item.image}
          alt={item.name}
          category={item.category}
          className="h-24 w-28 rounded-xl border border-white/[0.06]"
        />
        {actionControl}
      </div>
    </article>
  );
});
