import "../../styles/global.css";

// import Player from "../../components/Player";
import Footer from "../shared/footer";
import NavBar from "../shared/navBar";

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
