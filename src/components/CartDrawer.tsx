import { useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { CartItem, CheckoutDetails } from '../types/menu';
import { formatCurrency } from '../utils/currency';
import { CheckoutForm } from './CheckoutForm';
import { DishImage } from './DishImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  total: number;
  checkoutDetails: CheckoutDetails;
  onChangeCheckoutDetails: (next: CheckoutDetails) => void;
  onClose: () => void;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  totalItems,
  subtotal,
  total,
  checkoutDetails,
  onChangeCheckoutDetails,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
}: CartDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex items-end justify-end md:items-stretch"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel (Bottom sheet on mobile, right slide-over on desktop) */}
      <div className="animate-drawer-sheet relative z-10 flex max-h-[90dvh] w-full flex-col rounded-t-3xl border-t border-white/[0.1] bg-[#141414] shadow-[0_-20px_60px_rgba(0,0,0,0.75)] md:h-full md:max-h-none md:max-w-md md:rounded-none md:border-t-0 md:border-l">
        {/* Mobile Sheet Handle */}
        <div className="flex justify-center pt-3 pb-1 md:hidden" aria-hidden="true">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        {/* Drawer Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4">
          <div>
            <h2
              id="cart-drawer-title"
              className="font-display text-xl font-bold text-white"
            >
              Your Order
            </h2>
            <p className="mt-0.5 text-xs text-[#B8B8B8] tabular-nums">
              {totalItems === 0
                ? 'Your cart is empty'
                : `${totalItems} ${totalItems === 1 ? 'item' : 'items'} selected`}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="inline-flex min-h-[44px] cursor-pointer items-center rounded-lg px-2.5 text-xs font-medium text-[#B8B8B8] transition-colors hover:bg-[#202020] hover:text-white whitespace-nowrap"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart"
              className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-xl text-[#B8B8B8] transition-colors hover:bg-[#202020] hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#171717] text-[#E59B3B]">
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#B8B8B8]">
              Explore our tandoor starters, rich curries, and biryanis to start building your order.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl bg-[#E59B3B] px-6 py-2.5 text-sm font-semibold text-[#0B0B0B] transition-colors hover:bg-[#F5C16C] active:scale-[0.98] whitespace-nowrap"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {/* Itemized List */}
            <ul className="divide-y divide-white/[0.07]" aria-label="Cart items">
              {items.map(({ item, quantity }) => {
                const lineTotal = item.price * quantity;
                return (
                  <li key={item.id} className="flex gap-3.5 py-4 first:pt-1">
                    <DishImage
                      src={item.image}
                      alt={item.name}
                      category={item.category}
                      className="h-16 w-16 shrink-0 rounded-xl border border-white/[0.06]"
                    />

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-white">
                            {item.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-[#B8B8B8] tabular-nums">
                            {formatCurrency(item.price)} each
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="-mt-1.5 -mr-1.5 inline-flex min-h-[40px] min-w-[40px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#B8B8B8]/80 transition-colors hover:bg-[#202020] hover:text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between gap-3">
                        <div
                          role="group"
                          aria-label={`Adjust quantity for ${item.name}`}
                          className="inline-flex items-center rounded-lg border border-white/[0.1] bg-[#202020]"
                        >
                          <button
                            type="button"
                            onClick={() => onDecrease(item.id)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-l-lg text-[#F5C16C] transition-colors hover:bg-white/[0.06]"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="min-w-7 text-center text-xs font-semibold text-white tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onIncrease(item.id)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-r-lg text-[#F5C16C] transition-colors hover:bg-white/[0.06]"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-white tabular-nums">
                          {formatCurrency(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Order Totals */}
            <div className="mt-4 space-y-2 border-t border-white/[0.08] pt-4 text-sm">
              <div className="flex items-center justify-between text-[#B8B8B8]">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-base font-bold text-white">
                <span>Total</span>
                <span className="text-[#F5C16C] tabular-nums">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Customer Details & WhatsApp Checkout */}
            <div className="mt-6 border-t border-white/[0.08] pt-5 pb-2">
              <h3 className="mb-3 text-sm font-semibold text-white">
                Customer Details
              </h3>
              <CheckoutForm
                items={items}
                subtotal={subtotal}
                total={total}
                details={checkoutDetails}
                onChangeDetails={onChangeCheckoutDetails}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
