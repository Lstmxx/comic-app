"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const MobileBar = () => {
  return (
    <div className="flex  items-center justify-between md:hidden">
      <Menu className="cursor-pointer" />
    </div>
  );
};

export default function AppBar() {
  const pathname = usePathname();
  const hideAppBar = ["chapter"].some((path) => pathname.includes(path));

  const menuList: {
    title: string;
    href: string;
  }[] = [
    { title: "最新", href: "/" },
    { title: "订阅", href: "/publish" },
    { title: "搜索", href: "/search" },
  ];

  const showBackBtn = () => {};

  return (
    !hideAppBar && (
      <header className=" shadow-sm bg-white z-50 p-4">
        <div className="flex justify-between md:container">
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
          <MobileBar />
        </div>
      </header>
    )
  );
}
