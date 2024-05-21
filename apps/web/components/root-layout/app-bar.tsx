"use client";

import { BookCheck, ChevronRight, Home, Menu, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const MENU_LIST: {
  title: string;
  href: string;
  icon: React.ReactNode;
  h5href: string;
}[] = [
  { title: "最新", href: "/", h5href: "/h5", icon: <Home size={18} /> },
  {
    title: "订阅",
    href: "/publish",
    h5href: "/h5/publish",
    icon: <BookCheck size={18} />,
  },
  {
    title: "搜索",
    href: "/search",
    h5href: "/h5/search",
    icon: <Search size={18} />,
  },
];

const LoginInfo = () => {
  const handleClick = () => {
    // todo
  };
  return (
    <div
      className="flex items-center justify-between pb-4 pt-2"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <p>登录</p>
      </div>
      <ChevronRight className=" justify-end" />
    </div>
  );
};

const MobileBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const handleRoute = (href: string) => {
    if (href === pathname) {
      return;
    }
    setOpenMenu(false);
    router.push(href);
  };
  return (
    <div className="flex  items-center justify-between md:hidden">
      <Menu className="cursor-pointer" onClick={() => setOpenMenu(true)} />
      <Drawer open={openMenu} direction="left" onOpenChange={setOpenMenu}>
        <DrawerContent className="h-full flex flex-col rounded-none w-[200px] p-2 divide-y">
          <LoginInfo />
          {MENU_LIST.map((menu, index) => (
            <span
              className={`flex py-2 items-center gap-1 cursor-pointer transition-colors hover:text-foreground ${pathname === menu.h5href ? "text-foreground" : "text-muted-foreground"}`}
              key={menu.title}
            >
              {menu.icon}
              <span onClick={() => handleRoute(menu.h5href)}>{menu.title}</span>
            </span>
          ))}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default function AppBar() {
  const pathname = usePathname();
  const hideAppBar = ["chapter"].some((path) => pathname.includes(path));

  return (
    !hideAppBar && (
      <header className=" shadow-sm bg-white z-50 p-4">
        <div className="flex justify-between md:container">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {MENU_LIST.map((menu, index) => (
              <span
                className={`flex items-center gap-1 cursor-pointer transition-colors hover:text-foreground ${pathname === menu.href ? "text-foreground" : "text-muted-foreground"}`}
                key={menu.title}
              >
                {menu.icon}
                <a href={menu.href} className={``}>
                  {menu.title}
                </a>
              </span>
            ))}
          </nav>
          <MobileBar />
        </div>
      </header>
    )
  );
}
