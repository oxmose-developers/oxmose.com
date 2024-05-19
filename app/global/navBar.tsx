import Link from "next/link";
import { Suspense } from "react";

import Cart from "../shared/cart/Cart";
import Logo from "./logo";

export default function NavBar() {
  return (
    <nav className="shrink-0 border-b border-black bg-white py-[18px] dark:border-white dark:bg-black lg:py-6">
      <div className="flex max-w-[100rem]">
        <div className="px-9 lg:px-10">
          <a href="/">
            <span className="sr-only">Back to Catalogue</span>
            <Logo className="size-12 lg:size-16" />
          </a>
        </div>

        <div className="ml-auto hidden items-center justify-center gap-10 px-10 lg:flex">
          <Link
            className="whitespace-nowrap text-oxe-sm font-medium uppercase"
            href="/"
          >
            Catalogue
          </Link>

          <Link
            className="whitespace-nowrap text-oxe-sm font-medium uppercase"
            href="/artists"
          >
            Artists
          </Link>

          <Link
            className="whitespace-nowrap text-oxe-sm font-medium uppercase"
            href="/about"
          >
            à propos
          </Link>

          <Link
            className="whitespace-nowrap text-oxe-sm font-medium uppercase"
            href="/contact"
          >
            Contact
          </Link>

          <Suspense fallback={null}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
