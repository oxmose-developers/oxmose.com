import { XMarkIcon } from '@heroicons/react/24/outline';
import { resolveHref } from "lib/sanity.links";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "types";

interface SideBarProps {
  isOpen: boolean;
  toggle: () => void;
  menuItems: MenuItem[];
}

export default function SideBar({isOpen, toggle, menuItems}: SideBarProps) {
  return (
    <div className="fixed w-full h-full overflow-hidden pr-4 pt-24 bg-white right-0 z-20 transition-all duration-300 peer-checked:translate-x-0"
      style={{ opacity: `${isOpen ? "1" : "0"}`, right: ` ${isOpen ? "0" : "-100%"}`}}
    >
      <button className="absolute right-5 top-5" onClick={toggle}>
        {/* Close icon */}
        <XMarkIcon className="h-10 w-10" />
      </button>

      <ul className="text-right">

        {menuItems &&
          menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug);
            if (!href) {
              return null;
            }

            return (
              <li key={key} className="m-2">
                <Link
                  className={`text-3xl uppercase font-medium block hover:text-black md:text-xl ${
                    menuItem?._type === "home"
                    ? "font-extrabold text-black"
                    : "text-gray-600"
                  }`}
                  href={href}
                  onClick={toggle}
                >
                  {menuItem.title}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}