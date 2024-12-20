"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

import { PlayerProvider } from "../../context/player-context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
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
      {/* @ts-expect-error - This is a valid JSX element */}
      <PlayerProvider>{children}</PlayerProvider>
    </ThemeProvider>
  );
};
