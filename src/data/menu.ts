import type { FilterCategory, MenuItem } from '../types/menu';

export const MENU_CATEGORIES: FilterCategory[] = [
  'All',
  'Starters',
  'Veg',
  'Non-Veg',
  'Biryani',
  'Breads',
  'Drinks',
  'Desserts',
];

/**
 * EMBER & SPICE — Menu Catalog
 * Edit prices, descriptions, badges, or add new dishes right here.
 */
export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken',
    description: 'Golden crispy chicken with a special seasoning.',
    price: 199,
    category: 'Starters',
    image: '/src/assets/images/dish_crispy_chicken_1795643551734.webp',
    isVeg: false,
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka',
    description: 'Smoky grilled chicken with Indian spices.',
    price: 229,
    category: 'Starters',
    image: '/src/assets/images/dish_chicken_tikka_1795643552473.webp',
    isVeg: false,
    isBestseller: true,
  },
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    description: 'Grilled paneer with peppers and spices.',
    price: 189,
    category: 'Starters',
    image: '/src/assets/images/dish_paneer_tikka_1795643553322.webp',
    isVeg: true,
    isBestseller: true,
  },

  // VEG
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    description: 'Paneer cooked in creamy tomato gravy.',
    price: 229,
    category: 'Veg',
    image: '/src/assets/images/dish_paneer_butter_masala_1795643556428.webp',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    description: 'Fresh vegetables tossed with aromatic rice.',
    price: 169,
    category: 'Veg',
    image: '/src/assets/images/dish_veg_fried_rice_1795643554124.webp',
    isVeg: true,
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    description: 'Slow-cooked creamy black lentils.',
    price: 179,
    category: 'Veg',
    image: '/src/assets/images/dish_dal_makhani_1795643635667.webp',
    isVeg: true,
  },

  // NON-VEG
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich creamy tomato sauce.',
    price: 249,
    category: 'Non-Veg',
    image: '/src/assets/images/dish_butter_chicken_1795643556733.webp',
    isVeg: false,
    isBestseller: true,
  },
  {
    id: 'chicken-curry',
    name: 'Chicken Curry',
    description: 'Traditional chicken curry with Indian spices.',
    price: 219,
    category: 'Non-Veg',
    image: '/src/assets/images/dish_chicken_curry_1795643559781.webp',
    isVeg: false,
  },
  {
    id: 'chicken-kadai',
    name: 'Chicken Kadai',
    description: 'Chicken cooked with capsicum and kadai spices.',
    price: 239,
    category: 'Non-Veg',
    image: '/src/assets/images/dish_chicken_kadai_1795643557320.webp',
    isVeg: false,
  },

  // BIRYANI
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    description: 'Aromatic rice cooked with chicken and spices.',
    price: 219,
    category: 'Biryani',
    image: '/src/assets/images/dish_chicken_biryani_1795643557505.webp',
    isVeg: false,
    isBestseller: true,
  },
  {
    id: 'veg-biryani',
    name: 'Veg Biryani',
    description: 'Fragrant rice with fresh vegetables.',
    price: 179,
    category: 'Biryani',
    image: '/src/assets/images/dish_veg_biryani_1795643559158.webp',
    isVeg: true,
  },

  // BREADS
  {
    id: 'butter-naan',
    name: 'Butter Naan',
    description: 'Fresh naan topped with butter.',
    price: 49,
    category: 'Breads',
    image: '/src/assets/images/dish_butter_naan_1795643560259.webp',
    isVeg: true,
  },
  {
    id: 'garlic-naan',
    name: 'Garlic Naan',
    description: 'Naan topped with garlic and butter.',
    price: 59,
    category: 'Breads',
    image: '/src/assets/images/dish_garlic_naan_1795643562285.webp',
    isVeg: true,
    isBestseller: true,
  },
  {
    id: 'tandoori-roti',
    name: 'Tandoori Roti',
    description: 'Freshly baked traditional tandoori roti.',
    price: 35,
    category: 'Breads',
    image: '/src/assets/images/dish_tandoori_roti_1795643561654.webp',
    isVeg: true,
  },

  // DRINKS
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    description: 'Chilled creamy coffee.',
    price: 119,
    category: 'Drinks',
    image: '/src/assets/images/dish_cold_coffee_1795643562731.webp',
    isVeg: true,
  },
  {
    id: 'fresh-lime-soda',
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime soda.',
    price: 69,
    category: 'Drinks',
    image: '/src/assets/images/dish_fresh_lime_soda_1795643563609.webp',
    isVeg: true,
  },
  {
    id: 'mango-shake',
    name: 'Mango Shake',
    description: 'Creamy mango shake.',
    price: 129,
    category: 'Drinks',
    image: '/src/assets/images/dish_mango_shake_1795644541041.webp',
    isVeg: true,
  },

  // DESSERTS
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie.',
    price: 129,
    category: 'Desserts',
    image: '/src/assets/images/dish_chocolate_brownie_1795643647353.webp',
    isVeg: true,
  },
  {
    id: 'vanilla-ice-cream',
    name: 'Vanilla Ice Cream',
    description: 'Classic vanilla ice cream.',
    price: 89,
    category: 'Desserts',
    image: '/src/assets/images/dish_vanilla_ice_cream_1795643587058.webp',
    isVeg: true,
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    description: 'Soft sweet dumplings served in syrup.',
    price: 79,
    category: 'Desserts',
    image: '/src/assets/images/dish_gulab_jamun_1795643644545.webp',
    isVeg: true,
    isBestseller: true,
  },
];
