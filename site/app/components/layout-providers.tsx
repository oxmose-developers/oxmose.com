"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

import { PlayerProvider } from "../../context/player-context";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  const forcedThemeFromPathname = pathname.includes("publishing")
    ? "dark"
    : undefined;

  return (
    <ThemeProvider
      enableSystem={false}
      forcedTheme={forcedThemeFromPathname}
      attribute="class"
    >
      <PlayerProvider>
        {/* @ts-expect-error IGNORE */}
        {children}
      </PlayerProvider>
    </ThemeProvider>
  );
};
