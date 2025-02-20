"use client";

import Link from "next/link";
import { GiMoebiusStar, GiCat } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { MdStars } from "react-icons/md";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/count", label: "Count" },
  { href: "/intro", label: "Intro" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header__container">
      {/* 헤더 */}
      <div className="header__title">
        <div className="left">
          <GiMoebiusStar />
        </div>
        <div className="center">
          <Link href={"/"}>
            <span>BYE</span>
            <MdStars />
            <span>L</span>
          </Link>
        </div>
        <div className="right">
          <GiCat />
        </div>
      </div>

      {/* 메뉴 */}
      <nav className="header__nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`hover:underline underline-offset-4 ${
                  pathname === item.href ? "underline" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
