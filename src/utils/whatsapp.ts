import { restaurantConfig } from '../data/restaurant';
import type { CartItem, CheckoutDetails } from '../types/menu';
import { formatCurrency } from './currency';

/**
 * Strips any accidental punctuation or spaces so the wa.me URL is always valid.
 */
function sanitizeWhatsAppPhone(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

/**
 * Builds the preformatted order message sent to the restaurant on WhatsApp.
 */
export function buildWhatsAppOrderMessage(
  items: CartItem[],
  details: CheckoutDetails,
  subtotal: number,
  total: number
): string {
  const customerName = details.customerName.trim() || 'Guest';
  const notes = details.notes.trim() || 'Please prepare the order.';

  const orderLines = items.map((entry, index) => {
    const lineTotal = entry.item.price * entry.quantity;
    return `${index + 1}. ${entry.item.name} x ${entry.quantity} — ${formatCurrency(lineTotal)}`;
  });

  const sections = [
    `Hello ${restaurantConfig.restaurantName}!`,
    'I would like to place an order.',
    '',
    `Customer Name: ${customerName}`,
    '',
    'ORDER:',
    ...orderLines,
    '',
    `Subtotal: ${formatCurrency(subtotal)}`,
    `Total: ${formatCurrency(total)}`,
    '',
    `Instructions: ${notes}`,
    '',
    'Thank you!',
  ];

  return sections.join('\n');
}

/**
 * Generates a valid https://wa.me/PHONE_NUMBER?text=ENCODED_MESSAGE link.
 */
export function buildWhatsAppOrderUrl(
  items: CartItem[],
  details: CheckoutDetails,
  subtotal: number,
  total: number
): string {
  const phone = sanitizeWhatsAppPhone(restaurantConfig.restaurantPhone);
  const message = buildWhatsAppOrderMessage(items, details, subtotal, total);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a direct WhatsApp link for general inquiries or quick ordering from the Contact section.
 */
export function buildDirectWhatsAppUrl(): string {
  const phone = sanitizeWhatsAppPhone(restaurantConfig.restaurantPhone);
  const message = `Hello ${restaurantConfig.restaurantName}! I would like to place an order from your menu.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
