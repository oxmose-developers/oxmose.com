import Link from "next/link";

import { NavbarProps } from "./FooterMenuBar";

export default function FooterPopupMenu({links, toggle, isOpen}: NavbarProps) {
  return (
    <div 
      className="fixed bg-black text-white rounded-sm w-1/2 overflow-hidden px-3 py-3 left-0 z-10 bottom-[40px] ease-in-out duration-300 peer-checked:translate-x-0"
      style={{ opacity: `${isOpen ? "1" : "0"}`, height: ` ${isOpen ? "fit-content" : "0"}`}}
    >
      <ul className="uppercase space-y-3">
        {
          links.map((link, i) => (
            <li key={`link-${i}`}>
              <Link href={link.href} onClick={toggle}>{link.label}</Link>
            </li>

          ))
        }
      </ul>
    </div>
  )
}