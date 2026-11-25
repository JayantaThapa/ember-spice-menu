import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  hasMobileCartBar: boolean;
}

export function Toast({ message, hasMobileCartBar }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-4 z-50 flex justify-center transition-all md:inset-x-auto md:right-6 md:bottom-6 ${
        hasMobileCartBar ? 'bottom-20' : 'bottom-5'
      }`}
    >
      <div className="animate-ember-fade-up inline-flex items-center gap-2.5 rounded-xl border border-[#E59B3B]/40 bg-[#1B1B1B]/95 px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_32px_rgba(0,0,0,0.65)] backdrop-blur-md">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E59B3B] text-[#0B0B0B]">
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span>{message}</span>
      </div>
    </div>
  );
}
