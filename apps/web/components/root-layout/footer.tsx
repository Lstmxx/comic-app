"use client";

import { isMobile } from "@/lib/is";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const hideAppBar = ["chapter"].some((path) => pathname.includes(path));

  const isShow = !hideAppBar && !isMobile();
  return (
    <footer className="hidden md:flex bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto">
        <p>© 2024 comic-app. All rights reserved.</p>
      </div>
    </footer>
  );
}
