"use client";

import { useEffect, useState } from "react";

interface FlyingItem {
  id: string;
  imageUrl: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface FlyingCartAnimationProps {
  items: FlyingItem[];
  onAnimationComplete: (id: string) => void;
}

export function FlyingCartAnimation({
  items,
  onAnimationComplete,
}: FlyingCartAnimationProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {items.map((item) => (
        <FlyingImage
          key={item.id}
          item={item}
          onComplete={() => onAnimationComplete(item.id)}
        />
      ))}
    </div>
  );
}

function FlyingImage({
  item,
  onComplete,
}: {
  item: FlyingItem;
  onComplete: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setMounted(true);

    // Clean up after animation completes
    const timer = setTimeout(() => {
      onComplete();
    }, 800); // Match animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  const deltaX = item.endX - item.startX;
  const deltaY = item.endY - item.startY;

  return (
    <div
      className="absolute transition-all duration-700 ease-in-out"
      style={{
        left: `${item.startX}px`,
        top: `${item.startY}px`,
        transform: mounted
          ? `translate(${deltaX}px, ${deltaY}px) scale(0.2)`
          : "translate(0, 0) scale(1)",
        opacity: mounted ? 0 : 1,
        width: "80px",
        height: "80px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.imageUrl}
        alt="Flying to cart"
        className="h-full w-full rounded-lg object-cover shadow-lg"
      />
    </div>
  );
}
