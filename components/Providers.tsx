"use client";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

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
      {children}
    </ThemeProvider>
  );
};
