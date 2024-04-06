import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export interface NavbarProps {
  links: {
    href: string;
    label: string;
  }[];
  toggle: () => void;
  isOpen: boolean;
}

export default function FooterNavBar({ links, toggle, isOpen }: NavbarProps) {
  return (
    <footer className="bottom-0 z-30 flex w-full items-center justify-between bg-black px-3 py-1 text-white md:px-7">
      <button
        className="bg-black px-1 py-1 md:hidden"
        onClick={toggle}
        aria-label={isOpen ? "close footer menu" : "open footer menu"}
      >
        <PlusIcon
          className={`h-6 w-6 text-white transition-transform  duration-150 ${isOpen ? "rotate-45" : "rotate-0"}`}
        />
      </button>

      <ul className="hidden gap-6 uppercase md:flex md:gap-8 lg:gap-10">
        {links.map((link, i) => (
          <li key={`link-${i}`}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <p className="uppercase">&copy; 2023 oxmose</p>
    </footer>
  );
}
