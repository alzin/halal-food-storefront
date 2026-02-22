"use client";

import { type ReactNode } from "react";
import { CartProvider, useCart } from "../_context/CartContext";
import { FlyingCartAnimation } from "./FlyingCartAnimation";

function CartAnimationLayer() {
  const { flyingItems, removeFlyingItem } = useCart();

  return (
    <FlyingCartAnimation
      items={flyingItems}
      onAnimationComplete={removeFlyingItem}
    />
  );
}

export function CartProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartAnimationLayer />
    </CartProvider>
  );
}
