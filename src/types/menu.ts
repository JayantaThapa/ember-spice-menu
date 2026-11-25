export type MenuCategory =
  | 'Starters'
  | 'Veg'
  | 'Non-Veg'
  | 'Biryani'
  | 'Breads'
  | 'Drinks'
  | 'Desserts';

export type FilterCategory = 'All' | MenuCategory;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface RestaurantConfig {
  restaurantName: string;
  subtitle: string;
  /**
   * International WhatsApp number WITHOUT spaces, plus signs (+), dashes, or punctuation.
   * Example for India (+91 98765 43210): "919876543210"
   */
  restaurantPhone: string;
  displayPhone: string;
  restaurantAddress: string;
  openingHours: string;
  currency: string;
  currencySymbol: string;
  heroImage: string;
}

export interface CheckoutDetails {
  customerName: string;
  notes: string;
}
