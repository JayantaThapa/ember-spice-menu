import { ChevronRight, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface CartBarProps {
  totalItems: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export function CartBar({ totalItems, totalPrice, onOpenCart }: CartBarProps) {
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-3 pt-2 md:hidden pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-lg animate-ember-fade-up">
        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`View cart: ${totalItems} ${totalItems === 1 ? 'item' : 'items'}, total ${formatCurrency(totalPrice)}`}
          className="flex h-[54px] w-full cursor-pointer items-center justify-between gap-3 rounded-2xl bg-[#E59B3B] px-4 text-[#0B0B0B] shadow-[0_12px_32px_rgba(0,0,0,0.65)] transition-transform duration-150 hover:bg-[#F5C16C] active:scale-[0.98]"
        >
          <span className="flex items-center gap-3 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B0B0B]/15">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="flex items-baseline gap-2 truncate">
              <span className="text-sm font-bold tabular-nums whitespace-nowrap">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
              <span aria-hidden="true" className="text-[#0B0B0B]/45">
                ·
              </span>
              <span className="text-sm font-bold tabular-nums whitespace-nowrap">
                {formatCurrency(totalPrice)}
              </span>
            </span>
          </span>

          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold whitespace-nowrap">
            <span>View Cart</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  );
}
