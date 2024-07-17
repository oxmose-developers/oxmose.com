import Link from "next/link";

import Logo from "./logo";

export default function NavBar() {
  return (
    <nav className="shrink-0 border-b border-black bg-white py-[18px] dark:border-white dark:bg-black lg:py-6">
      <div className="flex max-w-[100rem]">
        <div className="px-9 lg:px-10">
          <Link href="/">
            <span className="sr-only">Back to Catalogue</span>
            <Logo className="relative size-12 dark:invert lg:size-16" />
          </Link>
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
        </div>
      </div>
    </nav>
  );
}
