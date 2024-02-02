import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export interface NavbarProps {
  links: {
    href: string,
    label: string
  }[];
  toggle: () => void;
  isOpen: boolean;
}

export default function FooterNavBar({links, toggle, isOpen}: NavbarProps) {
  return (
    <footer className="bottom-0 w-full bg-black text-white py-1 px-3 md:px-7 flex justify-between items-center z-30">
      <button 
        className="md:hidden px-1 py-1 bg-black" 
        onClick={toggle}
        aria-label={isOpen ? 'close footer menu' : 'open footer menu'}
      >
        <PlusIcon className={`w-6 h-6 transition-transform duration-150  text-white ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
        
      </button>

      <ul className="hidden uppercase md:flex gap-6 md:gap-8 lg:gap-10">
        {
          links.map((link, i) => (
            <li key={`link-${i}`}>
              <Link href={link.href}>{link.label}</Link>
            </li>

          ))
        }
      </ul>
      <p className="uppercase">&copy; 2023 oxmose</p>
    </footer>
  )
}