import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  // Auth pages
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Protected pages
  const isDashboard = pathname.startsWith("/dashboard");

  // No token
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Already logged in
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
