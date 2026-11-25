import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CartBar } from './components/CartBar';
import { CartDrawer } from './components/CartDrawer';
import { CategoryFilter } from './components/CategoryFilter';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuGrid } from './components/MenuGrid';
import { SearchBar } from './components/SearchBar';
import { Toast } from './components/Toast';
import { MENU_CATEGORIES, MENU_ITEMS } from './data/menu';
import { useCart } from './hooks/useCart';
import type { CheckoutDetails, FilterCategory, MenuItem } from './types/menu';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails>({
    customerName: '',
    notes: '',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const {
    items: cartItems,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    getItemQuantity,
    totalItems,
    subtotal,
    total,
  } = useCart();

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 2200);
  }, []);

  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      addItem(item);
      showToast(`Added ${item.name} to cart`);
    },
    [addItem, showToast]
  );

  const handleResetFilters = useCallback(() => {
    setSelectedCategory('All');
    setSearchQuery('');
  }, []);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Header
        totalItems={totalItems}
        totalPrice={total}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className={totalItems > 0 ? 'pb-20 md:pb-0' : ''}>
        <Hero />

        {/* Menu Section */}
        <section
          id="menu"
          aria-labelledby="menu-heading"
          className="scroll-mt-16 py-10 sm:py-14"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Title & Count */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h2
                  id="menu-heading"
                  className="font-display text-2xl font-bold text-white sm:text-3xl"
                >
                  Our Menu
                </h2>
                <p className="mt-1 text-sm text-[#B8B8B8]">
                  Freshly prepared starters, curries, biryanis, breads, and more.
                </p>
              </div>
              <span className="text-xs font-medium text-[#B8B8B8] tabular-nums">
                {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'dish' : 'dishes'}
              </span>
            </div>

            {/* Search & Category Controls */}
            <div className="mt-6 space-y-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                resultCount={filteredItems.length}
                totalCount={MENU_ITEMS.length}
              />

              <CategoryFilter
                categories={MENU_CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Menu Grid */}
            <div className="mt-7 sm:mt-8">
              <MenuGrid
                items={filteredItems}
                getItemQuantity={getItemQuantity}
                onAdd={handleAddToCart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onResetFilters={handleResetFilters}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </section>

        <AboutSection />
      </main>

      <Footer />

      <CartBar
        totalItems={totalItems}
        totalPrice={total}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        totalItems={totalItems}
        subtotal={subtotal}
        total={total}
        checkoutDetails={checkoutDetails}
        onChangeCheckoutDetails={setCheckoutDetails}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeItem}
        onClearCart={clearCart}
      />

      <Toast message={toastMessage} hasMobileCartBar={totalItems > 0} />
    </div>
  );
}
