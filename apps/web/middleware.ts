import { NextRequest, NextResponse } from "next/server";
import { isMobile } from "./lib/is";

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") || "";

  const isIndex = req.nextUrl.pathname === "/";
  if (isMobile(userAgent) && isIndex) {
    const url = req.nextUrl.clone();
    url.pathname = "/h5";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
