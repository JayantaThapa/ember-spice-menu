import { SearchX } from 'lucide-react';
import type { MenuItem } from '../types/menu';
import { MenuCard } from './MenuCard';

interface MenuGridProps {
  items: MenuItem[];
  getItemQuantity: (itemId: string) => number;
  onAdd: (item: MenuItem) => void;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onResetFilters: () => void;
  searchQuery: string;
}

export function MenuGrid({
  items,
  getItemQuantity,
  onAdd,
  onIncrease,
  onDecrease,
  onResetFilters,
  searchQuery,
}: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#171717] px-6 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#202020] text-[#E59B3B]">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-white">
          No matching dishes found
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[#B8B8B8]">
          {searchQuery.trim()
            ? `We couldn't find anything matching "${searchQuery.trim()}". Try a different dish name or browse all categories.`
            : 'There are currently no dishes in this category.'}
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl bg-[#E59B3B] px-5 py-2.5 text-sm font-semibold text-[#0B0B0B] transition-colors duration-150 hover:bg-[#F5C16C] active:scale-[0.98] whitespace-nowrap"
        >
          Show All Dishes
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          quantity={getItemQuantity(item.id)}
          onAdd={onAdd}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </div>
  );
}
