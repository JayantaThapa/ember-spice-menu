import { useEffect, useRef, useState } from 'react';
import { CakeSlice, CupSoda, Flame, UtensilsCrossed } from 'lucide-react';
import type { MenuCategory } from '../types/menu';

interface DishImageProps {
  src: string;
  alt: string;
  category?: MenuCategory;
  className?: string;
  priority?: boolean;
}

export function DishImage({
  src,
  alt,
  category,
  className = '',
  priority = false,
}: DishImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [hasError, setHasError] = useState(!src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setHasError(true);
      setIsLoaded(false);
      return;
    }

    setHasError(false);
    const img = imgRef.current;
    if (img && img.complete) {
      if (img.naturalWidth > 0) {
        setIsLoaded(true);
      } else {
        setHasError(true);
        setIsLoaded(false);
      }
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const showFallback = !src || hasError;

  const FallbackIcon =
    category === 'Drinks'
      ? CupSoda
      : category === 'Desserts'
        ? CakeSlice
        : category === 'Starters' || category === 'Breads'
          ? Flame
          : UtensilsCrossed;

  if (showFallback) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#231B12] via-[#171717] to-[#111111] text-center select-none ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(229,155,59,0.22),transparent_60%)]"
        />
        <div className="relative z-10 flex flex-col items-center gap-2 px-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E59B3B]/30 bg-[#E59B3B]/10 text-[#F5C16C]">
            <FallbackIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="font-display text-xs font-semibold tracking-wide text-[#F5C16C]/90 line-clamp-1">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#202020] ${className}`}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#202020] via-[#26221D] to-[#1A1A1A]"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
