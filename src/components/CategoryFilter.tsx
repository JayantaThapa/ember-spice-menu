import type { FilterCategory } from '../types/menu';

interface CategoryFilterProps {
  categories: FilterCategory[];
  selectedCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter menu by category"
      className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            aria-pressed={isActive}
            className={`inline-flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-sm whitespace-nowrap transition-all duration-150 active:scale-[0.97] ${
              isActive
                ? 'bg-[#E59B3B] font-semibold text-[#0B0B0B] shadow-[0_6px_18px_rgba(229,155,59,0.24)]'
                : 'border border-white/[0.08] bg-[#171717] font-medium text-[#B8B8B8] hover:border-white/[0.16] hover:bg-[#202020] hover:text-white'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
