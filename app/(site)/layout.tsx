import "../../styles/global.css";

import type { Viewport } from "next";

// import Player from "../../components/Player";
import Footer from "../global/footer";
import NavBar from "../global/navBar";

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/ABCMonumentGrotesk-Regular-Trial.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/ABCMonumentGrotesk-Medium-Trial.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>

      <body className="flex min-h-svh flex-col">
        <NavBar />

        <main className="flex-1">{children}</main>

        <Footer />

        {/* <Player /> */}
      </body>
    </html>
  );
}
