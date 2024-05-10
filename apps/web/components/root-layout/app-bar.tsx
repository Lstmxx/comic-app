"use client";

import { usePathname } from "next/navigation";

export default function AppBar() {
  const pathname = usePathname();

  const menuList: {
    title: string;
    href: string;
  }[] = [
    { title: "最新", href: "/" },
    { title: "订阅", href: "/publish" },
    { title: "搜索", href: "/search" },
  ];

  return (
    <header className="p-4 sticky top-0 shadow-sm bg-white z-50">
      <div className="flex justify-between container">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {menuList.map((menu, index) => (
            <a
              key={menu.title}
              href={menu.href}
              className={`${pathname === menu.href ? "text-foreground" : "text-muted-foreground"} transition-colors hover:text-foreground`}
            >
              {menu.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
