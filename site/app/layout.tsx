import "../styles/global.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import Script from "next/script";

import { CartProvider } from "../context/cart-context";
import { fetchSEO } from "../lib/sanity";
import { getCart } from "../lib/shopify";
import CartDrawer from "./components/cart/cart-drawer";
import Footer from "./components/footer-element";
import { Providers } from "./components/layout-providers";
import Navigation from "./components/navigation-element";
import PlayerLoader from "./components/player-loader";

export const viewport: Viewport = {
  themeColor: "#000000",
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSEO();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `${seo.title} | %s`,
      default: `${seo.title}`,
    },
    description: seo.description,
    openGraph: {
      title: {
        template: `${seo.title} | %s`,
        default: `${seo.title}`,
      },
      description: seo.description,
      type: "website",
      siteName: seo.title,
      url: new URL(baseUrl),
    },
    twitter: {
      title: {
        template: `${seo.title} | %s`,
        default: `${seo.title}`,
      },
      description: seo.description,
      site: seo?.twitterSite,
      creator: seo?.twitterSite,
    },
    publisher: seo.title,
    keywords: seo.keywords,
  } satisfies Metadata;
}

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
    // We don't use this font, but it's included in the project for later use in case we want to add the bold font weight.
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
  const seo = await fetchSEO();

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
        <CartProvider cartPromise={cart}>
          <Providers>
            <Navigation />

            <main className="flex flex-1 flex-col">{children}</main>

            <Footer fullYear={fullYear} followLinks={seo.followLinks} />

            <PlayerLoader />

            <CartDrawer />
          </Providers>
        </CartProvider>

        <SpeedInsights />
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
