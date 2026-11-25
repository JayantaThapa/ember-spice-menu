import { Clock, Flame, MapPin, MessageCircle, Phone } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { buildDirectWhatsAppUrl } from '../utils/whatsapp';

export function Footer() {
  const directWhatsAppUrl = buildDirectWhatsAppUrl();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-white/[0.08] bg-[#111111]"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Brand & Direct WhatsApp CTA */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E59B3B]/30 bg-[#171717] text-[#E59B3B]"
              >
                <Flame className="h-4 w-4" />
              </span>
              <div>
                <h2
                  id="contact-heading"
                  className="font-display text-xl font-bold tracking-wide text-white"
                >
                  {restaurantConfig.restaurantName}
                </h2>
                <p className="text-xs text-[#B8B8B8]">
                  {restaurantConfig.subtitle}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#B8B8B8]">
              Have a custom request or want to order directly? Message our kitchen on WhatsApp for quick assistance.
            </p>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#E59B3B] px-5 py-3 text-sm font-semibold text-[#0B0B0B] shadow-[0_8px_24px_rgba(229,155,59,0.2)] transition-all duration-150 hover:bg-[#F5C16C] active:scale-[0.98] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Order via WhatsApp</span>
            </a>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-7">
            <div className="rounded-2xl border border-white/[0.07] bg-[#171717] p-5">
              <Phone
                className="h-4 w-4 text-[#E59B3B]"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-xs font-semibold tracking-wider text-white">
                Phone
              </h3>
              <a
                href={`tel:${restaurantConfig.displayPhone.replace(/\s+/g, '')}`}
                className="mt-1.5 block text-sm text-[#B8B8B8] transition-colors hover:text-[#F5C16C]"
              >
                {restaurantConfig.displayPhone}
              </a>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#171717] p-5">
              <Clock
                className="h-4 w-4 text-[#E59B3B]"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-xs font-semibold tracking-wider text-white">
                Opening Hours
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#B8B8B8]">
                {restaurantConfig.openingHours}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#171717] p-5">
              <MapPin
                className="h-4 w-4 text-[#E59B3B]"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-xs font-semibold tracking-wider text-white">
                Address
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#B8B8B8]">
                {restaurantConfig.restaurantAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-[#B8B8B8]/80 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {restaurantConfig.restaurantName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#menu" className="transition-colors hover:text-white">
              Menu
            </a>
            <a href="#about" className="transition-colors hover:text-white">
              About
            </a>
            <a href="#top" className="transition-colors hover:text-white">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
