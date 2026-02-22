"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "../_data/mock";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FlyingItem {
  id: string;
  imageUrl: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  addItemWithAnimation: (
    product: Product,
    imageElement: HTMLElement,
    quantity?: number
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  flyingItems: FlyingItem[];
  removeFlyingItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const addItemWithAnimation = useCallback(
    (product: Product, imageElement: HTMLElement, quantity = 1) => {
      // Get the position of the product image
      const imageRect = imageElement.getBoundingClientRect();

      // Get the position of the cart icon
      const cartIcon = document.querySelector('[aria-label*="Shopping cart"]');
      const cartRect = cartIcon?.getBoundingClientRect();

      if (cartRect) {
        // Create flying item
        const flyingItem: FlyingItem = {
          id: `${product.id}-${Date.now()}`,
          imageUrl: product.images[0],
          startX: imageRect.left + imageRect.width / 2 - 40, // Center the 80px image
          startY: imageRect.top + imageRect.height / 2 - 40,
          endX: cartRect.left + cartRect.width / 2 - 40,
          endY: cartRect.top + cartRect.height / 2 - 40,
        };

        setFlyingItems((prev) => [...prev, flyingItem]);
      }

      // Add to cart after a short delay to let animation start
      setTimeout(() => {
        addItem(product, quantity);
      }, 100);
    },
    [addItem]
  );

  const removeFlyingItem = useCallback((id: string) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        addItemWithAnimation,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        flyingItems,
        removeFlyingItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
