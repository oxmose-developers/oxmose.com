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
  console.log(menuItems)
  return (
    <div className="fixed w-full h-full overflow-hidden pr-4 py-4 bg-white right-0 z-20 transition-all duration-300 peer-checked:translate-x-0"
      style={{ opacity: `${isOpen ? "1" : "0"}`, right: ` ${isOpen ? "0" : "-100%"}`}}
    >
      <button className="absolute right-5 top-5" onClick={toggle}>
        {/* Close icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          />
        </svg>
      </button>

      <Image 
        alt="oxmose logo" 
        src="/oxmose_logo.png"
        width={60}
        height={60}
        className="ml-1 mr-auto"
      />
      <ul className="mt-10">

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