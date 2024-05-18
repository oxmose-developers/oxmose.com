import "../../styles/global.css";

import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { Providers } from "../../components/Providers";
// import Player from "../../components/Player";
import Footer from "../global/footer";
import NavBar from "../global/navBar";

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Oxmose",
    default: "Oxmose",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialias" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/ABCMonumentGrotesk-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ABCMonumentGrotesk-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>

      <body className="flex min-h-svh flex-col">
        <Providers>
          <NavBar />

          <main className="flex flex-1 flex-col">{children}</main>

          <Footer />

          {/* <Player /> */}
        </Providers>
      </body>

      <Script
        async
        src="https://cloud.umami.is/script.js"
        data-website-id="69497101-089f-41fb-8757-7980667880b9"
      />
    </html>
  );
}
