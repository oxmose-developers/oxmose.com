import { Footer } from "components/global/Footer";
import { Navbar } from "components/global/Navbar";

export default function IndexRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white text-black">
      <Navbar />

      {children}

      <Footer />
    </div>
  );
}
