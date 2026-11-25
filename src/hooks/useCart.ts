import { useCallback, useEffect, useMemo, useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import type { CartItem, MenuItem } from '../types/menu';

const CART_STORAGE_KEY = 'ember_spice_cart_v1';

const MENU_BY_ID = new Map<string, MenuItem>(
  MENU_ITEMS.map((menuItem) => [menuItem.id, menuItem])
);

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const hydrated: CartItem[] = [];
    for (const entry of parsed) {
      if (typeof entry !== 'object' || entry === null) continue;
      const quantity = (entry as CartItem).quantity;
      const itemId = (entry as CartItem).item?.id;
      if (
        typeof itemId !== 'string' ||
        typeof quantity !== 'number' ||
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        continue;
      }
      const liveItem = MENU_BY_ID.get(itemId);
      if (liveItem) {
        hydrated.push({ item: liveItem, quantity });
      }
    }
    return hydrated;
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart());

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota or private browsing errors cleanly
    }
  }, [items]);

  const addItem = useCallback((menuItem: MenuItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((entry) => entry.item.id === menuItem.id);
      if (existingIndex === -1) {
        return [...prev, { item: menuItem, quantity: 1 }];
      }
      return prev.map((entry, idx) =>
        idx === existingIndex ? { ...entry, quantity: entry.quantity + 1 } : entry
      );
    });
  }, []);

  const increaseQuantity = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.item.id === itemId ? { ...entry, quantity: entry.quantity + 1 } : entry
      )
    );
  }, []);

  const decreaseQuantity = useCallback((itemId: string) => {
    setItems((prev) =>
      prev
        .map((entry) =>
          entry.item.id === itemId ? { ...entry, quantity: entry.quantity - 1 } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((entry) => entry.item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const quantityMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of items) {
      map.set(entry.item.id, entry.quantity);
    }
    return map;
  }, [items]);

  const getItemQuantity = useCallback(
    (itemId: string) => quantityMap.get(itemId) ?? 0,
    [quantityMap]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, entry) => sum + entry.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0),
    [items]
  );

  const total = subtotal;

  return {
    items,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    getItemQuantity,
    totalItems,
    subtotal,
    total,
  };
}
