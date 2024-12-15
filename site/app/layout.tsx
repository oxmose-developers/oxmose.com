import "../styles/global.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import Script from "next/script";

import { description } from "../constants/seo";
import { getCart } from "../lib/shopify";
import CartDrawer from "./components/cart/cart-drawer";
import ClientOnly from "./components/client-only";
import Footer from "./components/footer-element";
import { Providers } from "./components/layout-providers";
import Navigation from "./components/navigation-element";
import Player from "./components/player-element";

export const viewport: Viewport = {
  themeColor: "#000000",
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    url: new URL(baseUrl),
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fullYear = new Date().getFullYear();

  const cartId = (await cookies()).get("cartId")?.value;

  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(cartId);

  return (
    <html
      lang="en"
      className={`${monumentGrotesk.variable} antialias`}
      suppressHydrationWarning
    >
      <body className="flex flex-col selection:bg-oxe-purple selection:text-black">
        <Providers cartPromise={cart}>
          <Navigation />

          <main className="flex flex-1 flex-col">{children}</main>

          <Footer fullYear={fullYear} />

          <ClientOnly>
            <Player />
          </ClientOnly>

          <CartDrawer />
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
