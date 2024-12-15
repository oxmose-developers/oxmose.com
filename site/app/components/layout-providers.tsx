"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

import { CartProvider } from "../../context/cart-context";
import { PlayerProvider } from "../../context/player-context";
import type { Cart } from "../../lib/shopify/types";

export const Providers = ({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) => {
  const pathname = usePathname();

  const forcedThemeFromPathname = pathname.includes("publishing")
    ? "dark"
    : undefined;

  return (
    <CartProvider cartPromise={cartPromise}>
      <ThemeProvider
        enableSystem={false}
        forcedTheme={forcedThemeFromPathname}
        attribute="class"
      >
        {/* @ts-expect-error - This is a valid JSX element */}
        <PlayerProvider>{children}</PlayerProvider>
      </ThemeProvider>
    </CartProvider>
  );
};
