"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const hideAppBar = ["chapter"].some((path) => pathname.includes(path));
  return (
    !hideAppBar && (
      <footer className="bg-gray-800 text-white p-4 text-center">
        <div className="container mx-auto">
          <p>© 2024 comic-app. All rights reserved.</p>
        </div>
      </footer>
    )
  );
}
