"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

import FooterNavBar from "./FooterMenuBar";
import FooterPopupMenu from "./FooterPopupMenu";

const links = [
  { href: "/publishing", label: "Publishing" },
  { href: "/follow", label: "Follow" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/faq", label: "FAQ" },
];
export default function Footer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <FooterPopupMenu links={links} toggle={toggle} isOpen={isOpen} />
      <FooterNavBar links={links} toggle={toggle} isOpen={isOpen} />
    </>
  );
}
