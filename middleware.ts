import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isAuthenticated } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const user = await isAuthenticated(cookieHeader);
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    if (user) {
      return NextResponse.redirect(new URL("/tasks", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const protectedRoutes = [
    "/tasks",
    "/categories",
    "/businesses",
    "/tags",
    "/people",
    "/profile",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !user) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/tasks/:path*",
    "/categories/:path*",
    "/businesses/:path*",
    "/tags/:path*",
    "/people/:path*",
    "/profile/:path*",
  ],
  runtime: "nodejs",
};
