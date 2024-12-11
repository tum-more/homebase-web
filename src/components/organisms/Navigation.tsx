"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MenuItemsType } from "@/share/models/general.model";

//TODO
// const Menus: MenuItemsType[] = [
//   {
//     label: "Home",
//     url: "/",
//   },
//   {
//     label: "About us",
//     url: "/about-us",
//   },
// ];
const Menus: MenuItemsType[] = [];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white-500 border-b border-[#DCDCDC] py-[20px] w-full">
      <div className="container mx-auto flex max-w-screen-xl items-center justify-between sm:justify-start">
        <Link href="/">
          <Image
            src="/images/logo-black@3x.png"
            alt="Logo"
            width={100}
            height={10}
            className="mr-8"
          />
        </Link>

        <div className="block sm:hidden">
          <button onClick={toggleMenu} className="text-black">
            <Image
              src="/images/OLL@3x.png"
              alt="Hamburger Menu"
              width={24}
              height={24}
            />
          </button>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-white-500">
            <div className="container mx-auto max-w-screen-xl items-start text-heading-8-black">
              {Menus?.map((menu) => (
                <div className="py-2">
                  <Link key={`mobile-menu-${menu.label}`} href={menu.url}>
                    {menu.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="hidden sm:flex space-x-6 text-heading-8-black">
          {Menus?.map((menu) => (
            <Link key={`main-menu-${menu.label}`} href={menu.url}>
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
