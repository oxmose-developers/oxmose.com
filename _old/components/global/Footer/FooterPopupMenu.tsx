import Link from "next/link";

import { NavbarProps } from "./FooterMenuBar";

export default function FooterPopupMenu({
  links,
  toggle,
  isOpen,
}: NavbarProps) {
  return (
    <div
      className="fixed bottom-[40px] left-0 z-10 w-1/2 overflow-hidden rounded-sm bg-black px-3 py-3 text-white duration-300 ease-in-out peer-checked:translate-x-0"
      style={{
        opacity: `${isOpen ? "1" : "0"}`,
        height: ` ${isOpen ? "fit-content" : "0"}`,
      }}
    >
      <ul className="space-y-3 uppercase">
        {links.map((link, i) => (
          <li key={`link-${i}`}>
            <Link href={link.href} onClick={toggle}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
