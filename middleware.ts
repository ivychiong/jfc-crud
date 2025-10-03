import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { parseTokenFromCookie } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie");
  const token = parseTokenFromCookie(cookieHeader || undefined);

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tasks/:path*",
    "/categories/:path*",
    "/businesses/:path*",
    "/tags/:path*",
    "/people/:path*",
    "/profile/:path*",
  ],
  runtime: "nodejs",
};
