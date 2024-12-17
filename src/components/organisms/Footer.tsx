"use client";
import Image from "next/image";
import Link from "next/link";
import { MenuItemsType } from "@/share/models/general.model";
import IconButton from "../atoms/IconButton";

type SocialType = {
  facebook: string;
  instagram: string;
  twitter: string;
};

//TODO
// const Menus: MenuItemsType[] = [
//   {
//     label: "About us",
//     url: "/about-us",
//   },
// ];
const Menus: MenuItemsType[] = [];

export function Footer() {
  const handleOnPressSocial = (type: keyof SocialType) => {
    const socialLinks: SocialType = {
      facebook: "https://www.facebook.com/profile.php?id=61558015288073",
      instagram: "https://www.instagram.com/homebase_thailand/",
      twitter: "https://twitter.com/",
    };

    window.open(socialLinks[type], "_blank");
  };

  return (
    <footer className="bg-gray-900 py-[48px] sm:py-[80px] text-gray-50">
      <div className="container mx-auto max-w-screen-xl text-start">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          <div className="w-full sm:w-auto h-[87px] flex flex-col justify-between">
            <Link href="/">
              <Image
                src="/images/logo-white@3x.png"
                alt="Logo"
                width={100}
                height={10}
                className="mr-8"
              />
            </Link>
            <p className="text-body-4">
              Powered by{" "}
              <Link
                href="https://www.morestudio.co.th"
                target="_blank"
                rel="noopener noreferrer"
              >
                Morestudio
              </Link>
            </p>
            <div>
              <IconButton
                src="/images/icons/Facebook@3x.png"
                alt="facebook"
                className="mr-3"
                onPress={() => handleOnPressSocial("facebook")}
              />
              <IconButton
                src="/images/icons/Instragram@3x.png"
                alt="instagram"
                className="mr-3"
                onPress={() => handleOnPressSocial("instagram")}
              />
              {/* <IconButton
                src="/images/icons/Twitter@3x.png"
                alt="twitter"
                className="mr-3"
                onPress={() => handleOnPressSocial("twitter")}
              /> */}
            </div>
          </div>
          <div className="w-full sm:w-auto text-body-3-semi-bold text-white-500">
            <ul>
              {Menus.map((menu) => (
                <li key={`footer-menu-${menu.label}`}>
                  <Link href={menu.url}>{menu.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
