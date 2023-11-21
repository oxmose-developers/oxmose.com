"use client";

import { resolveHref } from "lib/sanity.links";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { MenuItem, SettingsPayload } from "types";

interface NavbarProps {
  data: SettingsPayload;
}
export default function Navbar(props: NavbarProps) {
  const { data } = props;
  const menuItems = data?.menuItems || ([] as MenuItem[]);
  const [isOpen, setIsOpen] = useState(false); 

  const handleClick = () => {
    setIsOpen(!isOpen);
};

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center flex-end gap-x-5 border-b border-slate-400 bg-white/80 px-4 py-4 pl-1 backdrop-blur md:px-16 md:pl-2 md:py-5 lg:px-32 lg:pl-4">
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
              className={`text-lg uppercase font-medium hover:text-black md:text-xl ${
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

        <button className="mr-2" aria-label="Open Menu" onClick={handleClick}>
          <Image src='/menu-burger-horizontal-svgrepo-com.svg' height={40} width={40} alt="hamburger menu"/>
        </button>
    </div>
  );
}
