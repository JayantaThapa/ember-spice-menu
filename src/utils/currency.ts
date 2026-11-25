import { restaurantConfig } from '../data/restaurant';

export function formatCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${restaurantConfig.currencySymbol}${formatted}`;
}
