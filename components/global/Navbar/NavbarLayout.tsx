"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuItem, SettingsPayload } from "types";

import Navbar from "./NavBar";
import SideBar from "./SideBar";

interface NavbarProps {
  data: SettingsPayload;
}
export default function NavbarLayout(props: NavbarProps) {
  const { data } = props;
  const menuItems = data?.menuItems || ([] as MenuItem[]);
  const [isOpen, setIsOpen] = useState(false); 

  const toggle = () => {
    setIsOpen(!isOpen);
};

  return (
    <>
      <SideBar isOpen={isOpen} toggle={toggle} menuItems={menuItems}/>
      <Navbar toggle={toggle} menuItems={menuItems}/>
    </>
  );
}
