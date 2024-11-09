import "../../styles/global.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Suspense } from "react";

import { description } from "../../constants/seo";
import Footer from "../global/Footer";
import Navigation from "../global/Navigation";
import Player from "../global/Player";
import { Providers } from "../global/Providers";
import Cart from "../shared/cart/Cart";
import ClientOnly from "../shared/client-only";

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.oxmose.com"),
  title: {
    template: "Oxmose | %s",
    default: "Oxmose",
  },
  description: description,
  openGraph: {
    title: {
      template: "Oxmose | %s",
      default: "Oxmose",
    },
    description: description,
    type: "website",
    siteName: "Oxmose",
    url: new URL("https://www.oxmose.com"),
  },
  twitter: {
    title: {
      template: "Oxmose | %s",
      default: "Oxmose",
    },
    description: description,
    site: "@oxmose_records",
    creator: "@oxmose_records",
  },
  creator: "Oxmose Team",
  publisher: "Oxmose",
  keywords: [
    "oxmose",
    "oxmose records",
    "oxmose label",
    "oxmose music",
    "label",
    "musique",
    "music",
    "independant",
  ],
};

const monumentGrotesk = localFont({
  preload: true,
  display: "swap",
  src: [
    {
      path: "../fonts/ABCMonumentGrotesk-Regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../fonts/ABCMonumentGrotesk-RegularItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../fonts/ABCMonumentGrotesk-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../fonts/ABCMonumentGrotesk-MediumItalic.woff2",
      style: "italic",
      weight: "500",
    },
    // {
    //   path: "../fonts/ABCMonumentGrotesk-Bold.woff2",
    //   style: "normal",
    //   weight: "600",
    // },
    // {
    //   path: "../fonts/ABCMonumentGrotesk-BoldItalic.woff2",
    //   style: "italic",
    //   weight: "600",
    // },
  ],
  variable: "--font-monument-grotesk",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fullYear = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${monumentGrotesk.variable} antialias`}
      suppressHydrationWarning
    >
      <head>{/* Head */}</head>

      <body className="flex min-h-svh flex-col">
        <Providers>
          <Navigation />

          <main className="flex flex-1 flex-col">{children}</main>

          <Suspense>
            <Cart />
          </Suspense>

          <Footer fullYear={fullYear} />

          <ClientOnly>
            <Player />
          </ClientOnly>
        </Providers>
      </body>

      {process.env.NODE_ENV === "development" ? null : (
        <Script
          async
          src="/stats/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
      )}
    </html>
  );
}
