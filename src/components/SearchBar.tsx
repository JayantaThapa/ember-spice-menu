import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (nextValue: string) => void;
  resultCount: number;
  totalCount: number;
}

export function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchBarProps) {
  const hasQuery = value.trim().length > 0;

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <Search
          className="pointer-events-none absolute left-4 h-4 w-4 text-[#B8B8B8]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search dishes, descriptions, or categories..."
          aria-label="Search menu items"
          className="min-h-[48px] w-full rounded-xl border border-white/[0.09] bg-[#171717] py-3 pr-12 pl-11 text-sm text-white placeholder-[#B8B8B8]/70 transition-colors duration-150 hover:border-white/[0.16] focus:border-[#E59B3B] focus:outline-none sm:text-base"
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-1.5 inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-lg text-[#B8B8B8] transition-colors duration-150 hover:bg-[#202020] hover:text-white active:scale-[0.96]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {hasQuery && (
        <p className="mt-2 text-xs text-[#B8B8B8] tabular-nums" aria-live="polite">
          Showing {resultCount} of {totalCount} dishes for &ldquo;{value.trim()}&rdquo;
        </p>
      )}
    </div>
  );
}
