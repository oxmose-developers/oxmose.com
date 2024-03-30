import { Bars3Icon } from "@heroicons/react/24/outline";
import { resolveHref } from "_old/lib/sanity.links";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "_old/types";

interface NavbarProps {
  menuItems: MenuItem[];
  toggle: () => void;
}

export default function Navbar({ menuItems, toggle }: NavbarProps) {
  return (
    <div className="flex-end sticky top-0 z-10 flex flex-wrap items-center gap-x-5 border-b border-slate-400 bg-white/80 px-4 py-4 pl-1 backdrop-blur md:px-16 md:py-5 md:pl-2 lg:px-32 lg:pl-4">
      <Image
        alt="oxmose logo"
        src="/oxmose_logo.png"
        width={60}
        height={60}
        className="mr-auto"
      />

      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug);
          if (!href) {
            return null;
          }

          return (
            <Link
              key={key}
              className={`hidden text-lg font-medium uppercase hover:text-black md:block md:text-xl ${
                menuItem?._type === "home"
                  ? "font-extrabold text-black"
                  : "text-gray-600"
              }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          );
        })}

      <button
        className="mr-2 block md:hidden"
        aria-label="Open Menu"
        onClick={toggle}
      >
        <Bars3Icon className="h-10 w-10" />
      </button>
    </div>
  );
}
