import type { RestaurantConfig } from '../types/menu';

/**
 * ============================================================================
 * RESTAURANT CONFIGURATION — EDIT THIS FILE TO CUSTOMIZE YOUR RESTAURANT
 * ============================================================================
 *
 * HOW TO CONFIGURE YOUR WHATSAPP NUMBER:
 * 1. Replace `restaurantPhone` below with your own WhatsApp Business or
 *    personal WhatsApp number.
 * 2. ALWAYS include the international country code (e.g., 91 for India,
 *    1 for US/Canada, 44 for UK).
 * 3. DO NOT include "+", spaces, hyphens, or parentheses.
 *    Correct:   "919876543210"
 *    Incorrect: "+91 98765-43210"
 * ============================================================================
 */
export const restaurantConfig: RestaurantConfig = {
  restaurantName: 'EMBER & SPICE',
  subtitle: 'Authentic flavours. Made fresh.',
  // REPLACE THIS PLACEHOLDER WITH YOUR ACTUAL WHATSAPP NUMBER (COUNTRY CODE + NUMBER, DIGITS ONLY)
  restaurantPhone: '919876543210',
  // Human-readable phone number shown in the Contact section
  displayPhone: '+91 98765 43210',
  restaurantAddress: '42 Spice Court, Indiranagar 100 Feet Road, Bengaluru 560038',
  openingHours: 'Daily, 11:30 AM – 11:00 PM',
  currency: 'INR',
  currencySymbol: '₹',
  heroImage: '/src/assets/images/hero_ember_feast_1795643550670.webp',
};
