import { type FormEvent, useRef, useState } from 'react';
import { Check, Copy, MessageCircle } from 'lucide-react';
import type { CartItem, CheckoutDetails } from '../types/menu';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
} from '../utils/whatsapp';

interface CheckoutFormProps {
  items: CartItem[];
  subtotal: number;
  total: number;
  details: CheckoutDetails;
  onChangeDetails: (next: CheckoutDetails) => void;
}

export function CheckoutForm({
  items,
  subtotal,
  total,
  details,
  onChangeDetails,
}: CheckoutFormProps) {
  const [nameError, setNameError] = useState('');
  const [copied, setCopied] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const whatsappLinkRef = useRef<HTMLAnchorElement>(null);

  const trimmedName = details.customerName.trim();
  const isReady = trimmedName.length > 0 && items.length > 0;

  const normalizedDetails: CheckoutDetails = {
    customerName: trimmedName,
    notes: details.notes.trim(),
  };

  const whatsappUrl = buildWhatsAppOrderUrl(
    items,
    normalizedDetails,
    subtotal,
    total
  );

  const handleValidationBlock = () => {
    setNameError('Please enter your name to send your order on WhatsApp.');
    nameInputRef.current?.focus();
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isReady) {
      handleValidationBlock();
      return;
    }
    whatsappLinkRef.current?.click();
  };

  const handleCopyMessage = async () => {
    if (!trimmedName) {
      handleValidationBlock();
      return;
    }
    const text = buildWhatsAppOrderMessage(
      items,
      normalizedDetails,
      subtotal,
      total
    );
    let success = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      success = false;
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
      <div>
        <label
          htmlFor="checkout-customer-name"
          className="block text-xs font-medium text-[#B8B8B8]"
        >
          Your Name <span className="text-[#E59B3B]">*</span>
        </label>
        <input
          ref={nameInputRef}
          id="checkout-customer-name"
          type="text"
          value={details.customerName}
          onChange={(e) => {
            onChangeDetails({ ...details, customerName: e.target.value });
            if (nameError) setNameError('');
          }}
          placeholder="e.g. Rahul"
          autoComplete="name"
          required
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? 'checkout-name-error' : undefined}
          className={`mt-1.5 min-h-[44px] w-full rounded-xl border bg-[#202020] px-3.5 py-2.5 text-sm text-white placeholder-[#B8B8B8]/60 transition-colors focus:outline-none ${
            nameError
              ? 'border-rose-400 focus:border-rose-400'
              : 'border-white/[0.1] focus:border-[#E59B3B]'
          }`}
        />
        {nameError && (
          <p
            id="checkout-name-error"
            role="alert"
            className="mt-1.5 text-xs text-rose-400"
          >
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="checkout-order-notes"
          className="block text-xs font-medium text-[#B8B8B8]"
        >
          Order Notes <span className="text-[#B8B8B8]/60">(Optional)</span>
        </label>
        <textarea
          id="checkout-order-notes"
          rows={2}
          value={details.notes}
          onChange={(e) =>
            onChangeDetails({ ...details, notes: e.target.value })
          }
          placeholder="Spice preference, allergies, or pickup time..."
          className="mt-1.5 w-full resize-none rounded-xl border border-white/[0.1] bg-[#202020] px-3.5 py-2.5 text-sm text-white placeholder-[#B8B8B8]/60 transition-colors focus:border-[#E59B3B] focus:outline-none"
        />
      </div>

      <div className="space-y-2.5 pt-1">
        {isReady ? (
          <a
            ref={whatsappLinkRef}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#E59B3B] px-5 py-3 text-sm font-semibold text-[#0B0B0B] shadow-[0_8px_24px_rgba(229,155,59,0.22)] transition-all duration-150 hover:bg-[#F5C16C] active:scale-[0.98] whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Send Order on WhatsApp</span>
          </a>
        ) : (
          <button
            type="submit"
            className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#E59B3B] px-5 py-3 text-sm font-semibold text-[#0B0B0B] shadow-[0_8px_24px_rgba(229,155,59,0.22)] transition-all duration-150 hover:bg-[#F5C16C] active:scale-[0.98] whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Send Order on WhatsApp</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleCopyMessage}
          className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-[#202020] px-4 py-2.5 text-xs font-medium text-[#B8B8B8] transition-colors duration-150 hover:border-white/[0.18] hover:text-white active:scale-[0.98] whitespace-nowrap"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span className="text-emerald-400">Order message copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copy Order Message</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-[#B8B8B8]/80">
          Opens WhatsApp with your prefilled order summary. No login required.
        </p>
      </div>
    </form>
  );
}
